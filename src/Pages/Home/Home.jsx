import React from "react";
import styles from "./Home.module.css";

// data
import pills from "./homePillsData";

function Home() {
  return (
    <main className={`${styles.main_page_container}`}>
      <div className={`${styles.main_section_one} ${styles.container}`}>
        {/* MAIN_SECTION ONE_TEXTS */}
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
        {/* MAIN_SECTION ONE_IMAGES */}
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
    </main>
  );
}

export default Home;
