import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './component/page/main';
import Login from './component/page/login';
import Mypage from './component/page/my_page';
import NotFound from './component/page/not_found';
import Register from './component/page/register';
import Wrong from './component/page/wrong';
import GlobalStyle from './global/global_style';
import Edit from './component/page/edit';
import Delete from './component/page/delete';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router basename={process.env.REACT_APP_BASE_NAME}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/wrong" element={<Wrong />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
