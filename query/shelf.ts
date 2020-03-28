import { gql } from "apollo-boost";

export const ADD_SHELF = gql`
  mutation createShelf($name: String!) {
    createShelf(addShelfName: $name) {
      addShelfName
    }
  }
`;

export default ADD_SHELF;
