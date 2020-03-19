import React, { useState } from "react";
import styled from "styled-components";
import { NextPage } from "next";
import OutsideClickHandler from "react-outside-click-handler";
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
  .header-my-profile {
    display: flex;
  }
  .header-my-profile-photo {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid ${colors.gray_300};
  }
  .header-my-profile-username {
  }
  .login-info {
    position: relative;
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
  .header-logged-popup-menu {
    top: 30px;
    left: 0;
    position: absolute;
    z-index: 10;
    width: 100px;
  }
`;

const Header: NextPage = () => {
  const [show, setShow] = useState(false);
  const toggleSidebar = () => {
    setShow(!show);
  };

  const { isLogged, user } = useUser();

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
        {isLogged && (
          <Link href="/me/shelf" prefetch={false}>
            <a>나의 선반</a>
          </Link>
        )}
      </div>
      {isLogged ? (
        <div className="login-info">
          <OutsideClickHandler
            onOutsideClick={() => {
              if (show) {
                setShow(false);
              }
            }}
          >
            <div
              role="button"
              onClick={() => {
                setShow(!show);
                console.log("hi");
              }}
              className="header-my-profile"
            >
              <img className="header-my-profile-photo" src={user.profilePhoto} alt="" />
              <p className="header-my-profile-username">{user.username}</p>
            </div>
            {show && (
              <div className="header-logged-popup-menu">
                <ul>
                  <li>드롭다운</li>
                  <li>설정</li>
                  <li>추가하기</li>
                  <li>로그아웃</li>
                </ul>
              </div>
            )}
          </OutsideClickHandler>
        </div>
      ) : (
        <div className="log-info">
          <Link href="/auth/register" prefetch={false}>
            <a>회원가입</a>
          </Link>
          <Link href="/auth/login">
            <a>로그인</a>
          </Link>
        </div>
      )}
      <MenuIcon className="sidebar-icon" onClick={toggleSidebar} />
    </Container>
  );
};

export default Header;
