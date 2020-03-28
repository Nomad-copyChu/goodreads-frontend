import { gql } from "apollo-boost";

const SEARCH = gql`
  query search($keyword: String!) {
    search(keyword: $keyword) {
      ... on Book {
        id
        title
        authors {
          id
          name
        }
        thumbnail
        gernes {
          id
          term
        }
      }
      ... on Author {
        id
        name
        photo
        gernes {
          term
        }
      }
      ... on User {
        id
        username
        profilePhoto
      }
    }
  }
`;
export default SEARCH;
