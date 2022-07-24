import { useState } from 'react';
import styled from 'styled-components';
import { ENDPOINT } from '../../config';
import Header from '../header/header';
import qs from 'qs';
import { Link } from 'react-router-dom';

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

const ButtonContainer = styled.div`
  display: flex;
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
    transition: background-color 0.3s;
  }
`;

const TermsYesButton = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: inherit;
  color: black;
  font-size: 20px;
  &:hover {
    color: #4caf50;
    transition: color 0.5s;
  }
  margin: 50px 30px 0px 30px;
`;

const TermsNoButton = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: inherit;
  color: black;
  font-size: 20px;
  &:hover {
    color: #f05650;
    transition: color 0.5s;
  }
  margin: 50px 30px 0px 30px;
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
}

const Create = async (id: string, password: string) => {
  const { code } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  if (id.length <= 0 || password.length <= 0) {
    alert('Please input text in box');
    return;
  }
  const url = `${ENDPOINT}/user/?code=${code}`;
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
    document.location.href = '/register';
    return;
  }
  alert('Created User');
  document.location.href = '/login';
};

function Register() {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const onChangeID = (e: any) => {
    setID(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const Terms = () => {
    return (
      <>
        <div>
          42API를 활용하여 42에서 제공하는 사용자의 id, username, email을(를)
          수집하는 것에 대해 동의하십니까?
        </div>
        <ButtonContainer>
          <TermsYesButton onClick={() => setTerms(true)}>Yes</TermsYesButton>
          <Links to="/login">
            <TermsNoButton>No</TermsNoButton>
          </Links>
        </ButtonContainer>
      </>
    );
  };

  return (
    <div>
      <Header />
      <Container>
        <h1>42 Register</h1>
        {terms ? (
          <MiddleContainer>
            <InputContainer>
              <Input onChange={onChangeID} type="id" placeholder="ID" />
              <Input
                type="password"
                required
                onChange={onChangePassword}
                placeholder="PASSWORD"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') Create(id, password);
                }}
              />
            </InputContainer>
            <Button onClick={() => Create(id, password)}>Confirm</Button>
          </MiddleContainer>
        ) : (
          Terms()
        )}
      </Container>
    </div>
  );
}

export default Register;
