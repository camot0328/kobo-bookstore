// import React, { useState, useEffect } from "react";
import discount from "../../assets/icon/svg/discount.svg";
import special from "../../assets/icon/svg/special.svg";
import bookflower from "../../assets/icon/svg/bookflower.svg";
import music from "../../assets/icon/svg/music.svg";
import publish from "../../assets/icon/svg/publish.svg";
import monthly from "../../assets/icon/svg/monthly.svg";
import handwrite from "../../assets/icon/svg/handwrite.svg";
import present from "../../assets/icon/svg/present.svg";
import recommend from "../../assets/icon/svg/recommend.svg";
import kbApp from "../../assets/icon/svg/kbApp.svg";

function BottomMenu() {
  const icons = [
    {
      name: "할인혜택",
      img: discount,
      url: "https://event.kyobobook.co.kr/benefit",
    },
    {
      name: "오늘만특가",
      img: special,
      url: "https://hottracks.kyobobook.co.kr/ht/hot/hotdealMain",
    },
    {
      name: "책그리고꽃",
      img: bookflower,
      url: "https://event.kyobobook.co.kr/detail/208794",
    },
    {
      name: "음반·영상",
      img: music,
      url: "https://hottracks.kyobobook.co.kr/ht/record/recordMain",
    },
    {
      name: "바로출판",
      img: publish,
      url: "https://product.kyobobook.co.kr/pod/main",
    },
    {
      name: "이달의책",
      img: monthly,
      url: "https://event.kyobobook.co.kr/detail/234165",
    },
    {
      name: "손글씨캠페인",
      img: handwrite,
      url: "https://store.kyobobook.co.kr/handwriting/contest",
    },
    {
      name: "사은품",
      img: present,
      url: "https://event.kyobobook.co.kr/gift-promotions",
    },
    {
      name: "추천",
      img: recommend,
      url: "https://store.kyobobook.co.kr/recommend",
    },
    {
      name: "APP혜택",
      img: kbApp,
      url: "https://event.kyobobook.co.kr/make/234124",
    },
  ];

  return (
    <div className="bottomMenu">
      {icons.map((icon, index) => (
        <a
          key={index}
          href={icon.url}
          className="menuItem"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="iconBox">
            <img src={icon.img} alt={icon.name} />
          </div>
          <div className="menuText">{icon.name}</div>
        </a>
      ))}
    </div>
  );
}

export default BottomMenu;
