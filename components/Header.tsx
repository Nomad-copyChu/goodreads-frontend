import React, { useState } from "react";
import styled from "styled-components";
import { NextPage } from "next";
import cookie from "js-cookie";
import Link from "next/link";
import Logo from "../public/static/svg/goodreadsKr.svg";
import colors from "../style/colors";
import MenuIcon from "../public/static/svg/menu.svg";
import useUser from "../hooks/useUser";

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

const Header: NextPage = () => {
  const [show, setShow] = useState(false);
  const toggleSidebar = () => {
    setShow(!show);
  };
  const { isLogged } = useUser();
  const loginMaintain = () => {
    // const isLoggedIn = cookie.get("Authorization");
    if (isLogged === false) {
      return (
        <div className="log-info">
          <Link href="/auth/register" prefetch={false}>
            <a>회원가입</a>
          </Link>
          <Link href="/auth/login">
            <a>로그인</a>
          </Link>
        </div>
      );
    }
    return <div className="log-info">hi</div>;
  };
  return (
    <Container>
      <Link href="/">
        <a className="logo">
          <Logo />
        </a>
      </Link>
      <div className="list">
        <Link href="/book" prefetch={false}>
          <a>도서목록</a>
        </Link>
        <Link href="/author" prefetch={false}>
          <a>작가목록</a>
        </Link>
        <Link href="/quote" prefetch={false}>
          <a>명언목록</a>
        </Link>
      </div>
      {loginMaintain()}
      <MenuIcon className="sidebar-icon" onClick={toggleSidebar} />
    </Container>
  );
};

export default Header;
