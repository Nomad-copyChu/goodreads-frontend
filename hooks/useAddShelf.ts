import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_SHELF } from "../query/shelf";

export default () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const [AddShelfMutation, { error: AddShelfMutationError }] = useMutation(ADD_SHELF, {
    variables: {
      name
    },
    onCompleted: () => {
      alert("선반이 추가되었습니다.");
      router.reload();
    }
  });
  return {
    name,
    setName,
    AddShelfMutation,
    AddShelfMutationError
  };
};
