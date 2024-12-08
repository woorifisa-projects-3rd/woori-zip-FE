"use client"; // 이 지시어를 추가합니다.

import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "./loading-animation.json"; // Lottie JSON 파일 경로

export default function Loading() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Lottie animationData={loadingAnimation} loop={true} style={{ width: 150, height: 150 }} />
      <p style={{ marginTop: "20px", fontSize: "18px", color: "#374151" }}>페이지를 불러오는 중입니다...</p>
    </div>
  );
}
