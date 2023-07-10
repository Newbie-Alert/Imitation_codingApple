import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  let [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/course")
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
  }, []);
  // HOOK
  let id = useParams();
  return <div></div>;
}

export default Detail;
