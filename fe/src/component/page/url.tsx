import { useState } from 'react';
import styled from 'styled-components';
import { ENDPOINT, REDIRECT_ENDPOINT } from '../../config';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #000000;
  width: 100px;
  font-size: 15px;
  &:focus {
    outline: none;
  }
  color: #4caf50;
`;

const Button = styled.button`
  width: 60px;
  height: 30px;
  border-radius: 5px;
  border: none;
  background-color: #4caf50;
  color: white;
  margin: 10px;
  &:hover {
    background-color: gray;
    transition: background-color 0.3s;
  }
`;

const SmallButton = styled.button`
  border-radius: 5px;
  border: none;
  background-color: #4caf50;
  color: white;
  margin: 3px;
  &:hover {
    background-color: gray;
    transition: background-color 0.3s;
  }
`;

const URLContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 650px;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const URLInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  word-break: break-all;
`;

const URL = styled.div`
  margin: 2px;
`;

const EditContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const URLModifyInput = styled.div``;

interface resBody {
  ok: boolean;
  msg: string;
  result: any;
}

interface Props {
  url: { originURL: string; shortURL: string; called: number };
}

const updateURL = async (newURL: string, props: Props) => {
  if (newURL.length <= 0) {
    alert('Please input text in box');
    return;
  }
  const url = `${ENDPOINT}/url/`;
  const option = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      shortURL: props.url.shortURL,
      newURL: newURL,
    }),
  };
  const res = await fetch(url, option);
  if (!res.ok) {
    alert('Check Login');
    return;
  }
  const json = await res.json();
  const body: resBody = json;
  if (!body.ok) {
    alert(body.msg);
    return;
  }
  alert(`Update URL ${newURL}`);
  window.location.reload();
};

const deleteURL = async (deleteURL: string) => {
  const url = `${ENDPOINT}/url/`;
  const option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      shortURL: `${deleteURL}`,
    }),
  };
  const res = await fetch(url, option);
  if (!res.ok) {
    alert('Check Login');
    return;
  }
  const json = await res.json();
  const body: resBody = json;
  if (!body.ok) {
    alert(body.msg);
    return;
  }
  alert(`Delete URL ${deleteURL}`);
  window.location.reload();
};

function Url(props: Props) {
  const [newURL, setNewURL] = useState(props.url.shortURL);
  const [editMode, setEditMode] = useState(false);
  const changeEditClick = () => {
    setEditMode(!editMode);
  };
  const onChangeURL = (e: any) => {
    setNewURL(e.target.value);
  };

  function edit() {
    return (
      <EditContainer>
        <URLModifyInput>
          {REDIRECT_ENDPOINT}/
          <Input
            onChange={onChangeURL}
            placeholder={newURL}
            onKeyDown={(e) => {
              if (e.key === 'Enter') updateURL(newURL, props);
            }}
          />
        </URLModifyInput>
        <Button onClick={() => updateURL(newURL, props)}>Confirm</Button>
      </EditContainer>
    );
  }

  return (
    <Container>
      <URLContainer>
        <URLInfoContainer>
          <URL>OriginURL: {props.url.originURL}</URL>
          <URL>
            ShortURL: {REDIRECT_ENDPOINT}/{props.url.shortURL}
          </URL>
          <URL>Called: {props.url.called}</URL>
        </URLInfoContainer>
        <ButtonContainer>
          <SmallButton onClick={changeEditClick}>Edit</SmallButton>
          <SmallButton onClick={() => deleteURL(props.url.shortURL)}>
            Delete
          </SmallButton>
          <SmallButton
            onClick={() => {
              navigator.clipboard.writeText(
                `${REDIRECT_ENDPOINT}/${props.url.shortURL}`,
              );
            }}
          >
            Copy
          </SmallButton>
        </ButtonContainer>
      </URLContainer>
      {editMode ? edit() : <></>}
    </Container>
  );
}

export default Url;
