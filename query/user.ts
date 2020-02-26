import { gql } from "apollo-boost";

/**
 * * 로그인 한 유저 불러오기
 */
export const GET_USER = gql`
  query getUser {
    getUser {
      id
      email
      username
      profilePhoto
      isAdmin
      shelves {
        id
        name
      }
    }
  }
`;

/**
 * * 캐쉬에 유저 저장하기
 */
export const GET_CACHE_USER = gql`
  query getCacheUser {
    user @client {
      id
      email
      username
      profilePhoto
      isAdmin
      shelves {
        id
        name
      }
    }
  }
`;

/**
 * * 선반에 추가하기
 */
export const ADD_TO_SHELF = gql`
  mutation addToShelf($shelfName: String!, $bookId: ID!) {
    addToShelf(shelfName: $shelfName, bookId: $bookId) {
      id
    }
  }
`;

export default { GET_USER, GET_CACHE_USER, ADD_TO_SHELF };