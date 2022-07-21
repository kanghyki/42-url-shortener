
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Container = styled.div`
	display: flex;
	align-items: center;
	padding: 16px 50px 16px 50px;
	margin-bottom: 30px;
	background-color: #1c2033;
`;

const LeftContainer = styled.div`
	flex: 1;
	display: flex;
	justify-content: left;
`;

const RightContainer = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
`;

const Blank = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
`;

const Links = styled(Link)`
	display: flex;
	cursor: pointer;
	align-items: center;
	justify-content: space-between;
	text-decoration: none;
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
	}
`;

const Title = styled.div`
	font-size: 25px;
	font-weight: bold;
	color: #ffffff;
`;

const SubTitle = styled.div`
	font-size: 20px;
	font-weight: bold;
	color: #ffffff;
`;

const Button = styled.button`
	font-size: 20px;
	font-weight: bold;
`

function Header() {
  const [hasToken, setToken] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null) {
      setToken(false);
    } else {
      setToken(true);
    }
  }, []);
  const deleteToken = () => {
    localStorage.removeItem('token');
    document.location.href = '/';
  };
  return (
    <Container>
      <LeftContainer>
        <Links to="/">
          <Title>42 URL shortener</Title>
        </Links>
      </LeftContainer>
      <Blank />
      <RightContainer>
		<SubTitle/>
		<SubTitle/>
		<SubTitle/>
        <Links to="/mypage">
          <SubTitle>My page</SubTitle>
        </Links>
        {hasToken === false ? (
          <Links to="/login">
            <SubTitle>Login</SubTitle>
          </Links>
        ) : (
          <Button onClick={deleteToken}>Logout</Button>
        )}
      </RightContainer>
    </Container>
  );
}

export default Header;
