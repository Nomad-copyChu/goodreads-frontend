import React from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import useUser from "../../hooks/useUser";

const ReactStars = dynamic(import("react-stars"), { ssr: false });

const Container = styled.div`
  display: flex;
  .dashboard-photo {
    width: 160px;
    height: 160px;
    margin-left: 180px;
    margin-top: 82px;
    border-radius: 50%;
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
    }
  }
`;

const me: NextPage = () => {
  const { isLogged, user } = useUser();
  console.log(user.bookAvgRating);
  return (
    <Container>
      <img src={user.profilePhoto} alt={user.username} className="dashboard-photo" />
      <div className="dashboard-userinfo-wrapper">
        <div className="userinfo-name">{user.username}</div>
        <div className="userinfo-email">{user.email}</div>
        <div className="userinfo-avgRating-wrapper">
          <ReactStars count={5} edit={false} value={3.5} size={20} color1="#D8D8D8" color2="#FA604A" />
          <div className="userinfo-avgRating">3.5</div>
        </div>
        <div className="userinfo-border" />
        <div className="userinfo-profile-note">자기소개</div>
      </div>
    </Container>
  );
};

export default me;
