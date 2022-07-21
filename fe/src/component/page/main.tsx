import { useState } from 'react';
import styled from 'styled-components';
import Header from '../header/header';

const InputBox = styled.input``;

const Button = styled.button``;

function Main() {
	const [ ret, setRet] = useState({
		ok: false,
		result: {
			originURL: '',
			shortURL: '',
			called: 0,
		}
	})
  const [origin, setOrigin] = useState('');
  const [custom, setCustom] = useState('');

  const onChangeOrigin= (e: any) => {
    setOrigin(e.target.value);
  };
  const onChangeCustom= (e: any) => {
    setCustom(e.target.value);
  };

  const url = 'http://localhost:3001/url';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
	  Authorization: `bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      originURL: origin,
	  shortURL: custom,
    }),
  };
  const CreateURL = () => {
		if (origin.length <= 0) {
			alert('Please input text in box');
			return;
		}
		fetch(url, option).then((res) => {
			if (res.ok) {
				res.json().then((res) => {
          console.log(res)
					if (res.ok === true) {
						alert('Create URL');
						setRet(res);
					} else {
						alert('Wrong URL');
					}
				});
			} else {
				alert('Please Login');
				document.location.href = '/login';
			}
		});
  };

  return (
    <div>
      <Header />
      <h1>Create URL</h1>
      <InputBox onChange={onChangeOrigin} placeholder="Origin URL" />
      <InputBox onChange={onChangeCustom} placeholder="Custom URL(nullable)" onKeyDown={(e)=> {if (e.key === 'Enter')CreateURL()}}/>
      <Button onClick={CreateURL}>Create URL</Button>
	  <div>{ret.ok === true ? <div>Generate: localhost:3002/{ret.result.shortURL}</div>:<div/>}</div>
    </div>
  );
}

export default Main;
