import { useMutation } from "@apollo/react-hooks";
import { AuthorComment } from "../types";
import { COMMENT_AUTHOR } from "../query/author";

export default () => {
  const [addCommentMutation] = useMutation<{ commentAuthor: AuthorComment }>(COMMENT_AUTHOR);
  return {
    addCommentMutation
  };
};
