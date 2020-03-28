import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_SHELF } from "../query/shelf";

export default () => {
  const [addedShelfName, setAddedShelfName] = useState([]);
  const [name, setName] = useState("");
  const [AddShelfMutation, { error: AddShelfMutationError }] = useMutation(ADD_SHELF, {
    variables: {
      name
    },
    onCompleted: async data => {
      alert("선반이 추가되었습니다.");
      await setAddedShelfName([...addedShelfName, data?.createShelf]);
    }
  });
  return {
    addedShelfName,
    setAddedShelfName,
    setName,
    name,
    AddShelfMutation,
    AddShelfMutationError
  };
};
