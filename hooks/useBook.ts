import { Shelf } from "../types";

export default () => {
  /**
   * * 선반 이름 배열 생성
   */
  const getShelvesName = (shelves: Shelf[]) =>
    shelves.map(shelf => {
      switch (shelf.name) {
        case "want":
          return { value: "want", label: "원해요" };
        case "reading":
          return { value: "reading", label: "읽는중" };
        case "read":
          return { value: "read", label: "읽음" };
        default:
          return { value: shelf.name, label: shelf.name };
      }
    });

  return { getShelvesName };
};
