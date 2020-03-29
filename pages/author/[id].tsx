import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import AuthorDetail from "../../components/author/AuthorDetail";
import { ApolloNextPageContext, Author as AuthorType } from "../../types";
import { GET_AUTHOR } from "../../query/author";

interface IProps {
  author: AuthorType;
}

const author: NextPage<IProps> = ({ author }) => {
  return (
    <>
      <Head>
        <title>작가 {author.name} | 굿리즈</title>
      </Head>
      <AuthorDetail author={author} />
    </>
  );
};

author.getInitialProps = async ({ query, apolloClient }: ApolloNextPageContext) => {
  const { id } = query;
  const { data } = await apolloClient.query<{ getAuthor: AuthorType }>({ query: GET_AUTHOR, variables: { id } });

  return { author: data.getAuthor };
};

export default author;
