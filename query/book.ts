import { gql } from "apollo-boost";

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $authors: [String!]!
    $gernes: [String]
    $thumbnail: String!
    $contents: String!
    $datetime: String
    $isbn: String!
    $price: Int
    $publisher: String
    $saleStatus: String
  ) {
    addBook(
      title: $title
      authors: $authors
      gernes: $gernes
      thumbnail: $thumbnail
      contents: $contents
      datetime: $datetime
      isbn: $isbn
      price: $price
      publisher: $publisher
      saleStatus: $saleStatus
    ) {
      id
    }
  }
`;
export default ADD_BOOK;
