import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_CACHE_USER } from "../query/user";
import { ADD_TO_SHELF } from "../query/book";
import { CacheUser } from "../types";
import { RATE_BOOK } from "../query/rating";

export default () => {
  const { data } = useQuery<{ user: CacheUser }>(GET_CACHE_USER);

  /**
   * * 선반에 책 추가하기
   */
  const [addToShelfMutation] = useMutation(ADD_TO_SHELF);

  /**
   * * 책 평가하기
   */
  const [rateBookMutation] = useMutation(RATE_BOOK);
  return { user: data?.user, isLogged: !!data?.user, addToShelfMutation, rateBookMutation };
};
