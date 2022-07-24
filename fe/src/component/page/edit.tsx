import { useState } from 'react';
import styled from 'styled-components';
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

interface resBody {
  ok: boolean;
  msg: string;
  access_token: string;
}

const EditMethod = async (oldPassword: string, newPassword: string) => {
  if (oldPassword.length <= 0 || newPassword.length <= 0) {
    alert('Please input text in box');
    return;
  }
  const url = `${ENDPOINT}/user/`;
  const option = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword,
    }),
  };

  const res = await fetch(url, option);
  if (!res.ok) {
    alert('Authorization failed');
    return;
  }
  const json = await res.json();
  const body: resBody = json;
  if (!body.ok) {
    alert(body.msg);
    return;
  }
  alert(`${body.msg}, Please Re-login`);
  document.location.href = '/login';
};

function Edit() {
  const [old, setOld] = useState('');
  const [password, setPassword] = useState('');
  const onChangeID = (e: any) => {
    setOld(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <Header />
      <Container>
        <h1>Edit Password</h1>
        <MiddleContainer>
          <InputContainer>
            <Input
              onChange={onChangeID}
              type="password"
              placeholder="OLD PASSWORD"
            />
            <Input
              type="password"
              required
              onChange={onChangePassword}
              placeholder="NEW PASSWORD"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  EditMethod(old, password);
                }
              }}
            />
          </InputContainer>
          <Button
            onClick={() => {
              EditMethod(old, password);
            }}
          >
            Confirm
          </Button>
        </MiddleContainer>
      </Container>
    </div>
  );
}

export default Edit;
