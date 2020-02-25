import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_CACHE_USER, ADD_TO_SHELF } from "../query/user";
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
  const [rateBook] = useMutation(RATE_BOOK);

  return { user: data?.user, isLogged: !!data?.user, addToShelfMutation, rateBook };
};
