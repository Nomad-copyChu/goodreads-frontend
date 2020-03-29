import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }
  /**
   * If rendering fails for any reason it's a good idea to use try…catch…finally to ensure that the sheet object will always be available for garbage collection. Make sure sheet.seal() is only called after sheet.getStyleTags() or sheet.getStyleElement() have been called otherwise a different error will be thrown.
   */

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta name="description" content="copychu팀의 gooreadsKr 입니다. 자신만의 책들을 찾고 등록해 보세요." />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/png" sizes="192x192" href="/book-cat.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
