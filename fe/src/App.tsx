import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './component/page/main';
import Login from './component/page/login';
import Mypage from './component/page/my_page';
import NotFound from './component/page/not_found';
import CreateUser from './component/page/create_user';
import Wrong from './component/page/wrong';
import GlobalStyle from './global/global_style';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router basename={process.env.REACT_APP_BASE_NAME}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/wrong" element={<Wrong />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
