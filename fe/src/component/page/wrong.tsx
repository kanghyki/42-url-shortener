import styled from 'styled-components';
import Footer from '../footer/footer';
import Header from '../header/header';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function Wrong() {
  return (
    <div>
      <Header />
      <Container>
        <h1>Something went wrong</h1>
      </Container>
      <Footer />
    </div>
  );
}

export default Wrong;
