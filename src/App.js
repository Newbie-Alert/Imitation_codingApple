// COMPOSITION
import NavComp from './Comp/Nav/NavComp';


// PAGES
import Home from './Pages/Home/Home';
import Course from './Pages/Course/Course';
import Detail from './Pages/Detail/Detail';
import Board from './Pages/Board/Board';
import BoardContent from './Pages/BoardContent/BoardContent';
import Cart from './Pages/Cart/Cart';

// HOOK
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';



function App() {
  // NAV
  let [sign, setSign] = useState(false);
  let [cartItem, setCart] = useState(null);
  useEffect(() => {
    // mount 시 login 상태 받아옴, 상태에 따라 UI에 로그인이 표기되거나 user 아이콘이 표기
    axios
      .get("https://imitation-project.du.r.appspot.com/islogin/confirm")
      .then((result) => {
        if (result.data.activate > 0) {
          setSign((sign = true));
        }

        axios
          .get("https://imitation-project.du.r.appspot.com/length/cart")
          .then((result) => {
            setCart((cartItem = result.data));
          });
        return;
      });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<NavComp sign={sign} setSign={setSign} cartItem={cartItem} setCart={setCart} />}>
          <Route path='/' element={<Home />} />
          <Route path='/course' element={<Course />} />
          <Route path='detail/:id' element={<Detail />} />
          <Route path='board/:id1/:id2' element={<Board />} />
          <Route path='/board/content/:id1/:id2' element={<BoardContent />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
