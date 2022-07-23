import { useState } from 'react';
import styled from 'styled-components';
import { ENDPOINT, REDIRECT_ENDPOINT } from '../../config';
import Header from '../header/header';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBox = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #000000;
  width: 500px;
  margin: 10px;
  font-size: 30px;
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

const PostWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 150px;
`;

const URLWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface resBody {
  ok: boolean;
  msg: string;
  result: any;
}

function Main() {
  const [origin, setOrigin] = useState('');
  const [body, setBody] = useState({
    ok: false,
    result: {
      originURL: '',
      shortURL: '',
      called: 0,
    },
  });
  const onChangeOrigin = (e: any) => {
    setOrigin(e.target.value);
  };

  const CreateURL = async () => {
    if (origin.length <= 0) {
      alert('Please input text in box');
      return;
    }
    const url = `${ENDPOINT}/url/`;
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        originURL: origin,
      }),
    };
    const res = await fetch(url, option);
    if (!res.ok) {
      alert('Check Login');
      document.location.href = '/login';
      return;
    }
    const json = await res.json();
    const body: resBody = json;
    if (!body.ok) {
      alert(body.msg);
      return;
    }
    alert('Create URL');
    setBody(body);
  };

  const isBodyOK = () => {
    return (
      <PostWrapper>
        <div>
          Generated: {REDIRECT_ENDPOINT}/{body.result.shortURL}
        </div>
        <Button
          onClick={(e) => {
            navigator.clipboard.writeText(
              `${REDIRECT_ENDPOINT}/${body.result.shortURL}`,
            );
          }}
        >
          Copy
        </Button>
      </PostWrapper>
    );
  };

  return (
    <div>
      <Header />
      <Wrapper>
        <h1>42 URL Shortener</h1>
        <PostWrapper>
          <URLWrapper>
            <InputBox
              onChange={onChangeOrigin}
              placeholder="Shorten your URL"
              onKeyDown={(e) => {
                if (e.key === 'Enter') CreateURL();
              }}
            />
          </URLWrapper>
          <Button onClick={CreateURL}>Shorten</Button>
        </PostWrapper>
        <div>{body.ok === true ? isBodyOK() : <></>}</div>
      </Wrapper>
    </div>
  );
}

export default Main;
