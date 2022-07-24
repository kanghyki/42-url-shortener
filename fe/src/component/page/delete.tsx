import styled from 'styled-components';
import Header from '../header/header';
import { ENDPOINT } from '../../config';
import { Link } from 'react-router-dom';

const ButtonForDelete = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  border: none;
  background-color: gray;
  color: white;
  margin: 20px;
  &:hover {
    background-color: #f05650;
    transition: background-color 0.3s;
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
  access_token: string;
}

const deleteUser = async () => {
  const url = `${ENDPOINT}/user/`;
  const option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${localStorage.getItem('token')}`,
    },
  };
  const res = await fetch(url, option);
  if (!res.ok) {
    alert('Something went wrong. Logout');
    localStorage.removeItem('token');
    document.location.href = '/';
    return;
  }
  const json = await res.json();
  const body: resBody = json;
  if (!body.ok) {
    alert(body.msg);
    localStorage.removeItem('token');
    document.location.href = '/';
    return;
  }
  alert('Delete Account');
  localStorage.removeItem('token');
  document.location.href = '/';
};

function Delete() {
  return (
    <div>
      <Header />
      <Container>
        <h1>Delete Account</h1>
        <MiddleContainer>
          <ButtonForDelete
            onClick={() => {
              deleteUser();
            }}
          >
            Are you sure?
          </ButtonForDelete>
          <Links to="/mypage">
            <Button>No</Button>
          </Links>
        </MiddleContainer>
      </Container>
    </div>
  );
}

export default Delete;
