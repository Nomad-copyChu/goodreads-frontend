import React, { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Link from "next/link";
import { NextPage } from "next";
import useUser from "../../hooks/useUser";
import ButtonProfile from "../../public/static/svg/userprofile.svg";
import ButtonBooklist from "../../public/static/svg/userbooklist.svg";
import Buttoncomment from "../../public/static/svg/usercomment.svg";
import QuoteMenuIcon from "../../public/static/svg/me/quote-text-svg.svg";
import AddBookIcon from "../../public/static/svg/userBookAdd.svg";
import colors from "../../style/colors";
import { ApolloNextPageContext, User } from "../../types";
import { GET_USER_WITH_ID } from "../../query/user";
import UserComments from "../../components/me/UserComments";

const ReactStars = dynamic(import("react-stars"), { ssr: false });

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  .dashboard-photo-menus-wrapper {
    margin-top: 82px;
    margin-left: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 1150px) {
      margin-left: 100px;
    }
    @media (max-width: 800px) {
      margin-top: 0px;
      margin-left: 0px;
    }
    .dashboard-photo {
      width: 160px;
      height: 160px;

      margin-bottom: 16px;
      border-radius: 50%;
      @media (max-width: 1150px) {
        width: 100px;
        height: 100px;
      }
      @media (max-width: 800px) {
        width: 40px;
        height: 40px;
      }
    }
    .dashboard-menu-list {
      display: flex;
      flex-direction: column;
      li {
        width: 66px;
        height: 66px;
        margin-top: 20px;
        border-radius: 5px;
        border: 2px solid ${colors.woody_500};
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          border-color: ${colors.black};
          svg {
            path {
              fill: ${colors.black};
            }
          }
        }
      }

      .togglebutton-svg {
        @media (max-width: 1150px) {
          width: 20px;
          height: 20px;
        }
      }
      @media (max-width: 1150px) {
        width: 40px;
        height: 40px;
        margin-bottom: 15px;
      }
      cursor: pointer;
      .button-Quote {
        position: absolute;
        @media (max-width: 1150px) {
          width: 16px;
          height: 16px;
        }
      }
      p {
        color: #b9ad99;
        font-family: Noto Sans KR;
        font-size: 12px;
        @media (max-width: 1150px) {
          font-size: 10px;
        }
      }
    }
  }
  .dashboard-userinfo-wrapper {
    margin-top: 102px;
    margin-left: 50px;
    @media (max-width: 800px) {
      margin-top: 0px;
      margin-left: 20px;
    }
    .userinfo-name {
      font-size: 21px;
      margin-bottom: 8px;
      @media (max-width: 1150px) {
        font-size: 14px;
      }
    }
    .userinfo-email {
      color: #767676;
      font-size: 16px;
      @media (max-width: 1150px) {
        font-size: 12px;
      }
    }
    .userinfo-avgRating-wrapper {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
    }
    .userinfo-avgRating {
      margin-top: 3px;
      margin-left: 16px;
      font-size: 14px;
      @media (max-width: 1150px) {
        font-size: 11px;
      }
    }
    .userinfo-border {
      border: 1px solid #d8d8d8;
      width: 474px;
    }
    .userinfo-profile-note {
      p {
        color: #767676;
        margin-bottom: 10px;
      }
    }
    .userinfo-shelf-wrapper {
      overflow-y: auto;
      ::-webkit-scrollbar {
        display: none;
      }
      h3 {
        font-weight: 700;
        font-size: 21px;
        color: ${colors.woody_600};
        @media (max-width: 1150px) {
          font-size: 15px;
        }
      }
      .userinfo-shelf-bookWrapper {
        margin-top: 10px;
        margin-left: 32px;
        display: flex;
        overflow-x: scroll;
        width: 474px;
        ::-webkit-scrollbar {
          display: none;
        }
        .userinfo-shelf-thumbnail {
          margin-right: 16px;
          width: 120px;
          height: 180px;
          box-sizing: border-box;
          border-radius: 5px;
          @media (max-width: 1150px) {
            width: 100px;
            height: 150px;
          }
        }
        .userinfo-shelf-title {
          width: 120px;
          font-size: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 1; /* ellipsis line */
          -webkit-box-orient: vertical;
        }
      }
    }
    .userinfo-comment-wrapper {
      /* height: 630px; */
      overflow-y: auto;
      ::-webkit-scrollbar {
        display: none;
      }
      width: 474px;
      h3 {
        font-weight: 700;
        font-size: 21px;
        color: ${colors.woody_600};
        @media (max-width: 1150px) {
          font-size: 15px;
        }
      }
      .userinfo-comment-contents {
        display: flex;
        flex-direction: column;
        .userinfo-comment-bookthumbnail-wapper {
          display: flex;
          .userinfo-comment-bookthumbnail {
            margin: 18px;
            width: 60px;
            height: 94px;
            border: 1px solid #d8d8d8;
            box-sizing: border-box;
            border-radius: 5px;
            align-self: center;
          }
          .userinfo-comment-info {
            display: flex;
            flex-direction: column;
            .userinfo-comment-userinfo {
              margin-top: 10px;
              margin-bottom: 10px;
              display: flex;
              justify-content: center;
              span {
                font-size: 14px;
                margin-left: 12px;
              }
              .userinfo-comment-photo {
                width: 24px;
                height: 24px;
              }
            }
            .userinfo-comment-text {
              font-size: 12px;
              color: #767676;
            }
          }
        }
      }
    }
    .userinfo-quote-wapper {
      /* height: 630px; */
      overflow-y: auto;
      ::-webkit-scrollbar {
        display: none;
      }
      h3 {
        font-weight: 700;
        font-size: 21px;
        color: ${colors.woody_600};
        @media (max-width: 1150px) {
          font-size: 15px;
        }
      }
      .userinfo-quote {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

interface IProps {
  user: User;
}

type ProfileFoucsedStatus = "profile" | "shelves" | "comments" | "addBooks" | "quotes";

const me: NextPage<IProps> = ({ user }) => {
  const [focusedStatus, setFocusedStatus] = useState<ProfileFoucsedStatus>("profile");
  console.log(user);
  const genderTranslation = () => {
    if (user.profile?.gender === "MALE") {
      return "남";
    }
    if (user.profile?.gender === "FEMALE") {
      return "여";
    }
    return null;
  };
  return (
    <Container>
      <div className="dashboard-photo-menus-wrapper">
        <img src={user?.profilePhoto} alt={user?.username} className="dashboard-photo" />
        <ul className="dashboard-menu-list">
          <li role="presentation" onClick={() => setFocusedStatus("profile")}>
            <ButtonProfile className="togglebutton-svg" />
          </li>
          <li role="presentation" onClick={() => setFocusedStatus("shelves")}>
            <ButtonBooklist className="togglebutton-svg" />
          </li>
          <li role="presentation" onClick={() => setFocusedStatus("profile")}>
            <Buttoncomment className="togglebutton-svg" />
          </li>
          <li role="presentation" onClick={() => setFocusedStatus("comments")}>
            <AddBookIcon className="togglebutton-svg" />
          </li>
          <li role="presentation" onClick={() => setFocusedStatus("quotes")}>
            <QuoteMenuIcon className="togglebutton-svg" />
          </li>
        </ul>
      </div>
      <div className="dashboard-userinfo-wrapper">
        <div className="userinfo-name">{user?.username}</div>
        <div className="userinfo-email">{user?.email}</div>
        <div className="userinfo-avgRating-wrapper">
          <ReactStars count={5} edit={false} value={3.5} size={14} color1="#D8D8D8" color2="#FA604A" />
          <div className="userinfo-avgRating">3.5</div>
        </div>
        {/* {focusedStatus === "profile" && <UserProfile profile={}/>}
        {focusedStatus === "shelves" && <UserShelves user={user.fp}  s/>}
        {focusedStatus === "comments" && <UserComments user={user} />}
        {focusedStatus === "quotes " && <UserQuotes />} */}
      </div>
    </Container>
  );
};

export default me;

me.getInitialProps = async ({ query, apolloClient }: ApolloNextPageContext) => {
  const { id } = query;
  const { data } = await apolloClient.query({ query: GET_USER_WITH_ID, variables: { userId: id } });
  return { user: data?.getUserWithId };
};
