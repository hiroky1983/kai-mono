import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="ja-JP" dir="ltr">
        <Head>
          {/* windows */}
          <meta
            name="msapplication-square70x70logo"
            content="/site-tile-70x70.png"
          />
          <meta
            name="msapplication-square150x150logo"
            content="/site-tile-150x150.png"
          />
          <meta
            name="msapplication-wide310x150logo"
            content="/site-tile-310x150.png"
          />
          <meta
            name="msapplication-square310x310logo"
            content="/site-tile-310x310.png"
          />
          <meta name="msapplication-TileColor" content="#000" />
          {/* safari */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#000" />
          <meta name="apple-mobile-web-app-title" content="kai-mono" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon-180x180.png"
          />
          {/* 一般 */}
          <meta name="application-name" content="kai-mono" />
          <meta name="theme-color" content="#65D8A5" />
          <meta
            name="description"
            content="買い物リスト共有アプリです。このアプリは『買い物をもっと効率的に』をコンセプトに作成しました。"
          />
          <meta
            name="keywords"
            content="kai-mono,買い物,リスト,共有,アプリ,買い忘れ防止,"
          />
          <link rel="icon" sizes="192x192" href="/icon-192x192.png" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Potta+One&display=swap"
            rel="stylesheet"
          />
          <title>kai-mono</title>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1869410932032409"
            crossOrigin="anonymous"
          ></script>
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
