import Link from 'next/link';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-left"></div>
      <Link href={"/"}>
      <h1 className="header-title">WOORI ZIP</h1>
      </Link>
      <button className="login-button">로그인</button>
    </header>
  );
}