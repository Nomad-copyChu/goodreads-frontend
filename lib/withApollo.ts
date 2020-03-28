import withApollo from "next-with-apollo";
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import cookie from "js-cookie";
import introspectionQueryResultData from "./fragmentTypes.json";
import { typeDefs, resolvers } from "./localState";

export default withApollo(ctx => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  });
  //apollo cache 가져오기
  const cache = new InMemoryCache({ fragmentMatcher }).restore(ctx.initialState);
  const serverCookie = ctx?.headers?.cookie;
  const cookies: any = {};
  serverCookie?.split(/\s*;\s*/).forEach(pairs => {
    const output = {};
    const pair = pairs.split(/\s*=\s*/);
    output[pair[0]] = pair.splice(1).join("=");
    const json = JSON.stringify(output, null, 4);
    Object.assign(cookies, JSON.parse(json));
  });
  console.log(process.env.NODE_ENV, process.env.END_POINT);
  const browserCookie = cookie.get("Authorization");
  return new ApolloClient({
    link: createUploadLink({
      uri: "http://52.78.34.51:4000/",
      headers: {
        Authorization: cookies?.Authorization || browserCookie
      }
    }),
    cache,
    typeDefs,
    resolvers,
    connectToDevTools: true,
    ssrMode: true
  });
});
