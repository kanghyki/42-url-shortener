import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import { ENDPOINT } from '../../config';

const Input = styled.input`
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
    transition: background-color 0.3s;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MiddleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 150px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkBox = styled(Link)``;

interface resBody {
  ok: boolean;
  msg: string;
  access_token: string;
}

const LoginMethod = async (id: string, password: string) => {
  if (id.length <= 0 || password.length <= 0) {
    alert('Please input text in box');
    return;
  }
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

  const res = await fetch(url, option);
  if (!res.ok) {
    alert('Login failed');
    return;
  }
  const json = await res.json();
  const body: resBody = json;
  console.log(body);
  if (!body.ok) {
    alert(body.msg);
    return;
  }
  localStorage.setItem('token', body.access_token);
  console.log(localStorage.getItem('token'));
  document.location.href = '/';
};

function Login() {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const onChangeID = (e: any) => {
    setID(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };
  return (
    <div>
      <Header />
      <Container>
        <h1>Login</h1>
        <MiddleContainer>
          <InputContainer>
            <Input onChange={onChangeID} placeholder="ID" />
            <Input
              type="password"
              required
              onChange={onChangePassword}
              placeholder="PASSWORD"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  LoginMethod(id, password);
                }
              }}
            />
          </InputContainer>
          <Button
            onClick={() => {
              LoginMethod(id, password);
            }}
          >
            Login
          </Button>
        </MiddleContainer>
        <LinkBox to="/create">create user</LinkBox>
      </Container>
    </div>
  );
}

export default Login;
