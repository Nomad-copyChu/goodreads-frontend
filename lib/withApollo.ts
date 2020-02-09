import withApollo from "next-with-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";

export default withApollo(({ initialState }) => {
  //apollo cache 가져오기
  const cache = new InMemoryCache().restore(initialState || {});
  return new ApolloClient({
    link: createUploadLink({
      uri: "http://localhost:4000/"
    }),
    cache,
    ssrMode: typeof window !== "undefined",
    resolvers: {}
  });
});
