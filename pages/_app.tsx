import React from "react";
import App, { AppContext, AppInitialProps } from "next/app";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import nextCookie from "next-cookies";
import withApollo from "../lib/withApollo";
import GlobalStyles from "../style/GlobalStyle";

interface IProps {
  apolloState: any;
  apollo: ApolloClient<NormalizedCacheObject>;
}

class MyApp extends App<IProps> {
  static getInitialProps = async (appContext: AppContext & { ctx: { apolloClient: any } }) => {
    const { ctx } = appContext;
    //쿠키 받아오기
    const cookies = ctx && ctx.req && nextCookie(ctx);
    //props로 cookie전달
    const appInitialProps: AppInitialProps = await App.getInitialProps(appContext);
    Object.assign(appInitialProps, { cookies });
    return { ...appInitialProps };
  };

  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <>
        <GlobalStyles />
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </>
    );
  }
}

export default withApollo(MyApp);
