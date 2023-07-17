import React, { useEffect, useState } from "react";
import styles from "./NavComp.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

import LoginComp from "../login/LoginComp";
import axios from "axios";

function NavComp() {
  // STATE
  let [menuSwitch, setMenuSwitch] = useState(false);
  let [menuClass, setMenu] = useState([styles, styles, styles]);
  let [menuCount, setMenuCount] = useState(false);
  let [containerClass, setContainerClass] = useState(styles);
  let [sign, setSign] = useState(false);
  let [loginUi, setLoginUi] = useState(false);
  let [current, setCurrent] = useState(styles.active);

  // USER UI
  let [userUi, setUserUi] = useState(false);

  // HOOK
  let navi = useNavigate();
  let [page, setPage] = useState();
  // useEffect
  useEffect(() => {
    // mount 시 login 상태 받아옴, 상태에 따라 UI에 로그인이 표기되거나 user 아이콘이 표기
    const loadUserStatus = function () {
      axios.get("http://localhost:8080/confirm").then((result) => {
        if (result.data.activate === 1) {
          setSign((sign = true));
        }
      });
    };
    return loadUserStatus;
  }, []);

  // FUNCTION
  /** 메뉴를 클릭하면 X자 형태로 변환되는 함수 **/
  function menuAction() {
    // 메뉴 햄버거 X자로 이동
    if (menuCount === false) {
      setMenuCount((menuCount = true));
      let copy = [...menuClass];
      setMenu((copy = [styles.menu_left, styles.menu_right, styles.menu_none]));
      menuClass = copy;

      // Container 좌로 이동
      setContainerClass((containerClass = styles.move));
    }
    // 메뉴 햄버거 원위치
    else if (menuCount === true) {
      setMenuCount((menuCount = false));
      let copy = [...menuClass];
      setMenu((copy = [styles, styles, styles]));
      menuClass = copy;

      // Container 원 위치
      // setContainerClass((containerClass = styles));
    }
  }

  return (
    <>
      {loginUi == true ? <LoginComp /> : null}
      <SlideMenu containerClass={containerClass} menuAction={menuAction} />
      <div className={`${styles.nav_container} ${styles.container}`}>
        {userUi == true ? <UserPopup navi={navi} /> : null}
        <div className={styles.nav_logo} onClick={() => navi("/")}>
          <img src={process.env.PUBLIC_URL + "/logo.png"} alt="" />
        </div>
        <div className={styles.nav_info}>
          <div className={styles.nav_category}>
            <ul>
              <li
                onClick={() => {
                  setPage(0);
                  navi("/");
                }}
                className={`${styles.nav_category_item} ${
                  page == 0 ? current : null
                }`}
              >
                HOME
              </li>
              <li
                onClick={() => {
                  setPage(1);
                  navi("/course");
                }}
                className={`${styles.nav_category_item} ${
                  page == 1 ? current : null
                } `}
              >
                COURSE
              </li>
              <li
                onClick={() => {
                  setPage(2);
                  navi("/page");
                }}
                className={`${styles.nav_category_item}
                ${page == 2 ? current : null} `}
              >
                ABOUT
              </li>
            </ul>
          </div>
          {sign == false ? (
            <h4
              onClick={() => {
                setLoginUi(true);
              }}
            >
              로그인
            </h4>
          ) : (
            <UserIcon userUi={userUi} setUserUi={setUserUi} />
          )}

          <FontAwesomeIcon className={styles.icon_cart} icon={faShoppingCart} />
          <div className={styles.nav_info_menu} onClick={menuAction}>
            <div className={`${styles.menu} ${menuClass[0]}`}></div>
            <div className={`${styles.menu} ${menuClass[1]}`}></div>
            <div className={`${styles.menu} ${menuClass[2]}`}></div>
          </div>
        </div>
      </div>
    </>
  );
}

// UI Composition for Nav
function UserPopup() {
  return (
    <div className={styles.user_container}>
      <div className={styles.user_top}>
        <img src={process.env.PUBLIC_URL + "user.png"} alt="user-ui-img" />
        <div className={styles.user_top_info}>
          <div>
            <h3>user</h3>
            <h5>프로필 보기</h5>
          </div>
          <h5
            onClick={() => {
              axios
                .post("http://localhost:8080/logout", {
                  data: 0,
                })
                .then(document.location.reload());
            }}
          >
            로그아웃
          </h5>
        </div>
      </div>
      <div className={styles.user_bottom}>
        <ul>
          <li>수강 중 강좌</li>
          <li>알림</li>
          <li>설정</li>
        </ul>
      </div>
    </div>
  );
}

// Comp for NAV
function SlideMenu({ containerClass, menuAction }) {
  return (
    <div className={`${styles.menu_container} ${containerClass}`}>
      <h4
        onClick={() => {
          menuAction();
        }}
      >
        X
      </h4>
    </div>
  );
}
function UserIcon({ userUi, setUserUi }) {
  return (
    <div className={styles.nav_user}>
      <img
        onClick={() => {
          userUi === false
            ? setUserUi((userUi = true))
            : setUserUi((userUi = false));
        }}
        src={process.env.PUBLIC_URL + "user.png"}
        alt="user_icon"
        width={"30px"}
      />
      <span
        onClick={() => {
          userUi === false
            ? setUserUi((userUi = true))
            : setUserUi((userUi = false));
        }}
        className={styles.nav_info_name}
        style={{ marginLeft: "9px" }}
      >
        user
      </span>
    </div>
  );
}

export default NavComp;
