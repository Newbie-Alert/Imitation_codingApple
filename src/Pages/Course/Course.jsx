import React, { useEffect, useState } from "react";
import styles from "./Course.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Course() {
  // STATE
  let [course, setCourse] = useState([]);
  let [grid, setGrid] = useState(styles);
  let [block, setblock] = useState(styles);

  // useEffect
  useEffect(() => {
    axios
      .get("https://imitation-project.du.r.appspot.com/course")
      .then((result) => {
        setCourse(result.data);
      });
  }, []);

  // HOOK
  let navi = useNavigate();

  return (
    <div>
      <div className={styles.course_list}>
        <div className={styles.sort_option}>
          {/* <select className={styles.select} id="course-order">
            <option value>정렬 순서</option>
            <option value="alphabet">가나다순</option>
            <option value="popular">인기순</option>
            <option value="alphabet">수강생순</option>
          </select> */}
          <div className={styles.list_display}>
            <FontAwesomeIcon
              className={styles.block}
              icon={faList}
              onClick={() => {
                setGrid((grid = styles));
                setblock(styles);
              }}
            />
            <FontAwesomeIcon
              className={styles.grid}
              icon={faGrip}
              onClick={() => {
                setGrid((grid = styles.set_grid));
                setblock(styles.set_block);
              }}
            />
          </div>
        </div>
      </div>
      <section className={`${styles.lists} ${grid}`}>
        {course !== null
          ? course.map((el, i) => {
              return (
                <div
                  onClick={() => {
                    navi(`/detail/${el.id}`);
                  }}
                  className={`${styles.lists_card} ${block}`}
                  key={i}
                >
                  <div className={styles.lists_card_img}>
                    <img src={`${process.env.PUBLIC_URL + el.image}`} alt="" />
                  </div>
                  <div className={styles.lists_card_info}>
                    <h2>{el.title}</h2>
                    <p>{el.description}</p>
                  </div>
                </div>
              );
            })
          : null}
      </section>
    </div>
  );
}

export default Course;
