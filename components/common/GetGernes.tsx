import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import GET_GERNES from "../../query/gernes";

const Container = styled.div``;

const GetGernes: React.FC = () => {
  const { data } = useQuery(GET_GERNES);
  return <Container>{data?.GetGernes.term}</Container>;
};

export default GetGernes;
