import { gql } from "apollo-boost";

/**
 * * 책 추가하기
 */
export const ADD_BOOK = gql`
  mutation addBook($bookInfos: AddBookInfos, $authors: [addBookAuthorInfos]) {
    addBook(bookInfos: $bookInfos, authors: $authors) {
      id
    }
  }
`;

/**
 * * 책 리스트 불러오기
 */
export const GET_BOOKS = gql`
  query getBooks($gerne: String) {
    getBooks(gerne: $gerne) {
      id
      title
      authors {
        id
        name
        photo
        description
      }
      gernes {
        id
        term
      }
      comments {
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
      totalRating
      avgRating
      addUser {
        id
        username
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * * 책 하나 불러오기
 */
export const GET_BOOK = gql`
  query getBook($id: ID!) {
    getBook(id: $id) {
      id
      title
      authors {
        id
        name
        photo
        books {
          id
          title
          thumbnail
        }
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
      totalRating
      ratedUserNum
      avgRating
      comments {
        id
        text
        user {
          id
          username
          profilePhoto
        }
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

/**
 * * 선반에 책 추가하기
 */
export const ADD_TO_SHELF = gql`
  mutation addToShelf($shelfName: String!, $bookId: ID!) {
    addToShelf(shelfName: $shelfName, bookId: $bookId) {
      id
    }
  }
`;

export default { ADD_BOOK, GET_BOOK };
