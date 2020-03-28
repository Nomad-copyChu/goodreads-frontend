import React from "react";
import styled from "styled-components";
import { NextPage } from "next";
import { ApolloNextPageContext, Gerne } from "../../types";
import { GET_GERNE_ITEMS } from "../../query/gernes";
import GerneItems from "../../components/gerne/GerneItems";

interface IProps {
  gerne: Gerne;
}

const term: NextPage<IProps> = ({ gerne }) => {
  return <GerneItems gerne={gerne} />;
};

term.getInitialProps = async ({ query, apolloClient }: ApolloNextPageContext) => {
  const { term } = query;
  const { data } = await apolloClient.query({ query: GET_GERNE_ITEMS, variables: { term } });
  return { gerne: data?.getGerneItems };
};

export default term;
