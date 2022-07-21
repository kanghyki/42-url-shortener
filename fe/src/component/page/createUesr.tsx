import { useState } from 'react';
import styled from 'styled-components';
import Header from '../header/header';

const InputBox = styled.input``;

const Button = styled.button``;

function CreateUser() {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');

  const onChangeID = (e: any) => {
    setID(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const url = 'http://localhost:3001/user/';
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
  const Create = () => {
    if (id.length <= 0 || password.length <= 0) {
      alert('Please input text in box');
      return;
    }
    fetch(url, option).then((res) => {
      if (res.ok) {
        alert('Created Enjoy!');
        document.location.href = '/';
      } else {
        alert('Create Failed');
        document.location.href = '/login';
      }
    });
  };

  return (
    <div>
      <Header />
	  <h1>Create User</h1>
      <InputBox onChange={onChangeID} placeholder="ID" />
	  <InputBox type='password' required onChange={onChangePassword} placeholder="PASSWORD" onKeyDown={(e)=> {if (e.key === 'Enter')Create()}}/>
      <Button onClick={Create}>Create</Button>
    </div>
  );
}

export default CreateUser;
