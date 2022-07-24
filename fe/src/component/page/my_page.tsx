import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ENDPOINT } from '../../config';
import Header from '../header/header';
import Url from './url';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  border-radius: 5px;
  border: none;
  background-color: gray;
  color: white;
  margin: 20px;
  padding: 10px 15px;
  font-size: 15px;
  &:hover {
    background-color: #4caf50;
    transition: background-color 0.3s;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
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

const LineContainer = styled.div`
  display: flex;
  margin: 3px;
  justify-content: space-between;
  width: 100%;
`;

const LineContent = styled.div`
  width: 150px;
  display: flex;
  align-items: left;
  width: 50%;
`;

const InfoContrainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
`;

const Links = styled(Link)`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

interface resBody {
  ok: boolean;
  msg: string;
  result: any;
}

const getUser = async () => {
  const url = `${ENDPOINT}/user/`;
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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
  return body.result.pop();
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

function Mypage() {
  const [user, setUser] = useState({
    userID: '',
    email: '',
    intraID: '',
    intraUniqueID: 0,
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
    const getU = async () => {
      const user = await getUser();
      setUser(user);
    };
    getU();
  }, []);

  const makeUserContainer = () => {
    return (
      <>
        <UserContainer>
          <InfoContrainer>
            <LineContainer>
              <LineContent>42-Intra ID</LineContent>
              <LineContent>{user.intraUniqueID}</LineContent>
            </LineContainer>
            <LineContainer>
              <LineContent>42-Intra Username</LineContent>
              <LineContent>{user.intraID}</LineContent>
            </LineContainer>
            <LineContainer>
              <LineContent>42-Intra Email</LineContent>
              <LineContent>{user.email}</LineContent>
            </LineContainer>
            <LineContainer>
              <LineContent>Username</LineContent>
              <LineContent>{user.userID}</LineContent>
            </LineContainer>
            <LineContainer>
              <LineContent>createAt</LineContent>
              <LineContent>{user.createdAt}</LineContent>
            </LineContainer>
            <LineContainer>
              <LineContent>updatedAt</LineContent>
              <LineContent>{user.updatedAt}</LineContent>
            </LineContainer>
          </InfoContrainer>
          <ButtonContainer>
            <Links to="/edit">
              <Button>Change Password</Button>
            </Links>
            <Button onClick={deleteUser}>Delete Account</Button>
          </ButtonContainer>
          {user.urls.length === 0 ? (
            <h1>No URL</h1>
          ) : (
            <>
              <h1>Shorten URL List</h1>
              {user.urls.map((url, index) => (
                <div key={index}>
                  <Url url={url} />
                </div>
              ))}
            </>
          )}
        </UserContainer>
      </>
    );
  };

  return (
    <div>
      <Header />
      <Container>
        <h1>My Page</h1>
        {user.isActive ? <>{makeUserContainer()}</> : <></>}
      </Container>
    </div>
  );
}

export default Mypage;
