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
    color:${colors.blue_green};
    text-decoration:none;

    &:hover{
      text-decoration:underline;
    }
  }
  
  @font-face {
  font-style: normal;
  font-family: Noto Sans KR;
  font-weight: normal;
  font-display: optional;
  src: url('/fonts/NotoSansCJKkr-Regular-Alphabetic.woff2') format("woff2");
  /* 한글 */
  unicode-range:U+0020-U+007E,U+1100-U+11F9,U+3000-U+303F,U+3131-U+318E,U+327F-U+327F,U+AC00-U+D7A3,U+FF01-U+FF60;
}
@font-face {
  font-style: normal;
  font-family: Noto Sans KR;
  font-weight: bold;
  font-display: optional;
  src: url('/fonts/NotoSansCJKkr-Bold-Alphabetic.woff2') format("woff2");
  /* 한글 */
  unicode-range:U+0020-U+007E,U+1100-U+11F9,U+3000-U+303F,U+3131-U+318E,U+327F-U+327F,U+AC00-U+D7A3,U+FF01-U+FF60;
}

@font-face {
  font-style: normal;
  font-family: Noto Sans;
  font-weight: normal;
  font-display: optional;
  src: url('/fonts/NotoSans-Regular.woff2') format("woff2");
  /* 영문,숫자 */
  unicode-range: U+0020-U+002F,U+0030-U+0039,U+003A-U+0040,U+0041-U+005A,U+005B-U+0060,U+0061-U+007A,U+007B-U+007E;
}
@font-face {
  font-style: normal;
  font-family: Noto Sans;
  font-weight: bold;
  font-display: optional;
  src: url('/fonts/NotoSans-Bold.woff2') format("woff2");
  /* 영문,숫자 */
  unicode-range: U+0020-U+002F,U+0030-U+0039,U+003A-U+0040,U+0041-U+005A,U+005B-U+0060,U+0061-U+007A,U+007B-U+007E;
}
  body {
    font-family: Noto Sans CJK KR,Noto Sans KR;
    background-color:${colors.beige_400};
    height: 100vh;
    line-height:1.4;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default GlobalStyles;
