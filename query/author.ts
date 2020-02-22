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
  query getAuthor($name: String) {
    getAuthor(name: $name) {
      id
      name
      photo
      description
      books {
        id
        title
        thumbnail
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
      }
      description
      books {
        id
      }
      quotes {
        id
      }
    }
  }
`;

export default GET_AUTHORS;
