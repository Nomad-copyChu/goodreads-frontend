import React from "react";
import styled from "styled-components";
import SearchInput from "./SearchInput";
import responsive from "../../style/responsive";

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
  .main-search-wrapper {
    position: absolute;
    align-self: center;
    z-index: 9;
    @media (max-width: ${responsive.medium}) {
      top: 145px;
    }
  }
  .main-search {
    width: 407px;
    margin: 0 auto;
    @media (max-width: 1434px) {
      width: 307px;
    }
    @media (max-width: 376px) {
      width: 257px;
    }
  }
  .banner-text {
    position: absolute;
    font-family: Hoefler Text;
    text-align: center;
    line-height: 1.2;
    z-index: 9;
    font-size: 50px;
    top: 60px;
    left: 100px;

    @media (max-width: 1270px) {
      top: 60px;
      left: 50px;
    }
    @media (max-width: ${responsive.medium}) {
      font-size: 40px;
      top: 30px;
      margin: auto;
      left: auto;
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
      <div className="main-search-wrapper">
        <div className="main-search">
          <SearchInput placeholder="궁금한 책을 검색하세요." />
        </div>
      </div>
    </Container>
  );
};

export default Banner;
