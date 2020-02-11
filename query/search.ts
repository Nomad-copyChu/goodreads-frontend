import { gql } from "apollo-boost";

const SEARCH = gql`
  query search($keyword: String!) {
    search(keyword: $keyword) {
      ... on Book {
        title
      }
      ... on Author {
        name
      }
      ... on User {
        username
      }
    }
  }
`;
export default SEARCH;
