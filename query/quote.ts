import { gql } from "apollo-boost";

export const GET_QUOTES = gql`
  query getQuotes($limit: Int) {
    getQuotes(limit: $limit) {
      id
      term
      likesCount
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
      id
      term
      likesCount
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

export const LIKE_QUOTE = gql`
  mutation likeQuote($quoteId: ID!) {
    likeQuote(quoteId: $quoteId) {
      id
    }
  }
`;

export default { GET_QUOTES, ADD_QUOTE };
