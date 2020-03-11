import { useMutation } from "@apollo/react-hooks";
import { Shelf, Comment } from "../types";
import { COMMENT_BOOK } from "../query/comment";

export default () => {
  /**
   * * 선반 이름 배열 생성
   */
  const getShelvesName = (shelves: Shelf) => {
    switch (shelves.name) {
      case "want":
        return { value: "want", label: "원해요" };
      case "reading":
        return { value: "reading", label: "읽는중" };
      case "read":
        return { value: "read", label: "읽음" };
      default:
        return { value: shelves.name, label: shelves.name };
    }
  };

  /**
   * * 책 댓글달기
   */
  interface addCommentArguments {
    bookId: string;
    text: string;
  }

  const [addCommentMutation] = useMutation<{ commentBook: Comment }>(COMMENT_BOOK);

  return { getShelvesName, addCommentMutation };
};
