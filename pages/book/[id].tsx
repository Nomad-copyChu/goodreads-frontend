import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { ApolloNextPageContext, Book, Shelf } from "../../types";
import { GET_BOOK } from "../../query/book";
import BookDetail from "../../components/book/BookDetail";
import { CHECK_RATING } from "../../query/rating";
import { GET_SHELF } from "../../query/shelf";

interface IProps {
  book: Book;
  rating?: { id: string; count: number };
  // shelve?: Shelf;
}

const book: NextPage<IProps> = ({ book, rating /*shelve*/ }) => {
  return (
    <>
      <Head>
        <title>책 ${book.title} | 굿리즈</title>
      </Head>
      <BookDetail book={book} rating={rating} /*shelve={shelve}*/ />
    </>
  );
};

book.getInitialProps = async ({ apolloClient, query }: ApolloNextPageContext) => {
  const { id } = query;
  /**
   * * 책 정보
   */
  const { data: bookData } = await apolloClient.query({
    query: GET_BOOK,
    variables: {
      id: id as string
    }
  });

  try {
    const { data: shelfData } = await apolloClient.query({
      query: GET_SHELF
    });
    return { shelf: shelfData?.getShelves, book: bookData?.getBook };
  } catch (e) {
    console.log(e.message);
  }
  /**
   * * 유저가 책에준 별점
   */
  try {
    const { data: ratingData } = await apolloClient.query({
      query: CHECK_RATING,
      variables: {
        bookId: bookData?.getBook?.id
      }
    });
    return { book: bookData?.getBook, rating: ratingData.checkRating };
  } catch (e) {
    console.warn(e.message);
  }
  return { book: bookData?.getBook };
};
export default book;
