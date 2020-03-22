import React from "react";
import styled from "styled-components";
import SearchInput from "./SearchInput";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  position: relative;
  .overlay {
    width: 100%;
    position: absolute;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.35);
  }
  .background {
    height: 235px;
    width: 100%;
  }
  .Content {
    position: absolute;
    top: 70px;
    z-index: 10;
  }
  .main-search-wrapper {
    width: 407px;
    margin: 0 auto;
    @media (max-width: 440px) {
      width: calc(100% - 40px);
    }
  }
  .banner-text {
    position: absolute;
    font-family: Hoefler Text;
    top: 60px;
    left: 90px;
    font-size: 50px;
    line-height: 1.2;
    z-index: 9;
    @media (max-width: 1024px) {
      top: 108px;
      left: 30px;
    }
    @media (max-width: 440px) {
      font-size: 32px;
    }
    p {
      color: white;
    }
  }
`;

const Banner: React.FC = () => {
  return (
    <Container>
      <div className="overlay" />
      <img className="background" src="/static/gif/main-banner-background.gif" alt="" />
      <div className="banner-text">
        <p>Meet you next</p>
        <p>favorite book</p>
      </div>
      <div className="Content">
        <div className="main-search-wrapper">
          <SearchInput placeholder="궁금한 책을 검색하세요." />
        </div>
      </div>
    </Container>
  );
};

export default Banner;
