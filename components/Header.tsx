import React, { useState } from "react";
import styled from "styled-components";
import { NextPage } from "next";
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
    @media (min-width: 801px) {
      display: none;
    }
  }
  .header-list {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-left: 75px;
    @media (max-width: 800px) {
      display: none;
    }
  }
  .log-info {
    margin-left: auto;
    display: flex;
    align-items: center;
    margin-right: 20px;

    @media (max-width: 800px) {
      display: none;
    }
  }
  .header-myProfile-Photo {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid ${colors.gray_300};
  }
  .login-info {
    margin-left: auto;
    display: flex;
    align-items: center;
    margin-right: 20px;
    @media (max-width: 800px) {
      display: none;
    }
    .show {
      display: block;
    }
    .dropdownWrapper {
      position: relative;
    }
    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f1f1f1;
      min-width: 160px;
      overflow: auto;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
    }
  }
`;

const Header: NextPage = () => {
  const [show, setShow] = useState(false);
  const toggleSidebar = () => {
    setShow(!show);
  };
  const dropDown = () => {
    document.getElementById("dropmenu").classList.toggle("show");
  };
  const closeDropdown = () => {
    window.onclick = event => {
      if (!event.target.matches(".droplink")) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        const i = 0;
        while (i < dropdowns.length) {
          const openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };
  };

  const { isLogged, user } = useUser();
  if (isLogged === false) {
    return (
      <Container>
        <Link href="/">
          <a className="logo">
            <Logo />
          </a>
        </Link>
        <div className="header-list">
          <Link href="/book" prefetch={false}>
            <a>도서목록</a>
          </Link>
          <Link href="/author" prefetch={false}>
            <a>작가목록</a>
          </Link>
          <Link href="/quote" prefetch={false}>
            <a>명언목록</a>
          </Link>
          <div className="log-info">
            <Link href="/auth/register" prefetch={false}>
              <a>회원가입</a>
            </Link>
            <Link href="/auth/login">
              <a>로그인</a>
            </Link>
          </div>
        </div>
        <MenuIcon className="sidebar-icon" onClick={toggleSidebar} />
      </Container>
    );
  }
  return (
    <Container>
      <Link href="/">
        <a className="logo">
          <Logo />
        </a>
      </Link>
      <div className="header-list">
        <Link href="/book" prefetch={false}>
          <a>도서목록</a>
        </Link>
        <Link href="/author" prefetch={false}>
          <a>작가목록</a>
        </Link>
        <Link href="/quote" prefetch={false}>
          <a>명언목록</a>
        </Link>
        <Link href="/me/shelf" prefetch={false}>
          <a>나의 선반</a>
        </Link>
        <div className="login-info">
          <Link href="/me/[id]" as={`/me/${user.id}`}>
            <a>
              <img className="header-myProfile-Photo" src={user.profilePhoto} alt="" />
            </a>
          </Link>
          <div className="dropdownWrapper">
            <a href="#" onClick={() => dropDown}>
              {user.username}
            </a>
            <div id="dropmenu" className="dropdown-content">
              <a href="#home">Home</a>
            </div>
          </div>
        </div>
      </div>
      <MenuIcon className="sidebar-icon" onClick={toggleSidebar} />
    </Container>
  );
};

export default Header;
