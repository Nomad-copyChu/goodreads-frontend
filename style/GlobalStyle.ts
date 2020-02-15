import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import colors from "./colors";

const GlobalStyles = createGlobalStyle`
    ${reset};
    * {
    box-sizing: border-box;
    color: #333333;
    line-height: 1.2;
  }
  a{
    line-height: 1.2;
    color:${colors.blue_green};
    text-decoration:none;

    &:hover{
      text-decoration:underline;
    }
  }
  body {
    background-color:${colors.beige_400};
    ::-webkit-scrollbar {
      display: none;
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
`;

export default GlobalStyles;
