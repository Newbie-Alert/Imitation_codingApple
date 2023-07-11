import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";

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
        </div>
      </div>
    </div>
  );
}

export default Detail;
