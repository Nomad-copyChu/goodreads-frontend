import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { ADD_QUOTE } from "../query/quote";

export default () => {
  const [term, setTerm] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [likeCount, setLikeCount] = useState(0);

  const router = useRouter();

  const [addQuoteMutation, { error: addQuoteMutationError }] = useMutation(ADD_QUOTE, {
    variables: {
      term,
      tags: tags.map((term: string) => ({
        term
      })),
      authorName
    },
    onCompleted: () => {
      router.push("/add/quote");
    }
  });
  return {
    term,
    authorName,
    tags,
    likeCount,
    setTerm,
    setAuthorName,
    setTags,
    setLikeCount,
    addQuoteMutation,
    addQuoteMutationError
  };
};
