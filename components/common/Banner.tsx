import React, { useState } from "react";
import styled from "styled-components";
import SearchInput from "./SearchInput";

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  .background {
    height: 235px;
    width: 100%;
    z-index: 0;
  }
  .Content {
    position: absolute;
    display: flex;
    @media (max-width: 700px) {
      display: block;
    }
  }
  .search {
    flex: 3 0 0;
    align-self: stretch;
    z-index: 2;
    width: 472px;
    height: 32px;
    margin: 0 auto;
    @media (max-width: 700px) {
      width: 300px;
    }
  }
  .bannerText {
    flex: 3 0 0;
    margin-right: 10px;
    width: 100%;
    font-size: 50px;
    z-index: 3;
    p {
      color: white;
      margin-bottom: 10px;
    }
    @media (max-width: 700px) {
      font-size: 30px;
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
      <div className="Content">
        <div className="bannerText">
          <p>Meet you next</p>
          <p>favorite book</p>
        </div>
        <div className="search">
          <SearchInput placeholder="궁금한 책을 검색하세요." />
        </div>
      </div>
    </Container>
  );
};

export default Banner;
