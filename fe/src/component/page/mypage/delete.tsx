import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ENDPOINT } from '../../../config';
import Header from '../../header/header';
import Footer from '../../footer/footer';

interface resBody {
  ok: boolean;
  msg: string;
  access_token: string;
}

const Delete = async () => {
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

export default function DeleteUser() {
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
            Delete account
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={Delete}
            >
              Delete
            </Button>
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
