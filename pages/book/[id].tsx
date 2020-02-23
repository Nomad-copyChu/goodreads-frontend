import React from "react";
import { NextPage } from "next";
import { ApolloNextPageContext, Book } from "../../types";
import { GET_BOOK } from "../../query/book";
import BookDetail from "../../components/book/BookDetail";

interface IProps {
  book: Book;
}

const book: NextPage<IProps> = ({ book }) => {
  return <BookDetail book={book} />;
};

book.getInitialProps = async ({ apolloClient, query }: ApolloNextPageContext) => {
  const { id } = query;
  const { data } = await apolloClient.query({
    query: GET_BOOK,
    variables: {
      id: id as string
    }
  });
  return { book: data?.getBook };
};
export default book;
