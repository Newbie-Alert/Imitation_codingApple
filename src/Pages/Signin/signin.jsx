import React, { useState } from "react";
import styles from "./signin.module.css";

function SignIn() {
  let [info, setInfo] = useState("");
  let [infoSwitch, setInfoSwitch] = useState(false);
  let [pwStatus, setPwStatus] = useState();

  function IdRegex(userId) {
    let regExp = /^[a-zA-Z0-9]*$/gi;
    return regExp.test(userId);
  }
  function EmailRegex(userEmail) {
    let regExp2 =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,20}$/;
    return regExp2.test(userEmail);
  }
  function PwRegex(userPw) {
    // 문자열의 시작 ^
    // 하나 이상의 영소문자,영대문자 사용
    // !,@,#,$,%,^,*,=,- 중 하나 이상의 특수문자 포함
    // 하나 이상의 숫자 포함
    // 8 ~ 20 자리
    // 문자열의 끝 $
    let regExpStrong = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    let regExpMedium = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
    let regExpWeak = /^(?=.*[a-zA-Z]).{8,20}$/;

    if (regExpStrong.test(userPw) == true) {
      return "strong";
    } else if (regExpMedium.test(userPw) == true) {
      return "medium";
    } else {
      return "weak";
    }
  }

  function pwCheck(status) {
    if (status === "strong") {
      setPwStatus(2);
    } else if (status === "medium") {
      setPwStatus(1);
    } else {
      setPwStatus(0);
    }
  }

  function AlertTimeOut() {
    setTimeout(() => {
      setInfoSwitch(false);
    }, 1500);
  }
  return (
    <div className={styles.sign_in_container}>
      <form className={styles.sign_in_form} action="/user/signin" method="POST">
        {infoSwitch == true ? <ModalComp info={info} /> : null}
        <div className={`${styles.input_id} ${styles.input_box}`}>
          <label htmlFor="input_userId">아이디</label>
          <input
            required
            name="user-id"
            type="text"
            id="input_userId"
            className={`${styles.sign_in_input} ${styles.input_id}`}
            onChange={(e) => {
              if (IdRegex(e.target.value) == true) {
              } else if (IdRegex(e.target.value) == false) {
                setInfo("ID");
                setInfoSwitch(true);
                AlertTimeOut();
                e.target.value = "";
              }
            }}
          />
          <p
            style={{
              color: "red",
              letterSpacing: "0.01rem",
            }}
          >
            * 영문과 숫자 조합
          </p>
        </div>

        <div className={`${styles.input_email} ${styles.input_box}`}>
          <label htmlFor="input_userEmail">이메일</label>
          <input
            required
            placeholder="example@email.com"
            name="user-email"
            type="text"
            id="input_userEmail"
            className={`${styles.sign_in_input} ${styles.input_id}`}
          />
        </div>

        <div className={`${styles.input_pw} ${styles.input_box}`}>
          <label htmlFor="input_userPw">비밀번호</label>
          {<PwNotice pwStatus={pwStatus} />}
          <input
            onChange={(e) => {
              pwCheck(PwRegex(e.target.value));
            }}
            required
            maxLength={20}
            name="user-password"
            type="text"
            id="input_userPw"
            className={`${styles.sign_in_input} ${styles.input_id}`}
          />
          <p
            style={{
              color: "red",
              letterSpacing: "0.01rem",
            }}
          >
            * 숫자/영문/특수문자 조합(!,@,#,$,*) 8글자 이상
          </p>
        </div>

        <div className={`${styles.input_name} ${styles.input_box}`}>
          <label htmlFor="input_userName">이름</label>
          <input
            required
            name="user-name"
            type="text"
            id="input_userName"
            className={`${styles.sign_in_input} ${styles.input_id}`}
          />
        </div>
      </form>
    </div>
  );
}

/*
 ** 정규식 형식 체크
 ** 예시 1) $.regExpCheck($('#corp_num').val(), 'num2', 'str');
 ** 예시 2) $.regExpCheck($('#tel').val(), 'tel');
 */

let regExpCheck = function (sVal, sRegExpType, sReturnType) {
  if (typeof sReturnType == "undefined") {
    sReturnType = "bool";
  }
  var sRegExp1 = /^[]/;
  var sRegExp2 = /.*/;
  var sExpType = sRegExpType.toLowerCase();
  switch (sExpType) {
    case "eng":
      // 영문 체크
      sRegExp1 = /^[a-zA-Z\s-]/gi;
      break;
    case "tel1":
    case "tel2":
    case "tel":
      // 휴대폰번호 체크(하이픈 포함)
      sRegExp1 = /^01([0|16789]?)-?([0-9]{3,4})-?([0-9]{4})$/;
      // 휴대폰번호 체크(하이픈 미포함)
      sRegExp2 = /^(01[016789])([0-9]{7,8})$/;
      break;
    case "corpnum":
      // 사업자 등록번호 체크
      sRegExp1 = /^[0-9_-]{10,12}$/;
      break;
    case "passwd":
      // 비밀번호 체크
      sRegExp1 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
      break;
    case "num1":
    case "num2":
    case "num":
      // 숫자 체크(하이픈 미포함)
      sRegExp1 = /[^0-9]/gi;
      // 숫자 체크(하이픈 포함)
      sRegExp2 = /^[0-9\s-]+$/;
      break;
    case "email":
      // 이메일 체크
      sRegExp1 =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,20}$/;
      break;
    case "url":
      // URL 체크
      sRegExp1 =
        /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/;
      break;
    case "param":
      // URL 파라미터 체크
      sRegExp1 = /[&]+([^=&]+)=([^&]*)/gi;
      break;
    default:
      break;
  }

  // 형식 여부만 return
  if (sReturnType === "bool") {
    // 기본 형식체크 결과값
    var bRegExpResult = true;
    if (sRegExpType === "tel") {
      if (sVal !== "" && !sRegExp1.test(sVal) && !sRegExp2.test(sVal)) {
        bRegExpResult = false;
      }
    } else {
      if (sVal !== "" && !sRegExp1.test(sVal)) {
        bRegExpResult = false;
      }
    }

    return bRegExpResult;

    // 정규식에 맞지 않은 문자열 빈값으로 처리해서 return
  } else {
    if (sExpType === "tel2" || sExpType === "num2") {
      return sVal.replace(sRegExp2, "");
    }
    return sVal.replace(sRegExp1, "");
  }
};

// MODAL COMP
function ModalComp({ info }) {
  return (
    <div className={styles.alert_modal}>
      <p>{info}를 확인해주세요</p>
    </div>
  );
}

function PwNotice({ pwStatus }) {
  if (pwStatus === 0) {
    return (
      <div
        style={{
          width: "fit-content",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "100px",
          backgroundColor: "#FF6060",
        }}
      >
        <h4>weak</h4>
      </div>
    );
  } else if (pwStatus === 1) {
    return (
      <div
        style={{
          width: "fit-content",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "100px",
          backgroundColor: "rgb(45, 189, 64)",
        }}
      >
        <h4>medium</h4>
      </div>
    );
  }
  if (pwStatus === 2) {
    return (
      <div
        style={{
          width: "fit-content",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "100px",
          backgroundColor: "#0072de",
        }}
      >
        <h4>strong</h4>
      </div>
    );
  }
}

export default SignIn;
