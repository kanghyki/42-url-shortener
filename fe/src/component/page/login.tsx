import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import { ENDPOINT } from '../../config';

const InputBox = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #000000;
  width: 200px;
  margin: 10px;
  font-size: 20px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  border: none;
  background-color: gray;
  color: white;
  margin: 20px;
  &:hover {
    background-color: #4caf50;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 150px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkBox = styled(Link)``;

function Login() {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');

  const onChangeID = (e: any) => {
    setID(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const url = `${ENDPOINT}/auth/login/`;
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID: id,
      password: password,
    }),
  };
  const Login = () => {
    if (id.length <= 0 || password.length <= 0) {
      alert('Please input text in box');
      return;
    }
    fetch(url, option).then((res) => {
      if (res.ok) {
        res
          .json()
          .then((res) => localStorage.setItem('token', res.access_token));
        alert('Login Success');
        document.location.href = '/';
      } else {
        alert('Login failed');
        document.location.href = '/login';
      }
    });
  };
  return (
    <div>
      <Header />
      <Wrapper>
        <h1>Login</h1>
        <PostWrapper>
          <InputWrapper>
            <InputBox onChange={onChangeID} placeholder="ID" />
            <InputBox
              type="password"
              required
              onChange={onChangePassword}
              placeholder="PASSWORD"
              onKeyDown={(e) => {
                if (e.key === 'Enter') Login();
              }}
            />
          </InputWrapper>
          <Button onClick={Login}>Login</Button>
        </PostWrapper>
        <LinkBox to="/create">create user</LinkBox>
      </Wrapper>
    </div>
  );
}

export default Login;
