import React from "react";
import styled from "styled-components";
import SearchInput from "./common/SearchInput";
import SearchKakaoInput from "./common/SearchKakaoInput";

const Container = styled.div`
  .search-input-wrapper {
    width: 385px;
    margin: 20px auto;
  }
`;

const AddBook: React.FC = () => {
  return (
    <Container>
      <div className="search-input-wrapper">
        <SearchInput
          placeholder="추가할 책을 검색하세요"
          onClick={result => {
            console.log(result);
          }}
        />
        <SearchKakaoInput onClick={selected => console.log(selected)} />
      </div>
    </Container>
  );
};

export default AddBook;
