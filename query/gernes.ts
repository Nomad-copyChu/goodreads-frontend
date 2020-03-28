import { gql } from "apollo-boost";

const GET_GERNES = gql`
  query getGernes {
    getGernes {
      id
      term
      booksCount
      books {
        id
        title
        thumbnail
      }
      authors {
        id
        name
        photo
      }
    }
  }
`;

export default GET_GERNES;
