import React from "react";
import { NextPage } from "next";
import LoginBackground from "../../../components/auth/LoginBackground";
import LoginBox from "../../../components/auth/LoginBox";

const login: NextPage = () => {
  return (
    <span>
      <LoginBox />
      <LoginBackground />
    </span>
  );
};

export default login;
