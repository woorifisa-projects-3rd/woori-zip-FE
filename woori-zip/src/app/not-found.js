// app/404.js
'use client';

import React from 'react';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: '#F4FCFF',
        color: '#1a202c',
      }}
    >
      <div style={{ marginBottom: '0px' }}>
        <img
          src="/images/404.jpg"
          alt="404 Illustration"
          style={{
            maxWidth: '500px',
            width: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
      <h1
        style={{
          fontSize: '3rem',
          fontWeight: '700',
          margin: '10px 0',
        }}
      >
        페이지를 찾을 수 없습니다
      </h1>
      <p
        style={{
          fontSize: '1.25rem',
          color: '#4a5568',
          marginBottom: '30px',
          lineHeight: '1.6',
        }}
      >
        요청하신 페이지가 존재하지 않거나 삭제되었습니다. <br />
        계속해서 문제가 발생한다면 관리자에게 문의하세요.
      </p>
      <a
        href="/"
        style={{
          display: 'inline-block',
          padding: '15px 30px',
          fontSize: '1rem',
          fontWeight: '600',
          color: '#ffffff',
          backgroundColor: '#0070f3',
          borderRadius: '5px',
          textDecoration: 'none',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#2b6cb0')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#3182ce')}
      >
        홈으로 돌아가기
      </a>
    </div>
  );
}
