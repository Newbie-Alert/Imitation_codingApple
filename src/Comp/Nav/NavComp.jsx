import React, { useState } from "react";
import styles from "./NavComp.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function NavComp() {
  // STATE
  let [menuClass, setMenu] = useState([styles, styles, styles]);
  let [menuCount, setMenuCount] = useState(false);
  let [containerClass, setContainerClass] = useState(styles);

  // USER UI
  let [userUi, setUserUi] = useState(false);

  // HOOK
  let navi = useNavigate();

  // FUNCTION
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
      setContainerClass((containerClass = styles));
    }
  }

  return (
    <div
      className={`${styles.nav_container} ${styles.container} ${containerClass}`}
    >
      {userUi == true ? <UserPopup /> : null}
      <div
        className={styles.nav_logo}
        onClick={() => {
          navi("/");
        }}
      >
        <img src={process.env.PUBLIC_URL + "logo.png"} alt="" />
      </div>
      <div className={styles.nav_info}>
        <div className={styles.nav_user}>
          <img
            onClick={() => {
              userUi === false
                ? setUserUi((userUi = true))
                : setUserUi((userUi = false));
            }}
            src={process.env.PUBLIC_URL + "user.png"}
            alt="user_icon"
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

        <FontAwesomeIcon className={styles.icon_cart} icon={faShoppingCart} />
        <div className={styles.nav_info_menu} onClick={menuAction}>
          <div className={`${styles.menu} ${menuClass[0]}`}></div>
          <div className={`${styles.menu} ${menuClass[1]}`}></div>
          <div className={`${styles.menu} ${menuClass[2]}`}></div>
        </div>
      </div>
    </div>
  );
}

// Composition for Nav
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
          <h5>로그아웃</h5>
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

export default NavComp;
