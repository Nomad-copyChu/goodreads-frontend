import { gql } from "apollo-boost";

const GET_GERNES = gql`
  query getGernes {
    getGernes {
      id
      term
      books {
        id
        title
      }
      authors {
        id
        name
      }
    }
  }
`;

export default GET_GERNES;
