/* eslint-disable react/no-array-index-key */
import { NextPage } from "next";
import { ApolloNextPageContext, Book, Author, Quote, Gerne } from "../types";
import { GET_BOOKS } from "../query/book";

import { GET_QUOTES } from "../query/quote";
import { GET_AUTHORS } from "../query/author";
import Main from "../components/Main";
import GET_GERNES from "../query/gernes";

interface IProps {
  books: Book[];
  authors: Author[];
  quotes: Quote[];
  gernes: Gerne[];
}

const index: NextPage<IProps> = ({ books, authors, quotes, gernes }) => {
  return <Main books={books} authors={authors} quotes={quotes} gernes={gernes} />;
};

index.getInitialProps = async (ctx: ApolloNextPageContext) => {
  const { apolloClient } = ctx;
  //Posts 불러오기
  const [bookData, authorData, quoteData, gerneData] = await Promise.all([
    await apolloClient.query({
      query: GET_BOOKS
    }),
    await apolloClient.query({
      query: GET_AUTHORS
    }),
    await apolloClient.query({
      query: GET_QUOTES,
      variables: { limit: 3 }
    }),
    await apolloClient.query({
      query: GET_GERNES
    })
  ]);
  return {
    books: bookData?.data?.getBooks,
    authors: authorData?.data?.getAuthors,
    quotes: quoteData?.data?.getQuotes,
    gernes: gerneData?.data?.getGernes
  };
};

export default index;
