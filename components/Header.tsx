import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Logo from "../public/svg/goodreadsKr.svg";

const Container = styled.div`
  width: 100%;
  height: 52px;
  background: #f4f1ea;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);

  .logo {
    text-align: left;
    margin-top: 8px;
    margin-left: 72px;
    cursor: pointer;
  }
  .list {
    font-size: 16px;
    line-height: 23px;
  }
`;

const Header: React.FC = () => {
  return (
    <Container>
      <Link href="/">
        <Logo className="logo" />
      </Link>
      <Link href="/booklist">
        <a className="list">도서목록</a>
      </Link>
      <Link href="/authlist">
        <a className="list">작가목록</a>
      </Link>
      <Link href="/quoteslist">
        <a className="list">명언목록</a>
      </Link>
    </Container>
  );
};

export default Header;
