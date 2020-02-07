import reset from "styled-reset";
import { css, createGlobalStyle } from "styled-components";

const GlobalCss = css`
  * {
    box-sizing: border-box;
    color: #333333;
  }
  body {
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

const GlobalStyles = createGlobalStyle`
    ${reset};
`;

export default GlobalStyles;
