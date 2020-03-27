import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { ADD_QUOTE } from "../query/quote";

export default () => {
  const [term, setTerm] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [likeCount, setLikeCount] = useState(0);

  const router = useRouter();

  const [addQuoteMutation, { error: addQuoteMutationError }] = useMutation(ADD_QUOTE, {
    variables: {
      term,
      authorName,
      tags
    },
    onCompleted: () => {
      alert("명언이 추가되었습니다.");
      router.push("/add/quote");
    }
  });
  const addTags = e => {
    e.preventDefault();
    setTags(tags => [...tags, tagInput]);
    setTagInput("");
  };
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
    addQuoteMutationError,
    addTags,
    tagInput,
    setTagInput
  };
};
