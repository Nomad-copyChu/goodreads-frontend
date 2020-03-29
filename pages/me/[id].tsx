import React, { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import Head from "next/head";
import { useMutation } from "@apollo/react-hooks";
import ButtonProfile from "../../public/static/svg/userprofile.svg";
import ButtonBooklist from "../../public/static/svg/userbooklist.svg";
import Buttoncomment from "../../public/static/svg/usercomment.svg";
import QuoteMenuIcon from "../../public/static/svg/me/quote-text-svg.svg";
import AddBookIcon from "../../public/static/svg/userBookAdd.svg";
import colors from "../../style/colors";
import { ApolloNextPageContext, User } from "../../types";
import { GET_USER_WITH_ID, CHANGE_PROFILE_PHOTO } from "../../query/user";
import UserComments from "../../components/me/UserComments";
import UserProfile from "../../components/me/UserProfile";
import UserShelves from "../../components/me/UserShelves";
import UserAddBooks from "../../components/me/UserAddBooks";
import UserQuotes from "../../components/me/UserQuotes";
import useUpload from "../../hooks/useUpload";

const ReactStars = dynamic(import("react-stars"), { ssr: false });

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  @media (max-width: 600px) {
    padding: 20px;
  }
  .dashboard-photo-menus-wrapper {
    margin-top: 82px;
    margin-left: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 800px) {
      margin: 0;
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

      cursor: pointer;
      .button-Quote {
        position: absolute;
      }
      p {
        color: #b9ad99;
        font-family: Noto Sans KR;
        font-size: 12px;
      }
    }
  }
  .dashboard-userinfo-wrapper {
    margin-top: 102px;
    margin-left: 30px;
    width: 100%;
    max-width: 550px;
    overflow: hidden;
    @media (max-width: 600px) {
      margin-top: 16px;
    }
    .userinfo-name {
      font-size: 21px;
      margin-bottom: 8px;
    }
    .userinfo-email {
      color: #767676;
      font-size: 16px;
      margin-bottom: 8px;
    }
    .userinfo-avgRating-wrapper {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }
    .userinfo-avgRating {
      margin-top: 3px;
      margin-left: 16px;
      font-size: 14px;
    }
    .userinfo-border {
      border: 1px solid #d8d8d8;
      width: 474px;
      @media (max-width: 600px) {
        width: 100%;
      }
    }
    .userinfo-profile-note {
      .editButton {
        cursor: pointer;
        text-decoration: underline;
        color: #00635d;
      }
      .Input-Wrapper {
        display: flex;
        margin-bottom: 10px;
        align-items: center;
        p {
          color: #767676;
        }
        .Input {
          margin-left: 12px;
        }

        .text-area-Input {
          border: 1px solid #b9ad99;
          background-color: #f4f1ea;
          box-sizing: border-box;
          border-radius: 5px;
          width: 300px;
          min-height: 256px;
          font-size: 16px;
          padding: 6px;
          outline: none;
          resize: none;
          padding: 6px;
        }
      }
    }
    .text-area-wrapper {
      flex-direction: column;
      align-items: flex-start !important;
      p {
        margin-bottom: 10px;
      }
    }
    .userinfo-shelf-wrapper {
      max-height: 600px;
      ::-webkit-scrollbar {
        display: none;
      }
      .not-exist-logged-book-card-wrapper {
        border: 1px solid ${colors.gray_500};
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 24px;
        margin-right: 16px;
        margin-bottom: 16px;
        width: 120px;
        height: 180px;
        box-sizing: border-box;

        p {
          text-align: center;
          color: ${colors.gray_600};
        }
      }
      h3 {
        font-weight: 700;
        font-size: 21px;
        color: ${colors.woody_600};
      }
      .userinfo-shelf-bookWrapper {
        margin-top: 10px;
        display: flex;
        overflow-x: scroll;
        width: 100%;
        @media (max-width: 600px) {
        }
        ::-webkit-scrollbar {
          display: none;
        }
        .userinfo-shelf-thumbnail {
          margin-right: 16px;
          width: 120px;
          height: 180px;
          box-sizing: border-box;
          border-radius: 5px;
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
      width: 474px;
      @media (max-width: 600px) {
        div {
          width: 100%;
        }
        width: 100%;
      }
      h3 {
        margin-bottom: 12px;
      }
      overflow-y: auto;
      ::-webkit-scrollbar {
        display: none;
      }
      h3 {
        font-weight: 700;
        font-size: 21px;
        color: ${colors.woody_600};
      }
      .userinfo-comment-contents {
        display: flex;
        flex-direction: column;
        .userinfo-comment-bookthumbnail-wapper {
          display: flex;
          .userinfo-comment-bookthumbnail-link {
            margin: 18px;
          }
          .userinfo-comment-bookthumbnail {
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
              justify-content: start;
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
    .userinfo-AddBooks-wrapper {
      position: relative;
      h3 {
        font-size: 21px;
        margin-bottom: 12px;
        color: ${colors.woody_800};
      }
      .userinfo-AddBooks-shelf-wrapper {
        width: 100%;
        .userinfo-AddBooks-shelf-borderbox-Wrapper {
          display: flex;
          width: 100%;
          overflow-x: auto;
          button {
            margin-bottom: 12px;
          }
          ::-webkit-scrollbar {
            display: none;
          }
        }
        .userinfo-AddBooks-shelf-borderbox {
          margin-right: 18px;
          padding: 6px 15px 6px 15px;
          background: #f4f1ea;
          border: 1px solid #d6d0c4;
          border-radius: 5px;
          max-height: 32px;
          font-size: 1rem;
        }
        .userinfo-AddBooks-shelf-borderbox-addbutton {
          margin-right: 18px;
          padding: 6px 15px 6px 15px;
          background: #f4f1ea;
          border: 1px solid #d6d0c4;
          border-radius: 5px;
          max-height: 32px;
          font-size: 1rem;
          cursor: pointer;
        }
      }
      .AddshelfInputWraaper {
      }
      .AddshelfBorderLine {
        border: 1px solid #d8d8d8;
        width: 100%;
        margin-top: 25px;
      }
      .shelf-booklist-wrapper {
        width: 100%;
        height: 565px;
        overflow: auto;
        ::-webkit-scrollbar {
          display: none;
        }
      }
      .shelf-booklist {
        display: flex;
        flex-wrap: wrap;
        .booklist-thumbnail-title-wrapper {
          margin-right: 20px;
          display: flex;
          flex-direction: column;
          p {
            width: 124px;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* ellipsis line */
            -webkit-box-orient: vertical;
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
        margin-bottom: 20px;
      }
      .userinfo-quote {
        display: flex;
        flex-direction: column;
        max-height: 506px;
        overflow: auto;
        ::-webkit-scrollbar {
          display: none;
        }
        .userinfo-quote-QuoteCard-Wrapper {
          margin-bottom: 20px;
        }
      }
    }
  }
  .mr-12 {
    margin-right: 12px;
  }
  .dashboard-photo-wrapper {
    position: relative;
    width: 100px;
    height: 100px;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      opacity: 0;
      cursor: pointer;
    }
  }
  .userinfo-AddBooks-shelf-borderbox-Wrapper {
    flex-wrap: wrap;
  }
  .add-shelf-button {
    margin-top: 12px;
  }
  .me-quote-wapper {
    margin-bottom: 16px;
    @media (max-width: 650px) {
      div {
        width: 100%;
      }
    }
  }
  .me-shelf-books {
  }
`;

interface IProps {
  user: User;
}

type ProfileFoucsedStatus = "profile" | "shelves" | "comments" | "addBooks" | "quotes";

const me: NextPage<IProps> = ({ user }) => {
  const [focusedStatus, setFocusedStatus] = useState<ProfileFoucsedStatus>("profile");
  const { fileUploadMuation } = useUpload();
  const [userPhoto, setUserPhoto] = useState(user?.profilePhoto);
  const [changeProfilePhotoMutation] = useMutation(CHANGE_PROFILE_PHOTO);
  return (
    <>
      <Head>
        <title>회원님 {user.username} | 굿리즈</title>
      </Head>
      <Container>
        <div className="dashboard-photo-menus-wrapper">
          <div className="dashboard-photo-wrapper">
            <img src={userPhoto} alt={user?.username} className="dashboard-photo" />
            <input
              type="file"
              onChange={async e => {
                try {
                  const file = e.target.files[0];
                  const { data } = await fileUploadMuation({ variables: { file } });
                  const { data: changeData } = await changeProfilePhotoMutation({
                    variables: { url: data?.singleUpload }
                  });
                  setUserPhoto(changeData?.chageProfilePhoto.profilePhoto);
                } catch (e) {
                  alert(e.message);
                }
              }}
            />
          </div>
          <ul className="dashboard-menu-list">
            <li role="presentation" onClick={() => setFocusedStatus("profile")}>
              <ButtonProfile className="togglebutton-svg" />
            </li>
            <li role="presentation" onClick={() => setFocusedStatus("shelves")}>
              <ButtonBooklist className="togglebutton-svg" />
            </li>
            <li role="presentation" onClick={() => setFocusedStatus("comments")}>
              <Buttoncomment className="togglebutton-svg" />
            </li>
            <li role="presentation" onClick={() => setFocusedStatus("addBooks")}>
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
            <ReactStars
              count={5}
              edit={false}
              value={Number(user?.bookAvgRating === "NaN" ? 0 : user?.bookAvgRating)}
              size={14}
              color1="#D8D8D8"
              color2="#FA604A"
            />
            <div className="userinfo-avgRating">{user?.bookAvgRating === "NaN" ? 0 : user?.bookAvgRating}</div>
          </div>
          {focusedStatus === "profile" && <UserProfile profile={user.profile} id={user.id} />}
          {focusedStatus === "shelves" && <UserShelves shelves={user.shelves} />}
          {focusedStatus === "comments" && <UserComments bookComments={user.bookComments} />}
          {focusedStatus === "addBooks" && <UserAddBooks name={user.username} shelves={user.shelves} />}
          {focusedStatus === "quotes" && <UserQuotes likeQuotes={user.likeQuotes} />}
        </div>
      </Container>
    </>
  );
};

export default me;

me.getInitialProps = async ({ query, apolloClient }: ApolloNextPageContext) => {
  const { id } = query;
  const { data } = await apolloClient.query({ query: GET_USER_WITH_ID, variables: { userId: id } });
  return { user: data?.getUserWithId };
};
