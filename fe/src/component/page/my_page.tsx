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
  width: 100%;
  margin: 50px;
  padding: 30px;
  border-radius: 0px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface resBody {
  ok: boolean;
  msg: string;
  result: any;
}

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

  const getMyData = async () => {
    const url = `${ENDPOINT}/user/`;
    const option = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    };
    const res = await fetch(url, option);
    if (!res.ok) {
      document.location.href = '/login';
      return;
    }
    const json = await res.json();
    const body: resBody = json;
    if (!body.ok) {
      alert(body.msg);
      return;
    }
    setData(body.result.pop());
  };

  const deleteUser = async () => {
    const url = `${ENDPOINT}/user/`;
    const option = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    };
    const res = await fetch(url, option);
    if (!res.ok) {
      alert('Something went wrong. Logout');
      localStorage.removeItem('token');
      document.location.href = '/';
      return;
    }
    const json = await res.json();
    const body: resBody = json;
    if (!body.ok) {
      alert(body.msg);
      localStorage.removeItem('token');
      document.location.href = '/';
      return;
    }
    alert('Delete Account');
    localStorage.removeItem('token');
    document.location.href = '/';
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
