import { gql } from "apollo-boost";

export const COMMENT_BOOK = gql`
  mutation commentBook($bookId: ID!, $text: String!) {
    commentBook(bookId: $bookId, text: $text) {
      id
      text
      user {
        id
        username
        profilePhoto
      }
    }
  }
`;

export default COMMENT_BOOK;
