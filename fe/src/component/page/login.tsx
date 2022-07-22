import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import { ENDPOINT } from '../../config';

const InputBox = styled.input``;

const Button = styled.button``;

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
      <h1>Login</h1>
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
      <Button onClick={Login}>Login</Button>
      <LinkBox to="/create">create user</LinkBox>
    </div>
  );
}

export default Login;
