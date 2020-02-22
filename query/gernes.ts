import { gql } from "apollo-boost";

const GET_GERNES = gql`
  query getGernes {
    getGernes {
      id
      term
      booksCount
    }
  }
`;

export default GET_GERNES;
