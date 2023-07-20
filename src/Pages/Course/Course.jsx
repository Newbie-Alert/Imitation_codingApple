import React, { useEffect, useState } from "react";
import styles from "./Course.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList } from "@fortawesome/free-solid-svg-icons";

function Course() {
  // STATE
  let [course, setCourse] = useState([]);

  // useEffect
  useEffect(() => {
    axios
      .get("https://imitation-project.du.r.appspot.com/course")
      .then((result) => {
        setCourse(result.data);
      });
  }, []);
  return (
    <div className="course_container">
      <div className={styles.form_container}>
        <form className={styles.search_form} action="/search" method="POST">
          <input placeholder="강좌 검색" type="text" name="title" />
        </form>
      </div>

      <div className={styles.course_list}>
        <div className={styles.sort_option}>
          <select className={styles.select} id="course-order">
            <option value>정렬 순서</option>
            <option value="alphabet">가나다순</option>
            <option value="popular">인기순</option>
            <option value="alphabet">수강생순</option>
          </select>
          <div className={styles.list_display}>
            <FontAwesomeIcon className={styles.block} icon={faList} />
            <FontAwesomeIcon className={styles.grid} icon={faGrip} />
          </div>
        </div>
      </div>
      <div className={styles.lists}>
        {course !== null
          ? course.map((el, i) => {
              return (
                <div className={styles.lists_card} key={i}>
                  <div className={styles.lists_card_img}>
                    <img src={`${process.env.PUBLIC_URL + el.image}`} alt="" />
                  </div>
                  <div className={styles.lists_card_info}>
                    <h2>{el.title}</h2>
                    <div className={styles.lists_card_info_review}>아직</div>
                    <p>{el.description}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Course;
