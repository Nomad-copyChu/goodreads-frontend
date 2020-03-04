import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import App, { AppContext, AppInitialProps } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import nextCookie from "next-cookies";
import withApollo from "../lib/withApollo";
import GlobalStyles from "../style/GlobalStyle";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GET_USER, GET_CACHE_USER } from "../query/user";

interface IProps {
  apolloState: any;
  apollo: ApolloClient<NormalizedCacheObject>;
  cookies: any;
  userprops: any;
}

class MyApp extends App<IProps> {
  static getInitialProps = async (
    appContext: AppContext & { ctx: { apolloClient: ApolloClient<NormalizedCacheObject> } }
  ) => {
    const { ctx } = appContext;
    //쿠키 받아오기
    const cookies = ctx && ctx.req && nextCookie(ctx);
    let userprops = null;
    const { data } = await ctx.apolloClient.query({
      query: GET_CACHE_USER
    });
    if (!data && cookies) {
      try {
        const { data } = await ctx.apolloClient.query({
          query: GET_USER,
          variables: { id: cookies?.Authorization }
        });
        userprops = data?.getUser;
      } catch (e) {
        console.log(e.message);
      }
    }
    const appInitialProps: AppInitialProps = await App.getInitialProps(appContext);
    return { ...appInitialProps, userprops };
  };

  render() {
    const { Component, pageProps, apollo, userprops } = this.props;
    if (userprops) {
      apollo.writeData({
        data: {
          user: userprops
        }
      });
    }

    return (
      <>
        <GlobalStyles />
        <ApolloProvider client={apollo}>
          <>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </>
        </ApolloProvider>
      </>
    );
  }
}

export default withApollo(MyApp);
