import {
  Box,
  Button,
  Container,
  createTheme,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ENDPOINT } from '../../../config';
import Footer from '../../footer/footer';
import Header from '../../header/header';
import Url from './url';

const theme = createTheme();

const LineContainer = styled.div`
  display: flex;
  margin: 3px;
  justify-content: space-between;
  width: 100%;
`;

const LineContent = styled.div`
  width: 150px;
  display: flex;
  align-items: left;
  width: 50%;
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
  result: any;
}

const getUser = async () => {
  const url = `${ENDPOINT}/user/`;
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${localStorage.getItem('token')}`,
    },
  };
  const res = await fetch(url, option);
  if (!res.ok) {
    document.location.href = '/login';
    return;
  }
  const json = await res.json();
  const body: resBody = json;
  if (!body.ok) {
    alert(body.msg);
    return;
  }
  return body.result;
};

function Mypage() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    intraID: 0,
    intraUsername: '',
    isActive: false,
    createdAt: '',
    updatedAt: '',
    urls: [
      {
        originURL: '',
        shortURL: '',
        called: 0,
      },
    ],
  });

  useEffect(() => {
    const getU = async () => {
      const user = await getUser();
      setUser(user);
    };
    getU();
  }, []);

  const makeUserInfoContainer = () => {
    return (
      <Typography>
        <LineContainer>
          <LineContent>42-Intra ID</LineContent>
          <LineContent>{user.intraID}</LineContent>
        </LineContainer>
        <LineContainer>
          <LineContent>42-Intra Username</LineContent>
          <LineContent>{user.intraUsername}</LineContent>
        </LineContainer>
        <LineContainer>
          <LineContent>42-Intra Email</LineContent>
          <LineContent>{user.email}</LineContent>
        </LineContainer>
        <LineContainer>
          <LineContent>Username</LineContent>
          <LineContent>{user.username}</LineContent>
        </LineContainer>
        <LineContainer>
          <LineContent>createAt</LineContent>
          <LineContent>{user.createdAt}</LineContent>
        </LineContainer>
        <LineContainer>
          <LineContent>updatedAt</LineContent>
          <LineContent>{user.updatedAt}</LineContent>
        </LineContainer>
      </Typography>
    );
  };

  const makeButtonContainer = () => {
    return (
      <>
        <Links to="/mypage/edit">
          <Button variant="outlined" color="secondary" sx={{ margin: 3 }}>
            Change password
          </Button>
        </Links>
        <Links to="/mypage/delete">
          <Button variant="outlined" color="error" sx={{ margin: 3 }}>
            Delete account
          </Button>
        </Links>
      </>
    );
  };

  const makeURLs = () => {
    return (
      <>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          Shorten URL List
        </Typography>
        {user.urls.map((url, index) => (
          <div key={index}>
            <Url url={url} />
          </div>
        ))}
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container component="main" maxWidth="xs">
        <Box
          component="form"
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ flex: 1 }}
          >
            My page
          </Typography>
          {user.isActive ? (
            <Box
              sx={{
                alignItems: 'center',
              }}
            >
              <Box sx={{ marginTop: 3 }}>{makeUserInfoContainer()}</Box>
              <Box sx={{ display: 'flex' }}>{makeButtonContainer()}</Box>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Container>
      <Container component="main" maxWidth="sm">
        {user.urls.length === 0 ? (
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ flex: 1 }}
          >
            No URL
          </Typography>
        ) : (
          makeURLs()
        )}
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default Mypage;
