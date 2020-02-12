import React, { useState } from "react";
import { NextPage } from "next";
import { ApolloNextPageContext, Book } from "../types";
import { GET_BOOKS } from "../query";
import SearchInput from "../components/SearchInput";

interface IProps {
  data: Book[];
}

const index: NextPage<IProps> = ({ data }) => {
  const [value, setValue] = useState("");
  return (
    <div>
      <div style={{ width: "64px", height: "64px" }} />
      <h1>hello</h1>
      <div style={{ width: "500px" }}>
        <SearchInput value={value} onChange={e => setValue(e.target.value)} />
      </div>
      <img src="https://media.giphy.com/media/h0cVMLhAiBtug/giphy.gif" alt="" />
    </div>
  );
};

index.getInitialProps = async (ctx: ApolloNextPageContext) => {
  const { apolloClient } = ctx;
  //Posts 불러오기
  const { data }: { data: { getBooks: Book[] } } = await apolloClient.query({
    query: GET_BOOKS,
    fetchPolicy: "network-only"
  });
  return { data: data.getBooks };
};

export default index;
