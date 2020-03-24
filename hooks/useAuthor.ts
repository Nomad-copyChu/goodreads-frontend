import { useMutation } from "@apollo/react-hooks";
import { AuthorComment, Author } from "../types";
import { COMMENT_AUTHOR, EDIT_AUTHOR } from "../query/author";

export default () => {
  const [addCommentMutation] = useMutation<{ commentAuthor: AuthorComment }>(COMMENT_AUTHOR);

  const [editAuthorMutation] = useMutation<{ addAuthor: Author }>(EDIT_AUTHOR);
  return {
    addCommentMutation,
    editAuthorMutation
  };
};
