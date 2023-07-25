import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BoardContent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTurnDown } from "@fortawesome/free-solid-svg-icons";

function BoardContent() {
  let id = useParams();
  let [content, setContent] = useState([]);
  let [current, setCurrent] = useState([]);
  let [comment, setComment] = useState([]);
  let [re_comment, setRecomment] = useState([]);
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

    axios.get(`http://localhost:8080/comment/${id.id2}`).then((result) => {
      setComment((comment = result.data));
      console.log(comment);
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
      {commentUI == true && comment !== null ? (
        <REPLY comment={comment} title={id.id2} />
      ) : null}
      <REPLYFORM title={id.id2} />
    </div>
  );
}

// reply form
function REPLY({ comment, title, re_comment }) {
  return (
    <>
      {comment.map((el, i) => {
        return (
          <div key={i} className={styles.comment_container}>
            <div className={styles.re_comment}>
              <h3>user name</h3>
              <p id="target" data-id={el._id}>
                {el.comment}
              </p>
            </div>

            <div className={styles.re_reply_box}>
              {comment[i].re_comment !== null
                ? comment[i].re_comment.map((el, i) => {
                    return (
                      <div key={i} className={styles.re_reply}>
                        <FontAwesomeIcon
                          icon={faTurnDown}
                          className={styles.re_comment_arrow}
                        />
                        <div>
                          <h3>userName</h3>
                          <p>{el.comment}</p>
                        </div>
                      </div>
                    );
                  })
                : null}
              <div className={styles.re_comment_input}>
                <input
                  type="text"
                  placeholder="댓글을 입력하세요..."
                  name="re_comment"
                  id={`re_comment_content${i}`}
                />
                <button
                  data-id={el._id}
                  onClick={(e) => {
                    let date = new Date();
                    date = date.getTime();
                    let re_comment = document.querySelector(
                      `#re_comment_content${i}`
                    );
                    axios
                      .post(`http://localhost:8080/rereply`, {
                        title: title,
                        target: e.target.dataset.id,
                        comment: re_comment.value,
                        time: date,
                        re_comment: [],
                      })
                      .then(window.location.reload());
                  }}
                  className={styles.add_comment}
                >
                  추가
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function REPLYFORM({ title, id }) {
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
          let comment = document.querySelector("#comment_content");
          axios
            .post(`http://localhost:8080/reply`, {
              title: title,
              comment: comment.value,
              time: date,
              re_comment: [],
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
