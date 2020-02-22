import { gql } from "apollo-boost";

const ADD_BOOK = gql`
  mutation addBook($bookInfos: AddBookInfos, $authors: [addBookAuthorInfos]) {
    addBook(bookInfos: $bookInfos, authors: $authors) {
      id
    }
  }
`;
export default ADD_BOOK;
