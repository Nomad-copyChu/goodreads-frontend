/* eslint-disable react/no-array-index-key */
import { NextPage } from "next";
import { ApolloNextPageContext, Book, Author, Quote } from "../types";
import { GET_BOOKS } from "../query";

import { GET_QUOTES } from "../query/quote";
import { GET_AUTHORS } from "../query/author";
import Main from "../components/Main";

interface IProps {
  books: Book[];
  authors: Author[];
  quotes: Quote[];
}

const index: NextPage<IProps> = ({ books, authors, quotes }) => {
  return <Main books={books} authors={authors} quotes={quotes} />;
};

index.getInitialProps = async (ctx: ApolloNextPageContext) => {
  const { apolloClient } = ctx;
  //Posts 불러오기
  const [bookData, authorData, quoteData] = await Promise.all([
    await apolloClient.query({
      query: GET_BOOKS,
      fetchPolicy: "network-only"
    }),
    await apolloClient.query({
      query: GET_AUTHORS,
      fetchPolicy: "network-only"
    }),
    await apolloClient.query({
      query: GET_QUOTES,
      fetchPolicy: "network-only"
    })
  ]);
  console.log(quoteData, "Data");
  return { books: bookData?.data?.getBooks, authors: authorData?.data?.getAuthors, quotes: quoteData?.data?.getQuotes };
};

export default index;
