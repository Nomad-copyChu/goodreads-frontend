import React from "react";
import { NextPage } from "next";
import { ApolloNextPageContext, Author } from "../../types";
import { GET_BOOK } from "../../query/book";
import BookDetail from "../../components/book/BookDetail";

interface IProps {
  author: Author;
}

const book: NextPage<IProps> = ({ author }) => {
  return <BookDetail />;
};

book.getInitialProps = async ({ apolloClient, query }: ApolloNextPageContext) => {
  const { id } = query;
  const { data } = await apolloClient.query({
    query: GET_BOOK,
    variables: {
      id: id as string
    }
  });
  return { author: data?.getBook };
};
export default book;
