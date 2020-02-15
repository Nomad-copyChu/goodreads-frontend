import React from "react";
import { NextPage } from "next";
import RegisterBox from "../../../components/auth/RegisterBox";
import LoginBackground from "../../../components/auth/LoginBackground";

const login: NextPage = () => {
  return (
    <>
      <LoginBackground />
      <RegisterBox />
    </>
  );
};

export default login;
