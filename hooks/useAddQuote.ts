import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_QUOTE } from "../query/quote";

export default () => {
  const [term, setTerm] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [addedQuote, setAddedQuote] = useState([]);

  const [addQuoteMutation, { error: addQuoteMutationError }] = useMutation(ADD_QUOTE, {
    variables: {
      term,
      authorName,
      tags
    },
    onCompleted: data => {
      setAddedQuote([...addedQuote, data?.addQuote]);
      setTags([]);
      alert("명언이 추가되었습니다.");
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
    setTerm,
    setAuthorName,
    setTags,
    addQuoteMutation,
    addQuoteMutationError,
    addTags,
    tagInput,
    setTagInput,
    addedQuote
  };
};
