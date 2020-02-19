import React from "react";
import styled from "styled-components";
import SearchInput from "./SearchInput";

const Container = styled.div`
  display: flex;
  .background {
    width: 100%;
    height: 235px;
    z-index: 0;
  }
  .search {
    z-index: 1;
    position: absolute;
    width: 407px;
    height: 32px;
    margin-top: 62px;
    margin-left: 593px;
  }
  .bannerText {
    position: absolute;
    font-size: 50px;
    margin-top: 62px;
    margin-left: 90px;
    z-index: 3;
    p {
      color: white;
      margin-bottom: 10px;
    }
  }
`;

const Banner: React.FC = () => {
  return (
    <Container>
      <img
        className="background"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTEXOq1t-AE6-FeMfma4C4ns2wXwY2DaDfF-G1pSltKGI03dwQU"
        alt=""
      />
      <div className="bannerText">
        <p>Meet you next</p>
        <p>favorite book</p>
      </div>
      <div className="search">
        <SearchInput placeholder="궁금한 책을 검색하세요." />
      </div>
    </Container>
  );
};

export default Banner;
