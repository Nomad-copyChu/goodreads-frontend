/* eslint-disable react/no-array-index-key */
import { NextPage } from "next";
import { ApolloNextPageContext, Book, Author } from "../types";
import { GET_BOOKS } from "../query";

import { GET_AUTHORS } from "../query/author";
import Main from "../components/Main";

interface IProps {
  books: Book[];
  authors: Author[];
}

const index: NextPage<IProps> = ({ books, authors }) => {
  return <Main books={books} authors={authors} />;
};

index.getInitialProps = async (ctx: ApolloNextPageContext) => {
  const { apolloClient } = ctx;
  //Posts 불러오기
  const [bookData, authorData] = await Promise.all([
    await apolloClient.query({
      query: GET_BOOKS,
      fetchPolicy: "network-only"
    }),
    await apolloClient.query({
      query: GET_AUTHORS,
      fetchPolicy: "network-only"
    })
  ]);
  return { books: bookData?.data?.getBooks, authors: authorData?.data?.getAuthors };
};

export default index;
