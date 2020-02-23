import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_CACHE_USER, ADD_TO_SHELF } from "../query/user";
import { CacheUser } from "../types";

export default () => {
  const { data } = useQuery<{ user: CacheUser }>(GET_CACHE_USER);

  const [addToShelfMutation] = useMutation(ADD_TO_SHELF);

  return { user: data?.user, isLogged: !!data?.user, addToShelfMutation };
};
