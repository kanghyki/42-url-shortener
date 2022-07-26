import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ENDPOINT } from '../../../config';
import Alert from '@mui/material/Alert';
import Header from '../../header/header';
import Footer from '../../footer/footer';

interface resBody {
  ok: boolean;
  msg: string;
  access_token: string;
}

const Edit = async (oldPassword: any, newPassword: any) => {
  if (oldPassword.length <= 0 || newPassword.length <= 0) {
    alert('Please input text in box');
    return;
  }
  const url = `${ENDPOINT}/user/`;
  const option = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword,
    }),
  };

  const res = await fetch(url, option);
  if (!res.ok) {
    alert('Authorization failed');
    return;
  }
  const json = await res.json();
  const body: resBody = json;
  if (!body.ok) {
    alert(body.msg);
    return;
  }
  alert(`${body.msg}, Please Re-login`);
  document.location.href = '/signin';
};

export default function EditUser() {
  const [error, setError] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get('password');
    const newPassword = data.get('newPassword');
    if (password === '' || newPassword === '') {
      setError(true);
      return;
    }
    Edit(password, newPassword);
  };

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            Edit user
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="password"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit
            </Button>
            {error ? (
              <Alert severity="error">Input box is required</Alert>
            ) : (
              <></>
            )}
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/mypage" variant="body2">
                  {'Return to My page'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
