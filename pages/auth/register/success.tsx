import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import RegisterSuccess from "../../../components/auth/RegisterSuccess";

const sucess: NextPage = () => {
  return (
    <>
      <Head>
        <title>어서오세요 | 굿리즈</title>
      </Head>
      <RegisterSuccess />
    </>
  );
};

export default sucess;
