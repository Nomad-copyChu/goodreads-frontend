import { gql } from "apollo-boost";

export const GET_AUTHORS_WITH_NAME = gql`
  query getAuthorsWithName($authors: [String!]!) {
    getAuthorsWithName(authors: $authors) {
      name
      description
      photo
    }
  }
`;

export const GET_AUTHOR = gql`
  query getAuthor($id: ID!) {
    getAuthor(id: $id) {
      id
      name
      photo
      description
      books {
        id
        title
        thumbnail
      }
      quotes {
        id
        term
      }
      comments {
        id
        text
        user {
          id
          username
          profilePhoto
        }
      }
    }
  }
`;

export const GET_AUTHORS = gql`
  query getAuthors($gerne: String) {
    getAuthors(gerne: $gerne) {
      id
      name
      photo
      gernes {
        id
        term
      }
      description
      books {
        id
        thumbnail
      }
      quotes {
        id
        term
      }
    }
  }
`;
export const COMMENT_AUTHOR = gql`
  mutation commentAuthor($authorId: ID!, $text: String!) {
    commentAuthor(authorId: $authorId, text: $text) {
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

export default GET_AUTHORS;
