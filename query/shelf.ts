import { gql } from "apollo-boost";

export const ADD_SHELF = gql`
  mutation createShelf($name: String!) {
    createShelf(name: $name) {
      name
    }
  }
`;

export default ADD_SHELF;
