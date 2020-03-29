import React from "react";
import { NextPage } from "next";
import Head from "next/head";

import { ApolloNextPageContext, Gerne } from "../../types";
import { GET_GERNE_ITEMS } from "../../query/gernes";
import GerneItems from "../../components/gerne/GerneItems";

interface IProps {
  gerne: Gerne;
}

const term: NextPage<IProps> = ({ gerne }) => {
  return (
    <>
      <Head>
        <title>장르 {gerne.term} | 굿리즈</title>
      </Head>
      <GerneItems gerne={gerne} />
    </>
  );
};

term.getInitialProps = async ({ query, apolloClient }: ApolloNextPageContext) => {
  const { term } = query;
  const { data } = await apolloClient.query({ query: GET_GERNE_ITEMS, variables: { term } });
  return { gerne: data?.getGerneItems };
};

export default term;
