import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../header/header';
import Url from './url';

const Button = styled.button`
  font-size: 20px;
  font-weight: bold;
`;

function Mypage() {
  const [data, setData] = useState({
    userID: '',
    isActive: false,
    createdAt: '',
    updatedAt: '',
    urls: [
      {
        originURL: '',
        shortURL: '',
        called: 0,
      },
    ],
  });

  useEffect(() => {
    getMyData();
  }, []);

  function getMyData() {
    const url = 'http://localhost:3001/user/';
    const option = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    };
    fetch(url, option)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return false;
        }
      })
      .then((resJson) => {
        setData(resJson.pop());
      });
  }

  const deleteUser = () => {
    const url = 'http://localhost:3001/user/';
    const option = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    };
    fetch(url, option).then((res) => {
      if (res.ok) {
        alert('Delete Account Thank you');
        localStorage.removeItem('token');
        document.location.href = '/';
      } else {
        return false;
      }
    });
  };

  const printData = () => {
    return (
      <div>
        <div>userID: {data.userID}</div>
        <div>CreateAt: {data.createdAt}</div>
        <div>UpdateAt: {data.updatedAt}</div>
        <h1>URLs</h1>
        <div>---------------------------</div>
        {data.urls.map((url, index) => (
          <div key={index}>
            <Url url={url} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Header />
      <h1>My Page</h1>
      {data.isActive === true ? (
        <div>
          {printData()} <Button onClick={deleteUser}>Delete Account</Button>
        </div>
      ) : (
        <h1>[ Need Login ]</h1>
      )}
    </div>
  );
}

export default Mypage;
