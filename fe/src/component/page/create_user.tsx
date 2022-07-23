import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ENDPOINT } from '../../config';
import Header from '../header/header';

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
  background-color: #4caf50;
  color: white;
  margin: 20px;
  &:hover {
    background-color: gray;
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

interface resBody {
  ok: boolean;
  msg: string;
}

function CreateUser() {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const onChangeID = (e: any) => {
    setID(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const Create = async () => {
    if (id.length <= 0 || password.length <= 0) {
      alert('Please input text in box');
      return;
    }
    const url = `${ENDPOINT}/user/`;
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
      alert('Create Failed');
      return;
    }
    const json = await res.json();
    const body: resBody = json;
    if (!body.ok) {
      alert(body.msg);
      document.location.href = '/login';
      return;
    }
    alert('Created');
    document.location.href = '/login';
  };

  return (
    <div>
      <Header />
      <Wrapper>
        <h1>Create User</h1>
        <PostWrapper>
          <InputWrapper>
            <InputBox onChange={onChangeID} placeholder="ID" />
            <InputBox
              type="password"
              required
              onChange={onChangePassword}
              placeholder="PASSWORD"
              onKeyDown={(e) => {
                if (e.key === 'Enter') Create();
              }}
            />
          </InputWrapper>
          <Button onClick={Create}>Create</Button>
        </PostWrapper>
        <LinkBox to="/login">Return to login</LinkBox>
      </Wrapper>
    </div>
  );
}

export default CreateUser;
