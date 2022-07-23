import { useState } from 'react';
import styled from 'styled-components';
import { ENDPOINT, REDIRECT_ENDPOINT } from '../../config';

const InputBox = styled.input`
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
  width: 100px;
  height: 50px;
  border-radius: 5px;
  border: none;
  background-color: #4caf50;
  color: white;
  margin: 10px;
  &:hover {
    background-color: gray;
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
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 700px;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const URLWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  word-break: break-all;
`;

const URL = styled.div`
  margin: 2px;
`;

const UpdateBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModifyInput = styled.div``;

interface resBody {
  ok: boolean;
  msg: string;
  result: any;
}

interface Props {
  url: { originURL: string; shortURL: string; called: number };
}

function Url(props: Props) {
  const [newURL, setNewURL] = useState(props.url.shortURL);
  const [editMode, setEditMode] = useState(false);
  const changeEditClick = () => {
    setEditMode(!editMode);
  };
  const onChangeURL = (e: any) => {
    setNewURL(e.target.value);
  };

  const updateURL = async () => {
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

  function updateBox() {
    return (
      <UpdateBox>
        <URLWrapper>
          <ModifyInput>
            {REDIRECT_ENDPOINT}/
            <InputBox
              onChange={onChangeURL}
              placeholder={newURL}
              onKeyDown={(e) => {
                if (e.key === 'Enter') updateURL();
              }}
            />
          </ModifyInput>
        </URLWrapper>
        <Button onClick={updateURL}>Update</Button>
      </UpdateBox>
    );
  }

  return (
    <Wrapper>
      <URLWrapper>
        <URL>Called: {props.url.called}</URL>
        <URL>Redirect to - {props.url.originURL}</URL>
        <URL>
          ShortURL - {REDIRECT_ENDPOINT}/{props.url.shortURL}
        </URL>
        {editMode ? updateBox() : <></>}
      </URLWrapper>
      <ButtonWrapper>
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
      </ButtonWrapper>
    </Wrapper>
  );
}

export default Url;
