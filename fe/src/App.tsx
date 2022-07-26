import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './component/page/main';
import Mypage from './component/page/mypage/my_page';
import NotFound from './component/page/not_found';
import Wrong from './component/page/wrong';
import SignIn from './component/page/signin';
import SignUp from './component/page/signup';
import EditUser from './component/page/mypage/edit';
import DeleteUser from './component/page/mypage/delete';

function App() {
  return (
    <>
      <Router basename={process.env.REACT_APP_BASE_NAME}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/edit" element={<EditUser />} />
          <Route path="/mypage/delete" element={<DeleteUser />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/wrong" element={<Wrong />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
