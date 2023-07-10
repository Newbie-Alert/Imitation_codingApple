// COMPOSITION
import NavComp from './Comp/Nav/NavComp';


// PAGES
import Home from './Pages/Home/Home';
import Course from './Pages/Course/Course';

// HOOK
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Detail from './Pages/Detail/Detail';


function App() {
  return (
    <div className="App">
      <NavComp />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course' element={<Course />} />
        <Route path='detail/:id' element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
