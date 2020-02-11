import React, { useState } from "react";
import styled from "styled-components";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import Input from "./Input";
import SEARCH from "../query/search";

const Container = styled.div`
  width: 100%;
`;

const SearchInput: React.FC = () => {
  const [value, setValue] = useState();
  const { data, loading, error } = useQuery(SEARCH, { variables: { keyword: value }, fetchPolicy: "network-only" });
  console.log(data, loading, error);
  return (
    <Container>
      <Input value={value} onChange={e => setValue(e.target.value)} />
    </Container>
  );
};

export default SearchInput;
