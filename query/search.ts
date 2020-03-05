import { gql } from "apollo-boost";

const SEARCH = gql`
  query search($keyword: String!) {
    search(keyword: $keyword) {
      ... on Book {
        id
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
