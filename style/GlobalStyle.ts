import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import colors from "./colors";

const GlobalStyles = createGlobalStyle`
    ${reset};
    * {
    box-sizing: border-box;
    color: #333333;
  }
  a{
    line-height: 1.5;
    color:${colors.blue_green};
    text-decoration:none;

    &:hover{
      text-decoration:underline;
    }
  }
  
  @font-face {
    font-style: normal;
    font-family: "Noto Sans KR";
    font-weight: normal;
    font-display: auto;
    src: url("/fonts/NotoSansKR-Regular-Alphabetic.woff2") format("woff2");
  }
  @font-face {
    font-style: normal;
    font-family: "Noto Sans KR";
    font-weight: 700;
    font-display: auto;
    src: url("/fonts/NotoSansKR-Bold-Alphabetic.woff2") format("woff2");
  }
  body {
    line-height: 1.4;
    background-color:${colors.beige_400};
    font-family: Noto Sans Kr;
    height: 100vh;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default GlobalStyles;
