import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Header() {
  const [isLogin, setIsLogin] = React.useState(false);
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    document.location.href = '/';
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button size="small">Home</Button>
        </Link>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          42 URL Shortener
        </Typography>
        {isLogin ? (
          <Button variant="outlined" size="small" onClick={logout}>
            Sign Out
          </Button>
        ) : (
          <Link href="/signin" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" size="small">
              Sign in
            </Button>
          </Link>
        )}
      </Toolbar>
      {isLogin ? (
        <Toolbar sx={{ justifyContent: 'right', overflowX: 'auto' }}>
          <Link
            color="inherit"
            noWrap
            variant="body2"
            href="/mypage"
            sx={{ p: 1, flexShrink: 0 }}
          >
            My page
          </Link>
        </Toolbar>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}

export default Header;
