import React from "react";
import { NextPage } from "next";
import LoginBox from "../../../components/auth/LoginBox";
import LoginBackground from "../../../components/auth/LoginBackground";

const login: NextPage = () => {
  return (
    <>
      <LoginBackground />
      <LoginBox />
    </>
  );
};

export default login;
