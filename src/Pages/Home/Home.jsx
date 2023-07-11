import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";

// data
import pills from "./homePillsData";
import course from "./homeEduData";
// HOOK
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  // variables
  let navi = useNavigate();
  let states = useSelector((state) => state);

  return (
    <>
      <main className={`${styles.main_page_container}`}>
        {/* MAIN_SECTION_FIRST */}
        <div className={`${styles.main_section_one} ${styles.container}`}>
          {/* MAIN_SECTION_FIRST_TEXTS */}
          <div className={styles.section_one_texts}>
            <div className={styles.section_one_texts_title}>
              <h1>포트폴리오 완성까지 책임지는</h1>
              <h1>Online 프로그래밍 강좌</h1>
            </div>
            <div className={styles.section_one_texts_subtitle}>
              <p>
                코딩애플 <span>온라인 과정</span> 개강!
              </p>
              <p>기초부터 실무까지 단기완성으로!</p>
            </div>
            <div className={styles.section_one_texts_pills}>
              {pills.map((el, i) => {
                return (
                  <div className={styles.section_one_texts_pills_item} key={i}>
                    <p>{el.name}</p>
                  </div>
                );
              })}
            </div>
            <button className={styles.main_button}>강의 목록 보기</button>
          </div>
          {/* MAIN_SECTION_FIRST_IMAGES */}
          <div className={styles.section_one_images}>
            <div className={`${styles.bubble1} ${styles.bubble}  `}>
              <img src={process.env.PUBLIC_URL + "main1.jpg"} alt="" />
            </div>
            <div className={`${styles.bubble2} ${styles.bubble} `}>
              <img src={process.env.PUBLIC_URL + "main2.jpg"} alt="" />
            </div>
            <div className={styles.worker}>
              <img src={process.env.PUBLIC_URL + "main3.png"} alt="" />
            </div>
          </div>
        </div>

        {/* MAIN_SECTION_SECOND */}
        <section
          className={`${styles.section_second_container} ${styles.container}`}
        >
          <div className={styles.section_second}>
            <div className={styles.section_second_top}>
              <h3>
                수박코딩 웹개발 <span>프리패스</span>
              </h3>
              <img src={process.env.PUBLIC_URL + "present.png"} alt="" />
            </div>
            <div className={styles.section_second_course}>
              {course.map((el, i) => {
                return (
                  <div className={styles.course_item} key={i}>
                    <img src={el.image} alt="" />
                    <h6>{el.name}</h6>
                    <h6>{el.secondName}</h6>
                  </div>
                );
              })}
            </div>
            <div className={styles.section_second_bottom}>
              <div className={styles.section_second_price}>
                <h4>
                  <span>￦</span>482,000
                </h4>
                <h3>
                  <span>￦</span>230,000
                </h3>
              </div>
              <div className={styles.section_second_description}>
                <p>월 1만 9천원에 즐기는 프론트/백엔드 웹개발 풀코스</p>
                <h1>프리패스 Essential</h1>
              </div>
            </div>
          </div>
        </section>
        {/* MAIN_SECTION_THIRD */}
        <img src="" alt="" />
        <section className={`${styles.section_third}`}>
          <div className={`${styles.edu_list} ${styles.grid}`}>
            {states.eduList.map((el, i) => {
              return (
                <div
                  key={i}
                  className={styles.section_third_edu_card}
                  onClick={() => {
                    navi(`/detail/${el.id}`);
                  }}
                >
                  <img src={el.image} alt="" />
                  <h3>{el.title}</h3>
                  <p>{el.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
