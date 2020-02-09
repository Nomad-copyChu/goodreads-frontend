import { gql } from "apollo-boost";

export const GET_BOOKS = gql`
  query getBooks($gerne: String) {
    getBooks(gerne: $gerne) {
      id
      title
      authors {
        id
      }
      thumbnail
      contents
      datetime
      isbn
      price
      publisher
      wantCount
      readingCount
      readCount
      totalRating
      ratedUserNum
      addUser {
        username
      }
      createdAt
      updatedAt
    }
  }
`;

export default GET_BOOKS;
