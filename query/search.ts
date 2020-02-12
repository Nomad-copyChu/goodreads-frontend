import { gql } from "apollo-boost";

const SEARCH = gql`
  query search($keyword: String!) {
    search(keyword: $keyword) {
      ... on Book {
        title
        authors {
          name
        }
        thumbnail
        gernes {
          term
        }
      }
      ... on Author {
        name
        photo
        gernes {
          term
        }
      }
      ... on User {
        username
        profilePhoto
      }
    }
  }
`;
export default SEARCH;
