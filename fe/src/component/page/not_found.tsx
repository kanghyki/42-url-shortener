import styled from 'styled-components';
import Footer from '../footer/footer';
import Header from '../header/header';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function NotFound() {
  return (
    <div>
      <Header />
      <Container>
        <h1>404 Not found</h1>
      </Container>
      <Footer />
    </div>
  );
}

export default NotFound;
