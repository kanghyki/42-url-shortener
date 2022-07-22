import { useState } from 'react';
import styled from 'styled-components';
import { ENDPOINT } from '../../config';

const InputBox = styled.input``;

const Button = styled.button``;

const SmallButton = styled.button`
  font-weight: bold;
`;

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

  const updateURL = () => {
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
    fetch(url, option).then((res) => {
      if (res.ok) {
        res.json().then((resJson) => {
          if (resJson.ok === true) {
            alert(`Update URL ${newURL}`);
            document.location.href = '/mypage';
          } else {
            alert(resJson.msg);
          }
        });
      } else {
        alert('Please Check Login');
      }
    });
  };

  const deleteURL = (deleteURL: string) => {
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
    fetch(url, option).then((res) => {
      if (res.ok) {
        res.json().then((resJson) => {
          if (resJson.ok === true) {
            alert(`Delete URL ${deleteURL}`);
            document.location.href = '/mypage';
          } else {
            alert(resJson.msg);
          }
        });
      } else {
        alert('Please Check Login');
      }
    });
  };

  return (
    <div>
      <div>originURL: {props.url.originURL}</div>
      {editMode ? (
        <div>
          <InputBox
            onChange={onChangeURL}
            placeholder={newURL}
            onKeyDown={(e) => {
              if (e.key === 'Enter') updateURL();
            }}
          />
          <Button onClick={updateURL}>submit</Button>
        </div>
      ) : (
        <div>shortURL: http://localhost:3002/{props.url.shortURL}</div>
      )}
      <div>Called: {props.url.called}</div>
      <SmallButton onClick={changeEditClick}>Edit</SmallButton>
      <SmallButton onClick={() => deleteURL(props.url.shortURL)}>
        Delete
      </SmallButton>
      <SmallButton
        onClick={() => {
          navigator.clipboard.writeText(`localhost:3002/${props.url.shortURL}`);
        }}
      >
        Copy
      </SmallButton>
      <div>---------------------------</div>
    </div>
  );
}

export default Url;
