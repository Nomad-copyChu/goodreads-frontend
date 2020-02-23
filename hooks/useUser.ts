import { useQuery } from "@apollo/react-hooks";
import { GET_CACHE_USER } from "../query/user";

export default () => {
  const { data } = useQuery(GET_CACHE_USER);
  return { user: data?.user, isLogged: !!data?.user };
};
