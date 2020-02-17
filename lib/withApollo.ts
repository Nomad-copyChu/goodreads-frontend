import withApollo from "next-with-apollo";
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import cookie from "js-cookie";
import introspectionQueryResultData from "./fragmentTypes.json";

export default withApollo(ctx => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  });
  //apollo cache 가져오기
  const cache = new InMemoryCache({ fragmentMatcher }).restore(ctx.initialState || {});
  const serverCookie = ctx?.headers?.cookie;
  const browserCookie = cookie.get("Authorization");
  return new ApolloClient({
    link: createUploadLink({
      uri: "http://localhost:4000/",
      headers: {
        Authorization: serverCookie?.replace("Authorization=", "") || browserCookie
      }
    }),
    cache,
    resolvers: {}
  });
});
