import { gql } from "apollo-boost";

export const GET_AUTHORS = gql`
  query getAuthors($gerne: String) {
    getAuthors(gerne: $gerne) {
      id
      name
      photo
      died
      gernes
      description
      books
      quotes
      createdAt
      updatedAt
    }
  }
`;

export default GET_AUTHORS;
