import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ENDPOINT } from '../../config';
import Header from '../header/header';
import Url from './url';

const Button = styled.button`
  border-radius: 5px;
  border: none;
  background-color: gray;
  color: white;
  margin: 20px;
  font-size: 30px;
  &:hover {
    background-color: #4caf50;
  }
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: pink;
  width: 1000px;
  margin: 50px;
  padding: 30px;
  border-radius: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    const url = `${ENDPOINT}/user/`;
    const option = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    };
    console.log(url);
    fetch(url, option)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          document.location.href = '/login';
        }
      })
      .then((resJson) => {
        setData(resJson.pop());
      });
  }

  const deleteUser = () => {
    const url = `${ENDPOINT}/user/`;
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
        alert('Something went wrong please re-login');
        localStorage.removeItem('token');
        document.location.href = '/';
      }
    });
  };

  const printData = () => {
    return (
      <UserContainer>
        <div>userID: {data.userID}</div>
        <div>CreateAt: {data.createdAt}</div>
        <div>UpdateAt: {data.updatedAt}</div>
        <h1>URLs</h1>
        {data.urls.map((url, index) => (
          <div key={index}>
            <Url url={url} />
          </div>
        ))}
      </UserContainer>
    );
  };

  return (
    <div>
      <Header />
      <Wrapper>
        <h1>My Page</h1>
        {data.isActive ? (
          <>
            {printData()} <Button onClick={deleteUser}>Delete Account</Button>
          </>
        ) : (
          <></>
        )}
      </Wrapper>
    </div>
  );
}

export default Mypage;
