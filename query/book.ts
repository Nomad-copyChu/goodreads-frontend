import { gql } from "apollo-boost";

export const ADD_BOOK = gql`
  mutation addBook($bookInfos: AddBookInfos, $authors: [addBookAuthorInfos]) {
    addBook(bookInfos: $bookInfos, authors: $authors) {
      id
    }
  }
`;
export const GET_BOOK = gql`
  query getBook($id: ID!) {
    getBook(id: $id) {
      id
      title
      authors {
        id
        name
        photo
      }
      thumbnail
      contents
      datetime
      isbn
      price
      publisher
      saleStatus
      wantCount
      readingCount
      readCount
      comments {
        id
        text
      }
      gernes {
        id
        term
      }
      totalRating
      ratedUserNum
      addUser {
        id
        username
      }
      createdAt
      updatedAt
    }
  }
`;

export default { ADD_BOOK, GET_BOOK };
