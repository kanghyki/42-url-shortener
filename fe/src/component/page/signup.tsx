import { useState } from 'react';
import qs from 'qs';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { ENDPOINT } from '../../config';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Header from '../header/header';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Footer from '../footer/footer';

interface resBody {
  ok: boolean;
  msg: string;
}

const Create = async (id: any, password: any) => {
  const { code } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  const url = `${ENDPOINT}/user/?code=${code}`;
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
    alert('Create Failed');
    return;
  }
  const json = await res.json();
  const body: resBody = json;
  if (!body.ok) {
    alert(body.msg);
    document.location.href = '/signin';
    return;
  }
  alert('Created User');
  document.location.href = '/signin';
};

export default function SignUp() {
  const [error, setError] = useState(false);
  const [check, setCheck] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    if (username === '' || password === '') {
      setCheckError(false);
      setError(true);
      return;
    }
    if (check === false) {
      setError(false);
      setCheckError(true);
      return;
    }
    Create(username, password);
  };

  return (
    <>
      <Header />
      <Box sx={{ margin: 5 }}>
        <Stepper activeStep={1} alternativeLabel>
          <Step key={1}>
            <StepLabel>Authentication with 42</StepLabel>
          </Step>
          <Step key={2}>
            <StepLabel>Sign Up</StepLabel>
          </Step>
          <Step key={3}>
            <StepLabel>Done</StepLabel>
          </Step>
        </Stepper>
      </Box>
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="allow42"
                    color="primary"
                    checked={check}
                    onClick={() => setCheck(!check)}
                  />
                }
                label="I agree to collect id, username, and email from 42 using 42 API"
              />
            </Grid>
            {error ? (
              <Alert severity="error">Input box is required</Alert>
            ) : (
              <></>
            )}
            {checkError ? (
              <Alert severity="error">Please accept the terms</Alert>
            ) : (
              <></>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
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
