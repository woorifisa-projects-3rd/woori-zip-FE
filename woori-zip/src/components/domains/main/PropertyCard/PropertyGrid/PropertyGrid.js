import styles from './PropertyGrid.module.css';
import Link from 'next/link';
import Image from 'next/image';


export default function PropertyGrid() {
 return (
   <div className={styles.property_grid}>
     <div className={styles.property_section}>
       <div className={styles.property_card}>
         <Link href="/">
           <h2 className='gmarket'>원/투룸</h2>
           <p>청년 사용자의 생활 패턴에</p>
            <p>맞춘 매물을 한번에!</p>
           <img src="/images/Oneroom.png" alt="원룸 이미지" />
         </Link>
       </div>
       
       <div className={styles.property_card}>
         <Link href={"/"}>
         <h2 className='gmarket'>오피스텔</h2>
         <p>월세, 전세 매물을 추천하고</p>
          <p> 대출 상품 연계 제공</p>
         <img src="/images/Officetel.png" alt="오피스텔 이미지" />
         </Link>
       </div>
    
       <div className={styles.property_card}>
       <Link href={"/"}>
         <h2 className='gmarket'>주택/빌라</h2>
         <p>청년들에게 적합한 대출 상품을 맞춤 추천하고 대출 연계 가능</p>
         <img src="/images/House.png" alt="주택 이미지" />
        </Link>
       </div>
       
       <div className={styles.property_card}>
       <Link href={"/"}>
         <h2 className='gmarket'>아파트</h2>
         <p>청년 사용자의 생활 패턴에</p> 
          <p>맞춘 매물을 한번에!</p>
         <img src="/images/apartment.jpg" alt="아파트 이미지" />
        </Link>
       </div>
     </div>

     <div className={styles.info_banner}>
       <Link href={"/"}>
       <div className=''>
       <h2 className='gmarket'>소비 패턴 분석을 통한 맞춤형 카테고리별 <i className={styles.dpb}></i> 집 추천</h2>
       </div>
       <p>소비 패턴을 분석해 사용자의</p>
         <p>선호도에 맞는 카테고리별</p>
          <p> 집을 추천하여, 더 개인화된 </p>
            <p>주거 선택을 돕는 서비스입니다.</p>
            <div className={styles.Image_big}>
          <Image src="/images/Graph.png" width={250} height={250} alt="Graph" />
          </div>
       </Link>
     </div>
   </div>
 );
}