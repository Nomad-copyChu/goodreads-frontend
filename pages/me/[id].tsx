import React, { useState } from "react";
import styled, { ThemeConsumer } from "styled-components";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import useUser from "../../hooks/useUser";
import ButtonProfile from "../../public/static/svg/userprofile.svg";
import ButtonBooklist from "../../public/static/svg/userbooklist.svg";
import Buttoncomment from "../../public/static/svg/usercomment.svg";
import ButtonBookadd from "../../public/static/svg/userBookAdd.svg";
import ButtonQoute from "../../public/static/svg/userquote.svg";

const ReactStars = dynamic(import("react-stars"), { ssr: false });

const Container = styled.div`
  display: flex;
  .dashboard-photo-profile-wrapper {
    margin-left: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .dashboard-photo {
      width: 160px;
      height: 160px;
      margin-top: 82px;
      margin-bottom: 16px;
      border-radius: 50%;
    }
  }
  .dashboard-userinfo-wrapper {
    margin-top: 102px;
    margin-left: 50px;
    .userinfo-name {
      font-size: 21px;
      margin-bottom: 8px;
    }
    .userinfo-email {
      color: #767676;
      font-size: 16px;
    }
    .userinfo-avgRating-wrapper {
      display: flex;
      align-items: center;
    }
    .userinfo-avgRating {
      margin-top: 3px;
      margin-left: 16px;
      font-size: 14px;
    }
    .userinfo-border {
      border: 1px solid #d8d8d8;
      width: 842px;
      margin-top: 15px;
    }
    .userinfo-profile-note {
      p {
        color: #767676;
        margin-bottom: 10px;
      }
    }
    .userinfo-shelve-wrapper {
      h3 {
        font-weight: 600px;
        font-size: 21px;
      }
      .userinfo-shelve-bookWrapper {
        overflow-x: scroll;
        width: 842px;
        ::-webkit-scrollbar {
          display: none;
        }
        .userinfo-shelve-thumbnail {
          display: flex;
        }
      }
    }
  }
`;

const ToggleButton = styled.div<{ fill: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 66px;
  margin-bottom: 30px;
  border: 2px solid #b9ad99;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${props => (props.fill ? "white" : "transparent")};
  .button-Quote {
    position: absolute;
  }
  p {
    color: #b9ad99;
    font-family: Noto Sans KR;
    font-size: 12px;
  }
`;

const me: NextPage = () => {
  const { isLogged, user } = useUser();
  const [profileShow, setProfileShow] = useState(false);
  const [booklistShow, setBooklistShow] = useState(false);
  const [commentShow, setCommentShow] = useState(false);
  const [bookaddShow, setBookaddShow] = useState(false);
  const [QuoteShow, setQuoteShow] = useState(false);
  const toggleColor = (key: boolean) => {
    if (key) {
      return true;
    }
    return false;
  };
  const toggleProfile = () => {
    setProfileShow(!profileShow);
    setBooklistShow(false);
    setCommentShow(false);
    setBookaddShow(false);
    setQuoteShow(false);
  };

  const toggleBooklist = () => {
    setProfileShow(false);
    setBooklistShow(!booklistShow);
    setCommentShow(false);
    setBookaddShow(false);
    setQuoteShow(false);
  };

  const toggleComment = () => {
    setProfileShow(false);
    setBooklistShow(false);
    setCommentShow(!commentShow);
    setBookaddShow(false);
    setQuoteShow(false);
  };

  const toggleBookAdd = () => {
    setProfileShow(false);
    setBooklistShow(false);
    setCommentShow(false);
    setBookaddShow(!bookaddShow);
    setQuoteShow(false);
  };

  const toggleQuote = () => {
    setProfileShow(false);
    setBooklistShow(false);
    setCommentShow(false);
    setBookaddShow(false);
    setQuoteShow(!QuoteShow);
  };
  const genderTranslation = () => {
    if (user.profile.gender === "MALE") {
      return "남";
    }
    if (user.profile.gender === "FEMALE") {
      return "여";
    }
    return null;
  };
  return (
    <Container>
      <div className="dashboard-photo-profile-wrapper">
        <img src={user.profilePhoto} alt={user.username} className="dashboard-photo" />
        <ToggleButton role="button" onClick={toggleProfile} fill={toggleColor(profileShow)}>
          <ButtonProfile className="dashboard-fill" />
        </ToggleButton>
        <ToggleButton role="button" onClick={toggleBooklist} fill={toggleColor(booklistShow)}>
          <ButtonBooklist />
        </ToggleButton>
        <ToggleButton role="button" onClick={toggleComment} fill={toggleColor(commentShow)}>
          <Buttoncomment />
        </ToggleButton>
        <ToggleButton role="button" onClick={toggleBookAdd} fill={toggleColor(bookaddShow)}>
          <ButtonBookadd />
        </ToggleButton>
        <ToggleButton role="button" onClick={toggleQuote} fill={toggleColor(QuoteShow)}>
          <ButtonQoute className="button-Quote" />
          <p>Quote</p>
        </ToggleButton>
      </div>
      <div className="dashboard-userinfo-wrapper">
        <div className="userinfo-name">{user.username}</div>
        <div className="userinfo-email">{user.email}</div>
        <div className="userinfo-avgRating-wrapper">
          <ReactStars count={5} edit={false} value={3.5} size={20} color1="#D8D8D8" color2="#FA604A" />
          <div className="userinfo-avgRating">3.5</div>
        </div>
        <div className="userinfo-border" />
        {profileShow && (
          <div className="userinfo-profile-note">
            <p>나이:{user.profile.age}</p>
            <p>성별:{genderTranslation()}</p>
            <p>흥미:{user.profile.interests}</p>
            <p>좋아하는 책:{user.profile.favoriteBook}</p>
            <p>자기소개:{user.profile.bio}</p>
          </div>
        )}
        {booklistShow && (
          <div className="userinfo-shelve-wrapper">
            <h3>원해요</h3>
            <div className="userinfo-shelve-bookWrapper">
              {user.displays.map(display =>
                display.shelves.map((shelve, i) => {
                  if (shelve.name === "want") {
                    return (
                      <div key={i}>
                        <img src={display.book.thumbnail} alt="" />
                        <div>{display.book.title}</div>
                      </div>
                    );
                  }
                  return null;
                })
              )}
            </div>
            <h3>읽는중</h3>
            {user.displays.map(display =>
              display.shelves.map((shelve, i) => {
                if (shelve.name === "reading") {
                  return (
                    <div key={i}>
                      <img src={display.book.thumbnail} alt="" />
                      <div>{display.book.title}</div>
                    </div>
                  );
                }
                return null;
              })
            )}
            <h3>다읽음</h3>
            {user.displays.map(display =>
              display.shelves.map((shelve, i) => {
                if (shelve.name === "read") {
                  return (
                    <div key={i}>
                      <img src={display.book.thumbnail} alt="" />
                      <div>{display.book.title}</div>
                    </div>
                  );
                }
                return null;
              })
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default me;
