import { useState } from 'react';
import styled from 'styled-components';
import { ENDPOINT, REDIRECT_ENDPOINT } from '../../config';
import Header from '../header/header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
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
    transition: background-color 0.3s;
  }
`;

const GeneratorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 150px;
`;

const URLContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface resBody {
  ok: boolean;
  msg: string;
  result: any;
}

const falseObject: resBody = {
  ok: false,
  msg: '',
  result: {
    originURL: '',
    shortURL: '',
    called: 0,
  },
};

const CreateURL = async (originURL: string): Promise<resBody> => {
  if (originURL.length <= 0) {
    alert('Please input text in box');
    return falseObject;
  }
  const url = `${ENDPOINT}/url/`;
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      originURL: originURL,
    }),
  };
  const res = await fetch(url, option);
  if (!res.ok) {
    alert('Check Login');
    document.location.href = '/login';
    return falseObject;
  }
  const json = await res.json();
  const body: resBody = json;
  if (!body.ok) {
    alert(body.msg);
    return falseObject;
  }
  alert('Create URL');
  return body;
};

function Main() {
  const [originURL, setOriginURL] = useState('');
  const [body, setBody] = useState({
    ok: false,
    result: {
      originURL: '',
      shortURL: '',
      called: 0,
    },
  });
  const onChangeOriginURL = (e: any) => {
    setOriginURL(e.target.value);
  };

  const MakeCreatedURLContainer = () => {
    return (
      <GeneratorContainer>
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
      </GeneratorContainer>
    );
  };

  return (
    <div>
      <Header />
      <Container>
        <h1>42 URL Shortener</h1>
        <GeneratorContainer>
          <URLContainer>
            <Input
              onChange={onChangeOriginURL}
              placeholder="Shorten your URL"
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  const ret = await CreateURL(originURL);
                  setBody(ret);
                }
              }}
            />
          </URLContainer>
          <Button
            onClick={async () => {
              const ret = await CreateURL(originURL);
              setBody(ret);
            }}
          >
            Shorten
          </Button>
        </GeneratorContainer>
        <div>{body.ok === true ? MakeCreatedURLContainer() : <></>}</div>
      </Container>
    </div>
  );
}

export default Main;
