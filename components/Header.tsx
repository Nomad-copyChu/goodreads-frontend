import React, { useState } from "react";
import styled from "styled-components";
import { NextPage } from "next";
import OutsideClickHandler from "react-outside-click-handler";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import Link from "next/link";
import Logo from "../public/static/svg/goodreadsKr.svg";
import colors from "../style/colors";
import MenuIcon from "../public/static/svg/menu.svg";
import useUser from "../hooks/useUser";
import Dashboard from "../public/static/svg/dashboard.svg";
import Setting from "../public/static/svg/settings.svg";
import Question from "../public/static/svg/question.svg";
import Add from "../public/static/svg/add.svg";
import Loggedout from "../public/static/svg/loggedout.svg";
import responsive from "../style/responsive";

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
      margin-left: 50px;
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
    a {
      white-space: pre;
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
    align-items: center;
  }
  .header-my-profile-photo {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid ${colors.gray_300};
  }
  .header-my-profile-username {
    cursor: pointer;
    margin-right: 130px;
    margin-left: 12px;
    white-space: pre;
    @media (max-width: ${responsive.medium}) {
      margin-right: 50px;
    }
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
  }
  .header-logged-popup-menu {
    top: 40px;
    left: 0;
    position: absolute;
    z-index: 10;
    width: 161px;
    height: 171px;
    background: #f4f1ea;
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    @media (max-width: 800px) {
      top: 24px;
      left: -128px;
    }
  }
  .header-logged-popup-item-Wrapper {
    cursor: pointer;
    padding: 12px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 33px;
    :hover {
      background: #ede6d6;
    }
  }
  .header-logged-popup-item-emoticon {
    margin-left: 4px;
  }
  .header-logged-popup-item-font {
    position: absolute;
    margin-left: 46px;
    color: #6a5949;
  }
  .header-logout-popup-menu {
    top: 24px;
    left: -128px;
    position: absolute;
    z-index: 10;
    width: 161px;
    height: 171px;
    background: #f4f1ea;
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }
`;

const Header: NextPage = () => {
  const [show, setShow] = useState(false);
  const [iconShow, setIconShow] = useState(false);
  const toggleIcon = () => {
    setIconShow(!iconShow);
  };
  const toggleSidebar = () => {
    setShow(!show);
  };
  const router = useRouter();
  const { isLogged, user } = useUser();
  const toggleLoggedOut = () => {
    cookie.set("Authorization", "");
    window.location.href = "/";
  };
  const PopupMenu = () => {
    return (
      <div className="header-logged-popup-menu">
        <ul>
          <li className="header-logged-popup-item-Wrapper" onClick={() => router.push(`/me/${user.id}`)}>
            <Dashboard />
            <div className="header-logged-popup-item-font">대쉬보드</div>
          </li>
          <li className="header-logged-popup-item-Wrapper">
            <Setting className="header-logged-popup-item-emoticon" />
            <div className="header-logged-popup-item-font">설정</div>
          </li>
          <li className="header-logged-popup-item-Wrapper">
            <Question className="header-logged-popup-item-emoticon" />
            <div className="header-logged-popup-item-font">Q&A</div>
          </li>
          <li className="header-logged-popup-item-Wrapper" onClick={() => router.push("/add")}>
            <Add className="header-logged-popup-item-emoticon" />
            <div className="header-logged-popup-item-font">추가하기</div>
          </li>
          <li className="header-logged-popup-item-Wrapper" onClick={() => toggleLoggedOut()}>
            <Loggedout className="header-logged-popup-item-emoticon" />
            <div className="header-logged-popup-item-font">로그아웃</div>
          </li>
        </ul>
      </div>
    );
  };
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
        <Link href="/add/quote" prefetch={false}>
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
            <div role="button" onClick={toggleSidebar} className="header-my-profile">
              <img className="header-my-profile-photo" src={user.profilePhoto} alt="" />
              <p className="header-my-profile-username">{user.username}</p>
            </div>
            {show && PopupMenu()}
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
      <div className="sidebar-icon">
        {isLogged ? (
          <OutsideClickHandler
            onOutsideClick={() => {
              if (iconShow) {
                setIconShow(false);
              }
            }}
          >
            <MenuIcon onClick={toggleIcon} />
            {iconShow && PopupMenu()}
          </OutsideClickHandler>
        ) : (
          <OutsideClickHandler
            onOutsideClick={() => {
              if (iconShow) {
                setIconShow(false);
              }
            }}
          >
            <MenuIcon onClick={toggleIcon} />
            {iconShow && (
              <div className="header-logout-popup-menu">
                <ul>
                  <li className="header-logged-popup-item-Wrapper" onClick={() => router.push("/book")}>
                    <a>도서목록</a>
                  </li>
                  <li className="header-logged-popup-item-Wrapper" onClick={() => router.push("/author")}>
                    <a>작가목록</a>
                  </li>
                  <li className="header-logged-popup-item-Wrapper" onClick={() => router.push("/quote")}>
                    <a>명언목록</a>
                  </li>
                  <li className="header-logged-popup-item-Wrapper" onClick={() => router.push("/auth/register")}>
                    <a>회원가입</a>
                  </li>
                  <li className="header-logged-popup-item-Wrapper" onClick={() => router.push("/auth/login")}>
                    <a>로그인</a>
                  </li>
                </ul>
              </div>
            )}
          </OutsideClickHandler>
        )}
      </div>
    </Container>
  );
};

export default Header;
