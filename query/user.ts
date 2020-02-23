import { gql } from "apollo-boost";

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

export const SET_USER = gql`
  mutation setUser(
    $id: ID!
    $email: String!
    $username: String!
    $profilePhoto: String!
    $isAdmin: Boolean!
    $shelves: [Shelf]
  ) {
    setUser(id: $id, email: $email, profilePhoto: $profilePhoto, isAdmin: $isAdmin, shelves: $shelves) @client
  }
`;

export default { GET_USER };
