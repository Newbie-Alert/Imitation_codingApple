import React, { useEffect, useState } from "react";
import styles from "./Board.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Board() {
  let navi = useNavigate();
  let id = useParams();
  let [title, setTitle] = useState("");
  let [boardContent, setBoardContent] = useState([]);
  let [writeUI, setWriteUI] = useState(false);
  // GET DATA
  useEffect(() => {
    axios
      .get(
        `https://imitation-project.du.r.appspot.com/board/${id.id1}/${id.id2}`
      )
      .then((result) => {
        setTitle(result.data.title);
        setBoardContent(result.data.board);
      });
  }, []);

  return (
    <div className={styles.board_container}>
      <div className={styles.board_top}>
        <h2>{title} 게시판</h2>
        <button>강의로 돌아가기</button>
      </div>

      <section className={styles.board_main}>
        <div className={styles.board_search_write}>
          <form action="/search" method="POST">
            <input type="text" placeholder="현재 게시판 검색" />
            <button>검색</button>
          </form>
          <div className={styles.write}>
            <button
              onClick={() => {
                writeUI == false ? setWriteUI(true) : setWriteUI(false);
              }}
            >
              글 쓰기
            </button>
          </div>
        </div>
        <div className={styles.board_content}>
          <ul>
            <li className={styles.board_content_head}>
              <h3>게시글</h3>
            </li>
            {boardContent.map((el, i) => {
              return (
                <li
                  onClick={() => {
                    navi(`/board/content/${title}/${el.title}`);
                  }}
                  key={i}
                >
                  {el.title}
                </li>
              );
            })}
          </ul>
        </div>
        {writeUI == true ? <Write title={title} id={id} /> : null}
      </section>
    </div>
  );
}

function Write({ title, id }) {
  return (
    <div className={styles.write_form} id="write">
      <div className={styles.write_form_top}>
        <h2>{title}</h2>
        <span>게시판에 글쓰기</span>
      </div>
      <form
        className={styles.write_input}
        action={`https://imitation-project.du.r.appspot.com/board/post/${title}`}
        method="POST"
      >
        <div>
          <label htmlFor="write_form_title">제목</label>
          <input
            type="text"
            placeholder="제목"
            id="write_form_title"
            name="write_form_title"
          />
        </div>
        <div>
          <label htmlFor="write_form_content">내용</label>
          <textarea
            name="write_form_content"
            id="write_form_content"
            cols="30"
            rows="10"
            placeholder="내용을 입력하세요"
          ></textarea>
        </div>
        <div className={styles.submit}>
          <button
            type="submit"
            onClick={() => {
              window.location.reload();
            }}
          >
            게시
          </button>
        </div>
      </form>
    </div>
  );
}

export default Board;
