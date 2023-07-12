import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignal,
  faStar,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import HtmlParser from "react-html-parser";

function Detail() {
  // STATE
  let [data, setData] = useState([]);
  let ReapeatStar = [1, 2, 3, 4, 5];

  // HOOK
  let id = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/detail/${id.id}`)
      .then((result) => setData(result.data));
  }, []);

  let navi = useNavigate();

  return (
    <div className={`${styles.container} ${styles.detail_container}`}>
      <div className={styles.detail_top}>
        <h1>{data.title}</h1>
        <div className={styles.detail_top_review}>
          <div className={styles.review}>
            {ReapeatStar.map((i) => {
              return (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  style={{ color: "#ffdd33" }}
                />
              );
            })}
            <h5>{`( ${data.review} 리뷰 )`}</h5>
          </div>
          <div className={styles.student}>
            <FontAwesomeIcon icon={faUserGroup} />
            <h5>{data.student} 수강생</h5>
          </div>
        </div>
      </div>
      <div className={styles.detail_main}>
        <div className={styles.detail_main_left}>
          <img src={process.env.PUBLIC_URL + data.image} alt="" />
          <div className={styles.detail_main_left_tab}>
            <h4
              onClick={() => {
                navi(`/detail/${id.id}`);
              }}
            >
              홈
            </h4>
            <h4
              onClick={() => {
                navi(`/board/${id.id}`);
              }}
            >
              게시판
            </h4>
          </div>
        </div>
        <div className={styles.detail_main_right}>
          <div className={styles.detail_right_top}>
            <div className={styles.detail_right_top_btn}>
              <button>신청하기</button>
            </div>
            <div className={styles.detail_right_top_price}>
              <h4 style={{ textDecoration: "line-through", color: "#AFAFAF" }}>
                현장 강의: 160,000원
              </h4>
              <h4>75,000원</h4>
            </div>
            <div className={styles.detail_right_top_date}>
              <h4>365 DAYS</h4>
              <FontAwesomeIcon icon={faSignal} />
            </div>
          </div>
          <div className={styles.detail_right_mid}>
            <h3>{data.student}명의 수강생</h3>
          </div>
          <div className={styles.detail_right_bot}>
            <p>영상 버퍼링 이슈가 생긴다면 ▶</p>
          </div>
        </div>
      </div>
      <TAB data={data} />
      <div className={styles.curriculum}></div>
    </div>
  );
}

function TAB({ data }) {
  const htmlString = data.about;
  return <div className={styles.tab}>{HtmlParser(htmlString)}</div>;
}

export default Detail;
