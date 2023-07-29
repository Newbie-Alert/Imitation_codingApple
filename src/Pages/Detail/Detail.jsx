import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faClock,
  faSignal,
  faStar,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import HtmlParser from "react-html-parser";
import styles from "./Detail.module.css";

function Detail() {
  // STATE
  let [detail, setDetail] = useState([]);
  let [lesson, setLesson] = useState([]);
  let [lessonTwo, setLessonTwo] = useState([]);
  let [showLesson, setShowLesson] = useState(["show", "hide"]);
  let ReapeatStar = [1, 2, 3, 4, 5];
  let [reviews, setReviews] = useState([]);
  let [reviewCount, setReviewCount] = useState();
  let score = [];
  reviews.map((el, i) => {
    score.push(el.score);
  });
  let average = 0;
  score.forEach((el) => {
    average += el;
  });
  average = average / reviewCount;
  let [title, setTitle] = useState("");

  // HOOK
  let navi = useNavigate();
  let id = useParams();
  console.log(id);
  useEffect(() => {
    // 해당 페이지 강의 리스트
    axios
      .get(`https://imitation-project.du.r.appspot.com/data/detail/${id.id}`)
      .then((result) => {
        setDetail(result.data);
        setLesson(result.data.chapter);
        setLessonTwo(result.data.chapter2);
        // 해당 강좌 리뷰, 리뷰 관련 정보
        axios
          .all([
            axios.get(
              `https://imitation-project.du.r.appspot.com/reviews/${id.id}`
            ),
            axios.get(
              `https://imitation-project.du.r.appspot.com/count/${id.id}`
            ),
          ])
          .then(
            axios.spread((res1, res2) => {
              setReviews(res1.data.review);
              setReviewCount(res2.data.count);
              setTitle(res2.data.name);
            })
          );
      });
  }, []);

  // UI관련 함수
  /** 강좌 리스트 UI 스위치 인자로 0 || 1을 갖는다 */
  function showAndHide(num) {
    if (showLesson[num] === "hide") {
      let copy = [...showLesson];
      copy[num] = "show";
      setShowLesson(copy);
    }
    if (showLesson[num] === "show") {
      let copy = [...showLesson];
      copy[num] = "hide";
      setShowLesson(copy);
    }
  }

  return (
    <div className={`${styles.container} ${styles.detail_container}`}>
      <div className={styles.detail_top}>
        <h1>{detail.title}</h1>
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
            <h5>{`( ${detail.review} 리뷰 )`}</h5>
          </div>
          <div className={styles.student}>
            <FontAwesomeIcon icon={faUserGroup} />
            <h5>{detail.student} 수강생</h5>
          </div>
        </div>
      </div>
      <div className={styles.detail_main}>
        <div className={styles.detail_main_left}>
          <img src={process.env.PUBLIC_URL + detail.image} alt="" />
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
                navi(`/board/${title}/${id.id}`);
              }}
            >
              게시판
            </h4>
          </div>
        </div>
        <div className={styles.detail_main_right}>
          <div className={styles.detail_right_top}>
            <div className={styles.detail_right_top_btn}>
              <button
                onClick={() => {
                  axios
                    .post("https://imitation-project.du.r.appspot.com/add", {
                      id: parseInt(id.id),
                      name: detail.title,
                      price: parseInt(detail.price),
                      quantity: 1,
                    })
                    .then(navi("/cart"));
                }}
              >
                신청하기
              </button>
            </div>
            <div className={styles.detail_right_top_price}>
              <h4 style={{ textDecoration: "line-through", color: "#AFAFAF" }}>
                현장 강의: 160,000원
              </h4>
              <h4>{detail.price}원</h4>
            </div>
            <div className={styles.detail_right_top_date}>
              <h4>365 DAYS</h4>
              <FontAwesomeIcon icon={faSignal} />
            </div>
          </div>
          <div className={styles.detail_right_mid}>
            <h3>{detail.student}명의 수강생</h3>
          </div>
          <div className={styles.detail_right_bot}>
            <p>영상 버퍼링 이슈가 생긴다면 ▶</p>
          </div>
        </div>
      </div>
      <TAB detail={detail} />

      {/* Curriculum */}
      <div className={styles.curri_line}>
        <div className={styles.curri_text}>
          <h3>커리큘럼</h3>
        </div>
      </div>
      <div className={styles.curriculum}>
        <table className={styles.carri_one}>
          <tbody>
            <tr className={styles.section}>
              <td>
                <h3>Part 1: 사과후레시</h3>
              </td>
              <td>
                <button
                  onClick={() => {
                    showAndHide(0);
                  }}
                >
                  <h6>+</h6>
                </button>
              </td>
            </tr>
            {showLesson[0] == "show" ? <TABLE lesson={lesson} /> : null}
          </tbody>
        </table>
        <table className={styles.carri_one}>
          <tbody>
            <tr className={`${styles.section} ${styles.two}`}>
              <td>
                <h3>Part 2: 게시판 프로젝트</h3>
              </td>
              <td>
                <button
                  onClick={() => {
                    showAndHide(1);
                  }}
                >
                  <h6>+</h6>
                </button>
              </td>
            </tr>
            {showLesson[1] == "show" ? <TABLE2 lessonTwo={lessonTwo} /> : null}
          </tbody>
        </table>
      </div>

      {/* REVIEW */}
      <div className={styles.review_line}>
        <div className={styles.review_text}>
          <h3>수강생 리뷰</h3>
        </div>
      </div>
      <div className={styles.review_score}>
        <h2>{average.toFixed(1)}</h2>
        <div>
          {ReapeatStar.map((i) => {
            return (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                style={{ color: "#ffdd33" }}
              />
            );
          })}
        </div>

        <h4>{`${detail.review} ratings `}</h4>
      </div>
      <div className={styles.review_tab}>
        <div className={styles.review_container}>
          <REVIEWS reviews={reviews} ReapeatStar={ReapeatStar} />
        </div>
      </div>
    </div>
  );
}

// COMPONENT

// 강의소개 탭
function TAB({ detail }) {
  const htmlString = detail.about;
  return <div className={styles.tab}>{HtmlParser(htmlString)}</div>;
}

// 강좌 리스트 1
function TABLE({ lesson }) {
  return (
    <>
      {lesson.map((el, i) => {
        return (
          <tr key={i} className={`${styles.lesson}`}>
            <td className={styles.carri_icon}>
              {<FontAwesomeIcon icon={faCirclePlay} />}
            </td>
            <td className={styles.carri_title}>{el.title}</td>
            <td className={styles.carri_timer}>
              <FontAwesomeIcon icon={faClock} />
            </td>
            <td className={styles.carri_duration}>{el.duration}</td>
          </tr>
        );
      })}
    </>
  );
}

// 강좌 리스트 2
function TABLE2({ lessonTwo }) {
  return (
    <>
      {lessonTwo.map((el, i) => {
        return (
          <tr key={i} className={`${styles.lesson}`}>
            <td className={styles.carri_icon}>
              {<FontAwesomeIcon icon={faCirclePlay} />}
            </td>
            <td className={styles.carri_title}>{el.title}</td>
            <td className={styles.carri_timer}>
              <FontAwesomeIcon icon={faClock} />
            </td>
            <td className={styles.carri_duration}>{el.duration}</td>
          </tr>
        );
      })}
    </>
  );
}

function REVIEWS({ reviews, ReapeatStar }) {
  return (
    <>
      {reviews.map((el, i) => {
        return (
          <div key={i} className={styles.review_box}>
            <div className={styles.review_user_profile}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className={styles.review_content}>
              <h4>{el.title}</h4>
              <div>
                {ReapeatStar.map((i) => {
                  return (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={styles.star}
                      style={{ color: "#ffdd33" }}
                    />
                  );
                })}
              </div>
              <p>{el.review}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

function STAR({ ReapeatStar, average }) {
  return (
    <div
      className={styles.star_box}
      style={{ backgroundSize: `${average}% 20px` }}
    >
      <div>
        {ReapeatStar.map((i) => {
          return (
            <FontAwesomeIcon key={i} icon={faStar} className={styles.star} />
          );
        })}
      </div>
    </div>
  );
}

export default Detail;
