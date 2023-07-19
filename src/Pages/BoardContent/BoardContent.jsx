import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BoardContent.module.css";

function BoardContent() {
  let id = useParams();
  let [content, setContent] = useState([]);
  let [current, setCurrent] = useState([]);

  useLayoutEffect(() => {
    axios
      .get(`http://localhost:8080/board/content/${id.id1}/${id.id2}`)
      .then((result) => {
        setContent((content = result.data));
        let currentData = content.find((el) => el.title == id.id2);
        setCurrent(currentData);
      });
  }, []);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8080/board/content/${id.id1}/${id.id2}`)
  //     .then((result) => {
  //       setContent(result.data);
  //     });
  //   let currentData = content.find((el) => el.title == id.id2);
  //   setCurrent(currentData);
  // }, []);
  return (
    <div className={styles.content_container}>
      <div className={styles.content_title}>
        <h2>Q. {current.title}</h2>
      </div>

      <div className={styles.content_main}>
        <p>{current.content}</p>
      </div>
    </div>
  );
}

export default BoardContent;
