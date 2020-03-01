import React from "react";
import { NextPage } from "next";
import AuthorDetail from "../../components/author/AuthorDetail";
import { ApolloNextPageContext, Author as AuthorType } from "../../types";
import { GET_BOOK } from "../../query/book";
import { GET_AUTHOR } from "../../query/author";

interface IProps {
  author: AuthorType;
}

const author: NextPage<IProps> = ({ author }) => {
  return <AuthorDetail author={author} />;
};

author.getInitialProps = async ({ query, apolloClient }: ApolloNextPageContext) => {
  const { id } = query;
  const { data } = await apolloClient.query<{ getAuthor: AuthorType }>({ query: GET_AUTHOR, variables: { id } });

  return { author: data.getAuthor };
};

export default author;
