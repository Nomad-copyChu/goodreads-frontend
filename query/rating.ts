import { gql } from "apollo-boost";

/**
 * * 책 별점 주기
 */
export const RATE_BOOK = gql`
  mutation rateBook($bookId: ID!, $count: Float!) {
    rateBook(bookId: $bookId, count: $count) {
      id
      count
    }
  }
`;

/**
 * * 책 별점 확인하기
 */
export const CHECK_RATING = gql`
  query checkRating($bookId: ID!) {
    checkRating(bookId: $bookId) {
      count
    }
  }
`;
export default { CHECK_RATING, RATE_BOOK };
