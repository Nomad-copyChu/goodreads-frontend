import React from "react";
import { NextPage } from "next";
import { ApolloNextPageContext, Book } from "../../types";
import { GET_BOOK } from "../../query/book";
import BookDetail from "../../components/book/BookDetail";
import { CHECK_RATING } from "../../query/rating";

interface IProps {
  book: Book;
  rating?: { id: string; count: number };
}

const book: NextPage<IProps> = ({ book, rating }) => {
  return <BookDetail book={book} rating={rating} />;
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
