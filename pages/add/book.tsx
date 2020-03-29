import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import AddBook from "../../components/book/AddBook";

const book: NextPage = () => {
  return (
    <>
      <Head>
        <title>책 추가하기 | 굿리즈</title>
      </Head>
      <AddBook />
    </>
  );
};

export default book;
