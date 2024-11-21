import { useEffect, useRef } from 'react';
import styles from '../map/mapView.module.css';

const MapView = ({ filters, locations = [], selectedLocation, onMapChange = () => {} }) => {
  const mapRef = useRef(null);
  const clustererRef = useRef(null);
  const isMapLoaded = useRef(false);
  const geocoder = useRef(null);

  useEffect(() => {
    if (!isMapLoaded.current) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer`;
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

            clustererRef.current = new window.kakao.maps.MarkerClusterer({
              map: mapRef.current,
              averageCenter: true,
              minLevel: 6,
              disableClickZoom: true,
              styles: [
                {
                  width: '50px',
                  height: '50px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '2px solid #004c80',
                  borderRadius: '50%',
                  color: '#004c80',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  lineHeight: '50px',
                },
              ],
            });

            kakao.maps.event.addListener(mapRef.current, 'idle', handleMapIdle);
            kakao.maps.event.addListener(clustererRef.current, 'clusterover', handleClusterHover);

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

  const handleMapIdle = () => {
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
  };

  const handleClusterHover = (cluster) => {
    const markers = cluster.getMarkers();
    const dongNames = markers.map((marker) => marker.customData?.dong || '알 수 없음');
    console.log('Hovered Cluster:', dongNames.join(', '));
  };

  const updateMarkers = async (locations) => {
    if (!mapRef.current || !clustererRef.current || !geocoder.current) return;

    clustererRef.current.clear();

    const markers = await Promise.all(
      locations.map(async (location) => {
        const position = new window.kakao.maps.LatLng(location.lat, location.lng);
        const dongName = await getDongNameFromCoords(position);
        const marker = new window.kakao.maps.Marker({
          position,
          title: dongName || '알 수 없음',
        });
        marker.customData = { dong: dongName }; // Marker에 "동" 정보 저장
        console.log('Marker Data:', marker.customData);
        return marker;
      })
    );

    clustererRef.current.addMarkers(markers);

    // 클러스터 내부 텍스트 동적으로 추가
    clustererRef.current._clusters.forEach((cluster) => {
      const markers = cluster.getMarkers();
      const dongNames = markers.map((marker) => marker.customData?.dong || '알 수 없음');
      const uniqueDongs = [...new Set(dongNames)];
      const clusterText = `${uniqueDongs.join(', ')} (${markers.length})`;

      // CustomOverlay를 클러스터 중심에 추가
      const overlay = new kakao.maps.CustomOverlay({
        position: cluster.getCenter(),
        content: `<div style="width: 50px; height: 50px; background: rgba(255, 255, 255, 0.9); 
                    border-radius: 50%; display: flex; align-items: center; justify-content: center; 
                    font-weight: bold; color: #004c80; border: 2px solid #004c80;">
                    ${clusterText}
                  </div>`,
                yAnchor: 0.5,
      });
      overlay.setMap(mapRef.current);
    });
  };

  const getDongNameFromCoords = (coords) => {
    return new Promise((resolve) => {
      geocoder.current.coord2RegionCode(coords.getLng(), coords.getLat(), (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const dongRegion = result.find((r) => r.region_type === 'H');
          resolve(dongRegion ? dongRegion.region_3depth_name : null);
        } else {
          resolve(null);
        }
      });
    });
  };

  useEffect(() => {
    if (locations.length > 0) {
      updateMarkers(locations);
    }
  }, [locations, filters]);

  return <div id="map" className={styles.mapContainer} />;
};

export default MapView;
