import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { ApolloNextPageContext, Author } from "../../../types";
import { GET_AUTHOR } from "../../../query/author";
import EditAuthor from "../../../components/author/EditAuthor";

interface IProps {
  author?: Author;
}

const author: NextPage<IProps> = ({ author }) => {
  return (
    <>
      <Head>
        <title>{`작가 수정하기 | ${author.name}`} | 굿리즈</title>
      </Head>
      <EditAuthor author={author} />
    </>
  );
};

author.getInitialProps = async ({ query, apolloClient }: ApolloNextPageContext) => {
  const { id } = query;
  if (id) {
    const { data } = await apolloClient.query<{ getAuthor: Author }>({ query: GET_AUTHOR, variables: { id } });
    return { author: data.getAuthor };
  }
  return {};
};

export default author;
