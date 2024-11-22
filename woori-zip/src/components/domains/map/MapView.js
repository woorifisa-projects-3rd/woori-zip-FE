import { useEffect, useRef } from 'react';
import styles from '../map/mapView.module.css';

const MapView = ({ filters, locations = [], selectedLocation, onMapChange = () => {} }) => {
  const mapRef = useRef(null);
  const isMapLoaded = useRef(false);
  const geocoder = useRef(null);
  const overlays = useRef([]);

  useEffect(() => {
    if (!isMapLoaded.current) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            const container = document.getElementById('map');
            const options = {
              center: new window.kakao.maps.LatLng(37.5665, 126.9780),
              level: 7,
            };
            mapRef.current = new window.kakao.maps.Map(container, options);

            geocoder.current = new window.kakao.maps.services.Geocoder();

            kakao.maps.event.addListener(mapRef.current, 'idle', handleMapIdle);

            isMapLoaded.current = true;
          });
        } else {
          console.error('Kakao Maps API failed to load.');
        }
      };

      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  const handleMapIdle = async () => {
    if (!mapRef.current) return;

    const bounds = mapRef.current.getBounds();
    const zoomLevel = mapRef.current.getLevel();

    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();

    const mapState = {
      southWestLatitude: southWest.getLat(),
      southWestLongitude: southWest.getLng(),
      northEastLatitude: northEast.getLat(),
      northEastLongitude: northEast.getLng(),
      zoomLevel,
    };

    if (onMapChange) {
      onMapChange(mapState);
    }

    // 줌 레벨에 따라 다른 데이터 업데이트
    if (zoomLevel >= 1 && zoomLevel <= 5) {
      updateMarkers(locations, 'pin'); // 핀만 표시
    } else if (zoomLevel >= 6 && zoomLevel <= 8) {
      updateMarkers(locations, 'dong'); // 동 표시
    } else if (zoomLevel >= 9 && zoomLevel <= 14) {
      updateMarkers(locations, 'gu'); // 구 표시
    }
  };

  const updateMarkers = async (locations, displayMode) => {
    if (!mapRef.current || !geocoder.current) return;

    // 기존 오버레이 제거
    overlays.current.forEach((overlay) => overlay.setMap(null));
    overlays.current = [];

    const markerData = await Promise.all(
      locations.map(async (location) => {
        const position = new window.kakao.maps.LatLng(location.lat, location.lng);

        let regionName;
        if (displayMode === 'dong') {
          regionName = await getRegionNameFromCoords(position, 'H'); // 동 이름
        } else if (displayMode === 'gu') {
          regionName = await getRegionNameFromCoords(position, 'B'); // 구 이름
        } else {
          regionName = location.name || '알 수 없음'; // 핀 이름
        }

        return {
          position,
          regionName,
        };
      })
    );

    const groupedData = markerData.reduce((acc, item) => {
      if (!acc[item.regionName]) {
        acc[item.regionName] = { count: 0, position: item.position };
      }
      acc[item.regionName].count += 1;
      return acc;
    }, {});

    Object.keys(groupedData).forEach((regionName) => {
      const { count, position } = groupedData[regionName];

      const overlayContent = `
        <div style="
          display: flex;
          align-items: center;
          padding: 5px 10px;
          background: rgba(0, 123, 255, 0.8);
          color: white;
          border-radius: 20px;
          border: 1px solid #004c80;
          font-size: 14px;
          font-weight: bold;
        ">
          ${regionName} (${count})
        </div>
      `;

      const overlay = new kakao.maps.CustomOverlay({
        position,
        content: overlayContent,
        yAnchor: 0.5,
      });

      overlay.setMap(mapRef.current);
      overlays.current.push(overlay);
    });
  };

  const getRegionNameFromCoords = (coords, regionType) => {
    return new Promise((resolve) => {
      geocoder.current.coord2RegionCode(coords.getLng(), coords.getLat(), (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const region = result.find((r) => r.region_type === regionType);
          resolve(region ? (regionType === 'B' ? region.region_2depth_name : region.region_3depth_name) : '알 수 없음');
        } else {
          resolve('알 수 없음');
        }
      });
    });
  };

  useEffect(() => {
    if (locations.length > 0) {
      handleMapIdle();
    }
  }, [locations, filters]);

  return <div id="map" className={styles.mapContainer} />;
};

export default MapView;
