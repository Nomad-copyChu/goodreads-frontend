import { gql } from "apollo-boost";

export const GET_QUOTES = gql`
  query getQuotes {
    getQuotes {
      id
      term
      author {
        id
        name
        photo
      }
      tags {
        id
        term
      }
    }
  }
`;

export default GET_QUOTES;
