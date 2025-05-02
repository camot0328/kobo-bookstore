import "../styles/Footer.css";
import React from "react";
import koboLogo from "../assets/logo/kobo-logo.png";

function Footer() {
  return (
    <footer className="footerOuter">
      {/* 1. 경계선이 전체 폭으로 나올 topNotice 래퍼 */}
      <div className="topNoticeBorder">
        <div className="topNoticeContent">
          <span className="notice">
            공지사항 | 기프트카드 이용약관 변경 안내(3/28)
          </span>
          <span className="separator">|</span>
          <span className="winner">
            당첨자발표 | [입반단독] 클로즈의 후쿠오카 이벤트
          </span>
        </div>
      </div>

      <div className="footerGrid">
        {/* ---------- 왼쪽 열 ---------- */}
        <div className="leftArea">
          <div className="logoArea">
            {" "}
            <img src={koboLogo} alt="교보문고 로고" />
          </div>

          <div className="companyLinks">
            <span>회사소개</span>
            <p>|</p>
            <span>이용약관</span>
            <p>|</p>
            <span>개인정보처리방침</span>
            <p>|</p>
            <span>청소년보호정책</span>
            <p>|</p>
            <span>대량주문안내</span>
            <p>|</p>
            <span>협력사</span>
            <p>|</p>
            <span>채용정보</span>
            <p>|</p>
            <span>광고소개</span>
          </div>

          <div className="companyInfo">
            대표이사 : 허정도 | 서울특별시 종로구 종로1 | 사업자등록번호 :
            102-81-11670
            <br />
            대표전화 : 1544-1900 | FAX : 0502-987-5711 | 통신판매업신고번호 : 제
            653호
          </div>
        </div>

        {/* ---------- 오른쪽 열 ---------- */}
        <div className="rightArea">
          <div className="familyAndSNS">
            <select className="familySiteSelect">
              <option>Family Site</option>
              <option>교보문고</option>
              <option>핫트랙스</option>
              <option>sam</option>
            </select>
            <div className="snsIcons">
              <span>🔵</span>
              <span>🟢</span>
              <span>🔴</span>
            </div>
          </div>
          <div className="purchaseSafety">
            토스페이먼츠 구매안전서비스
            <br />
            고객님은 안전거래를 위해 현금 등으로 결제 시 저희 쇼핑몰에서 가입한
            토스페이먼츠의 구매안전서비스를 이용하실 수 있습니다.
          </div>
          <div className="isms">
            정보보호관리체계 ISMS 인증획득
            <br />
            [인증범위] 인터넷 교보문고 및 브랜드 서비스 운영
            <br />
            [유효기간] 2023.11.15 ~ 2026.11.14
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
