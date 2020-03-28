import React from "react";
import styled from "styled-components";
import SearchInput from "../../../components/common/SearchInput";

const Container = styled.div`
  width: 500px;
  height: 100vh;
  margin: auto;
  margin-top: 200px;
`;

const index: React.FC = () => {
  return (
    <Container>
      <SearchInput placeholder="궁금한 작가,책을 검색해 보세요." />
    </Container>
  );
};

export default index;
