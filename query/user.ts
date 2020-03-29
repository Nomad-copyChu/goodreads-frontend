import { gql } from "apollo-boost";

/**
 * * 로그인 한 유저 불러오기
 */
export const GET_LOGGED_USER = gql`
  query getUser {
    getUser {
      id
      email
      username
      profilePhoto
      bookAvgRating
      isAdmin
      profile {
        id
        age
        gender
        bio
        interests
        favoriteBook
      }
      shelves {
        id
        name
        displays {
          id
          book {
            id
            title
            thumbnail
          }
        }
      }
      displays {
        id
        book {
          id
          title
          thumbnail
        }
        shelves {
          id
          name
        }
      }
      bookComments {
        id
        user {
          id
          username
          profilePhoto
        }
        book {
          id
          thumbnail
        }
        text
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
        id
        age
        gender
        bio
        interests
        favoriteBook
      }
      shelves {
        id
        name
        displays {
          id
          book {
            id
            title
            thumbnail
          }
        }
      }
      displays {
        id
        book {
          id
          title
          thumbnail
        }
        shelves {
          id
          name
        }
      }
      bookComments {
        id
        user {
          id
          username
          profilePhoto
        }
        book {
          id
          thumbnail
        }
        text
      }
    }
  }
`;

/**
 * * 아이디로 유저 불러오기
 */
export const GET_USER_WITH_ID = gql`
  query getUserWithId($userId: ID!) {
    getUserWithId(userId: $userId) {
      id
      email
      username
      profilePhoto
      bookAvgRating
      isAdmin
      likeQuotes {
        id
        likesCount
        term
        author {
          id
          photo
          name
        }
        tags {
          id
          term
        }
      }
      profile {
        id
        age
        gender
        bio
        interests
        favoriteBook
      }
      shelves {
        id
        name
        displays {
          id
          book {
            id
            title
            thumbnail
          }
        }
      }
      displays {
        id
        book {
          id
          title
          thumbnail
        }
      }
      bookComments {
        id
        user {
          id
          username
          profilePhoto
        }
        book {
          id
          thumbnail
        }
        text
      }
    }
  }
`;

/**
 * * 프로필 사진 변경
 */
export const CHANGE_PROFILE_PHOTO = gql`
  mutation chageProfilePhoto($url: String!) {
    chageProfilePhoto(url: $url) {
      id
      profilePhoto
    }
  }
`;

export default { GET_LOGGED_USER, GET_CACHE_USER, GET_USER_WITH_ID };
