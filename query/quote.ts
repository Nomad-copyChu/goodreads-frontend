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

export const ADD_QUOTE = gql`
  mutation addQuote($term: String!, $tags: [String], $authorName: String!) {
    addQuote(term: $term, tags: $tags, authorName: $authorName) {
      term
      author {
        name
      }
      tags {
        term
      }
    }
  }
`;

export default GET_QUOTES;
