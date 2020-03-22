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
      bookAvgRating
      isAdmin
      profile {
        user {
          id
        }
        age
        gender
        bio
        interests
        favoriteBook
      }
      shelves {
        id
        name
      }
      displays {
        book {
          id
          title
          thumbnail
        }
        shelves {
          name
        }
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
      bookAvgRating
      isAdmin
      profile {
        username
        age
        gender
        bio
        interests
        favoriteBook
      }
      shelves {
        id
        name
      }
      displays {
        book {
          id
          title
          thumbnail
        }
        shelves {
          name
        }
      }
    }
  }
`;

export default { GET_USER, GET_CACHE_USER };
