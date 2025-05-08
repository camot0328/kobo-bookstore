import "../styles/Footer.css";
import React from "react";
import koboLogo from "../assets/logo/kobo-logo.png";

function Footer() {
  return (
    <footer className="footer-kobo">
      {/* 상단 공지 바 */}
      <div className="footer-notice-bar">
        <div className="notice-left">
          <strong>공지사항</strong>
          <span>어버이날 이벤트 안내 (5/8)</span>
        </div>
        <div className="notice-right">
          <strong>당첨자발표</strong>
          <span>나는 부활이요 생명이니 당첨자 발표</span>
        </div>
      </div>

      {/* 본문 푸터 */}
      <div className="footer-main">
        {/* 왼쪽: 로고 */}
        <div className="footer-logo-section">
          <a href="/">
            <img src={koboLogo} alt="코보문고 로고" className="footer-logo" />
          </a>
        </div>

        {/* 중앙: 링크 */}
        <ul className="footer-link-list">
          <li>
            <a href="#">회사소개</a>
          </li>
          <li>
            <a href="#">이용약관</a>
          </li>
          <li>
            <a href="#">
              <strong>개인정보처리방침</strong>
            </a>
          </li>
          <li>
            <a href="#">청소년보호정책</a>
          </li>
          <li>
            <a href="#">대량주문안내</a>
          </li>
          <li>
            <a href="#">협력사</a>
          </li>
          <li>
            <a href="#">채용정보</a>
          </li>
          <li>
            <a href="#">광고소개</a>
          </li>
        </ul>

        {/* 오른쪽: 소셜/패밀리사이트 */}
        <div className="footer-right-section">
          <select className="footer-family-select">
            <option>Family Site</option>
            <option>교보문고</option>
            <option>핫트랙스</option>
          </select>
          <div className="footer-social-icons">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      {/* 하단 정보 */}
      <div className="footer-bottom-info">
        <p>
          대표이사 : 허정도 | 서울특별시 종로구 종로1 | 사업자등록번호 :
          102-81-11670
        </p>
        <p>
          대표전화 : 1544-1900 | FAX : 0502-987-5711 | 통신판매업신고번호 :
          제653호
        </p>
        <p>© KOBO BOOKSTORE. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
