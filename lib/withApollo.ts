import withApollo from "next-with-apollo";
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";

import introspectionQueryResultData from "./fragmentTypes.json";

export default withApollo(({ initialState }) => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  });
  //apollo cache 가져오기
  const cache = new InMemoryCache({ fragmentMatcher }).restore(initialState || {});
  return new ApolloClient({
    link: createUploadLink({
      uri: "http://localhost:4000/"
    }),
    cache,
    ssrMode: typeof window !== "undefined",
    resolvers: {}
  });
});
