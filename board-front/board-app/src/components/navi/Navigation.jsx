import React, { useState } from 'react';
import "./Navigation.css";
import NavItem from "./NavItem";

function Navigation() {
    // useState 훅을 이용하여 menuToggle이라는 상태값을 false로 초기화
    //menuToggle은 화면의 크기가 작아졌을 때 생기는 버거아이콘을 클릭하면, 메뉴바가 사이드에서 보이도록 하기 위한 토글
    const [menuToggle, setMenuToggle] = useState(false); 

    //메뉴에 들어갈 이름과 주소값을 정의한 배열
    const items = [
        { name: "Home", address: "/" },
        { name: "List", address: "/board" },
        { name: "Create", address: "/create-board" },
        { name: "Menu-3", address: "/menu3" },
        { name: "Menu-4", address: "/menu4" },
      ];

    return (
        <nav className="navigation__wrapper">
            {/*burger icon*/}
            <div
                className={!menuToggle ? "burger__menu" : "x__menu"}
                onClick={() =>
                    menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                }
                >
                <div className="burger_line1"></div>{/*버거메뉴를 css로 그리기 위해 작성한 태그*/}
                <div className="burger_line2"></div>{/*버거메뉴를 css로 그리기 위해 작성한 태그*/}
                <div className="burger_line3"></div>{/*버거메뉴를 css로 그리기 위해 작성한 태그*/}
            </div>

            <div
                className={[
                    "menu__box",
                    !menuToggle ? "menu__box__hidden" : "menu__box__visible",
                    ].join(" ")}
                >
                <div className="menu__list">
                    {items.map((item, index) => (
                         <NavItem
                             data={item}
                             key={item.address}
                             offNav={() => setMenuToggle(false)}
                         />
                    ))}
                </div>
            </div>

        </nav>
    );
}

export default Navigation;