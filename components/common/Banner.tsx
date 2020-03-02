import React from "react";
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
    align-items: center;
    @media (max-width: 700px) {
      display: flex;
    }
  }
  .search {
    flex: 3 0 0;
    align-self: center;
    z-index: 2;
    width: 472px;
    height: 32px;
    margin: 0 auto;
    @media (max-width: 700px) {
      z-index: 4;
      width: 300px;
      align-self: center;
    }
  }
  .bannerText {
    flex: 3 0 0;
    width: 100%;
    font-family: Hoefler Text;
    font-size: 50px;
    z-index: 3;
    p {
      color: white;
    }
    @media (max-width: 700px) {
      position: absolute;
      z-index: 1;
      font-size: 30px;
      p {
        margin-bottom: 20px;
        margin-top: 15px;
      }
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
