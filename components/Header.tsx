import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Logo from "../public/svg/goodreadsKr.svg";
import colors from "../style/colors";

const Container = styled.div`
  width: 100%;
  height: 52px;
  background: ${colors.beige_400};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
  align-items: center;
  display: flex;

  .logo {
    margin-left: 72px;
  }
  .font {
    text-decoration: none;
    font-size: 16px;
    color: ${colors.blue_green};
    margin-right: 24px;
  }
`;
const List = styled.div`
  margin-left: 75px;
`;
const LogInfo = styled.div`
  margin-left: auto;
  margin-right: 33px;
`;

const Header: React.FC = () => {
  return (
    <Container>
      <Link href="/">
        <Logo className="logo" />
      </Link>
      <List>
        <Link href="/booklist">
          <a className="font">도서목록</a>
        </Link>
        <Link href="/authlist">
          <a className="font">작가목록</a>
        </Link>
        <Link href="/quoteslist">
          <a className="font">명언목록</a>
        </Link>
      </List>
      <LogInfo>
        <Link href="/register">
          <a className="font">회원가입</a>
        </Link>
        <Link href="/login">
          <a className="font">로그인</a>
        </Link>
      </LogInfo>
    </Container>
  );
};

export default Header;
