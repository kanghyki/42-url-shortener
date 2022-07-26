import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ENDPOINT } from '../../config';
import Alert from '@mui/material/Alert';
import Header from '../header/header';
import Footer from '../footer/footer';

interface resBody {
  ok: boolean;
  msg: string;
  access_token: string;
}

const Login = async (id: any, password: any) => {
  const url = `${ENDPOINT}/auth/login/`;
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: id,
      password: password,
    }),
  };

  const res = await fetch(url, option);
  if (!res.ok) {
    alert('Login failed');
    return;
  }
  const json = await res.json();
  const body: resBody = json;
  if (!body.ok) {
    alert(body.msg);
    return;
  }
  localStorage.setItem('token', body.access_token);
  document.location.href = '/';
};

export default function SignIn() {
  const [error, setError] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    if (username === '' || password === '') {
      setError(true);
      return;
    }
    Login(username, password);
  };

  const regi = `${ENDPOINT}/auth/42register`;

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
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
            Sign in
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
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {error ? (
              <Alert severity="error">Input box is required</Alert>
            ) : (
              <></>
            )}
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href={regi} variant="body2">
                  {"Don't have an account? Sign Up"}
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
