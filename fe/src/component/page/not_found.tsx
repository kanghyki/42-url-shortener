import { Typography } from '@mui/material';
import Footer from '../footer/footer';
import Header from '../header/header';

function NotFound() {
  return (
    <div>
      <Header />
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        sx={{ flex: 1 }}
      >
        <h1>404 Not found</h1>
      </Typography>
      <Footer />
    </div>
  );
}

export default NotFound;
