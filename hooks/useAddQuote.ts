import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { ADD_QUOTE } from "../query/quote";

export default () => {
  const [term, setTerm] = useState("");
  const [name, setName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [likeCount, setLikeCount] = useState(0);

  const router = useRouter();

  const [addQuoteMutation, { error: addQuoteMutationError }] = useMutation(ADD_QUOTE, {
    variables: {
      term,
      author: {
        name
      },
      tags: tags.map((term: string) => ({
        term
      }))
    },
    onCompleted: () => {
      router.push("/add/quote");
    }
  });
  return {
    term,
    name,
    tags,
    likeCount,
    setTerm,
    setName,
    setTags,
    setLikeCount,
    addQuoteMutation,
    addQuoteMutationError
  };
};
