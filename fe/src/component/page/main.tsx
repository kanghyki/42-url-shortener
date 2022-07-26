import {
  Alert,
  Box,
  Button,
  Container,
  createTheme,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { useState } from 'react';
import { ENDPOINT, REDIRECT_ENDPOINT } from '../../config';
import Footer from '../footer/footer';
import Header from '../header/header';

const theme = createTheme();

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

const CreateURL = async (originURL: any): Promise<resBody> => {
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
    document.location.href = '/signin';
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
  const [error, setError] = useState(false);
  const [body, setBody] = useState({
    ok: false,
    result: {
      originURL: '',
      shortURL: '',
      called: 0,
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const url = data.get('url');
    if (url === '') {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }
    const body = await CreateURL(url);
    setBody(body);
  };

  const GeneratedURL = () => {
    const value = `${REDIRECT_ENDPOINT}/${body.result.shortURL}`;
    return (
      <Box
        component="form"
        noValidate
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          margin="normal"
          fullWidth
          label="Generated URL"
          defaultValue={value}
          InputProps={{
            readOnly: true,
          }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={(e) => {
            navigator.clipboard.writeText(
              `${REDIRECT_ENDPOINT}/${body.result.shortURL}`,
            );
          }}
        >
          Copy
        </Button>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container component="main" maxWidth="xs">
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextField
            id="url"
            name="url"
            label="URL"
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="outlined" fullWidth>
            Create
          </Button>
        </Box>
        {error ? <Alert severity="error">Input box is required</Alert> : <></>}
        <div>{body.ok === true ? GeneratedURL() : <></>}</div>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default Main;
