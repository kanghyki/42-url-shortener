import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      42us {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          42 URL Shortener
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}
