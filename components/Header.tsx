import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Logo from "../public/static/svg/goodreadsKr.svg";
import colors from "../style/colors";
import Sidebar from "./Sidebar";
import MenuIcon from "../public/static/svg/menu.svg";

const Container = styled.div`
  width: 100%;
  height: 52px;
  background: ${colors.beige_400};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
  align-items: center;
  display: flex;

  .logo {
    cursor: pointer;
    margin-left: 72px;
    @media (max-width: 600px) {
      margin-left: 20px;
    }
  }
  a {
    text-decoration: none;
    font-size: 16px;
    color: ${colors.blue_green};
    margin-right: 24px;
    :last-child {
      margin: 0;
    }
  }
  .sidebar-icon {
    position: absolute;
    right: 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    fill: ${colors.black};
    @media (min-width: 700px) {
      display: none;
    }
  }
  .list {
    margin-left: 75px;
    @media (max-width: 700px) {
      display: none;
    }
  }
  .log-info {
    margin-left: auto;
    margin-right: 33px;
    display: flex;
    align-items: center;
    a {
      :last-child {
        margin: 0;
      }
    }
    @media (max-width: 700px) {
      display: none;
    }
  }
`;

const Header: React.FC = () => {
  const [show, setShow] = useState(false);
  const toggleSidebar = () => {
    setShow(!show);
  };
  return (
    <Container>
      <Sidebar show={show} />
      <Link href="/">
        <a>
          <Logo className="logo" />
        </a>
      </Link>
      <div className="list">
        <Link href="/bookList">
          <a>도서목록</a>
        </Link>
        <Link href="/authorList">
          <a>작가목록</a>
        </Link>
        <Link href="/quoteList">
          <a>명언목록</a>
        </Link>
      </div>
      <div className="log-info">
        <Link href="/auth/register">
          <a>회원가입</a>
        </Link>
        <Link href="/auth/login">
          <a>로그인</a>
        </Link>
      </div>
      <MenuIcon className="sidebar-icon" onClick={toggleSidebar} />
    </Container>
  );
};

export default Header;
