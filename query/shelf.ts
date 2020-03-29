import { gql } from "apollo-boost";

export const ADD_SHELF = gql`
  mutation createShelf($name: String!) {
    createShelf(name: $name) {
      id
      name
    }
  }
`;

export const GET_SHELF = gql`
  query getShelves {
    getShelves {
      id
      name
      displays {
        id
        book {
          id
          title
        }
      }
    }
  }
`;

export default { ADD_SHELF, GET_SHELF };
