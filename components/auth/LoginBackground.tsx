import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  @media (max-height: 795px) {
    height: 100vmin;
  }
  .login-background {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .text {
    margin-top: 80px;
    margin-left: 80px;
    position: absolute;
    font-family: Hoefler Text;
    font-style: normal;
    font-weight: bold;
    font-size: 60px;
    z-index: 4;
    /* @media (max-height: 795px) {
      font-size: 24px;
      margin-top: 10px;
      margin-left: 100px;
    } */
    p {
      color: white;
      margin-bottom: 18px;
      /* @media (max-height: 795px) {
        margin-bottom: 0px;
      } */
    }
  }
`;
const LoginBackground: React.FC = () => {
  return (
    <Container>
      <div className="text">
        <p>Meet you next </p>
        <p>favorite book</p>
      </div>
      <img className="login-background" src="https://media.giphy.com/media/EycxafzdmLq4o/giphy.gif" alt="" />
    </Container>
  );
};

export default LoginBackground;
