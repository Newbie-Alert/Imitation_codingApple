import React, { useEffect, useState } from "react";
import styles from "./LoginComp.module.css";

function LoginComp() {
  let [uiSwitch, setUiSwitch] = useState(false);

  return (
    <>
      {uiSwitch == true ? <LoginComp /> : null}
      <div
        className={styles.bg}
        onClick={(e) => {
          setUiSwitch(false);
        }}
      ></div>
      <div className={styles.login_container}>
        <form action="http://localhost:8080/login" method="POST">
          <div className={styles.login_id}>
            <label>아이디</label>
            <input type="text" name="id" />
          </div>
          <div className={styles.login_pw}>
            <label>비밀번호</label>
            <input type="password" name="pw" />
          </div>
          <button type="submit">로그인</button>
        </form>
      </div>
    </>
  );
}

export default LoginComp;
