import { Shelf } from "../types";

export default () => {
  /**
   * * 선반 이름 배열 생성
   */
  const getShelvesName = (shelves: Shelf[]) =>
    shelves.map(shelf => {
      switch (shelf.name) {
        case "want":
          return "원해요";
        case "reading":
          return "읽는중";
        case "read":
          return "읽음";
        default:
          return shelf.name;
      }
    });
  return { getShelvesName };
};
