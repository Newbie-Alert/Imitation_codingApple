import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BoardContent.module.css";

function BoardContent() {
  let id = useParams();
  let [content, setContent] = useState([]);
  let [current, setCurrent] = useState([]);
  let [commentUI, setCommentUi] = useState(false);

  useLayoutEffect(() => {
    axios
      .get(
        `https://imitation-project.du.r.appspot.com/board/content/${id.id1}/${id.id2}`
      )
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

      <div className={styles.reply}>
        <button
          onClick={() => {
            commentUI == false ? setCommentUi(true) : setCommentUi(false);
          }}
          className={styles.reply_UiBtn}
        >
          댓글
        </button>
      </div>
      {commentUI == true ? <REPLY /> : null}
      <REPLYFORM title={id.id2} />
    </div>
  );
}

// reply form
function REPLY() {
  return (
    <div className={styles.comment_container}>
      <h3>user name</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        perspiciatis nulla minus odit quidem, ipsa eos et accusamus doloribus
        voluptas dolorem necessitatibus sed eius soluta ipsum. Sunt impedit iure
        corrupti?
      </p>
    </div>
  );
}

function REPLYFORM({ title }) {
  return (
    <div className={styles.reply_form} action="/reply" method="POST">
      <input
        type="text"
        placeholder="댓글을 입력하세요..."
        name="comment"
        id="comment_content"
      />
      <button
        onClick={() => {
          let date = new Date();
          date = date.getTime();
          let comment = document.querySelector("#comment_content");
          axios
            .post("http://localhost:8080/reply", {
              title: title,
              comment: comment.value,
              time: date,
            })
            .then(window.location.reload());
        }}
        className={styles.add_comment}
      >
        추가
      </button>
    </div>
  );
}

export default BoardContent;
