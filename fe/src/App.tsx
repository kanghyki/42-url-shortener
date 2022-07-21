import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './component/page/main';
import Login from './component/page/login';
import Mypage from './component/page/mypage';
import NotFound from './component/page/notFound';
import CreateUser from './component/page/createUesr';

function App() {
  return (
    <div>
      <Router basename={process.env.REACT_APP_BASE_NAME}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create" element={<CreateUser/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
