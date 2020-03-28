import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_SHELF } from "../query/shelf";

export default () => {
  const [addedShelfName, setAddedShelfName] = useState([]);
  const [addShelfName, setAddShelfName] = useState("");
  const [AddShelfMutation, { error: AddShelfMutationError }] = useMutation(ADD_SHELF, {
    variables: {
      addShelfName
    },
    onCompleted: data => {
      setAddedShelfName([...addedShelfName, data?.addShelfName]);
      alert("선반이 추가되었습니다.");
    }
  });
  return {
    addedShelfName,
    setAddedShelfName,
    addShelfName,
    setAddShelfName,
    AddShelfMutation,
    AddShelfMutationError
  };
};
