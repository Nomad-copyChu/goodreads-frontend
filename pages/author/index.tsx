import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { GET_AUTHORS } from "../../query/author";
import { ApolloNextPageContext, Author } from "../../types";
import AuthorList from "../../components/author/AuthorList";

interface IProps {
  authors: Author[];
}

const authList: NextPage<IProps> = ({ authors }) => {
  return (
    <>
      <Head>
        <title>작가목록 | 굿리즈</title>
      </Head>
      <AuthorList authors={authors} />
    </>
  );
};

authList.getInitialProps = async ({ apolloClient }: ApolloNextPageContext) => {
  const { data } = await apolloClient.query({ query: GET_AUTHORS });
  return { authors: data?.getAuthors };
};

export default authList;
