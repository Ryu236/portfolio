import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html
        lang="en"
        className="dark"
        prefix="og: https://ogp.me/ns/profile#"
        suppressHydrationWarning
      >
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{if(localStorage.getItem('theme')==='system'){localStorage.setItem('theme','dark')}}catch(e){}})()`,
            }}
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500&display=swap"
            rel="stylesheet"
          />
          <meta property="og:title" content="ryu236.com" />
          <meta property="og:type" content="profile" />
          <meta property="og:url" content="https://www.ryu236.com/" />
          <meta property="og:image" content="/icon.png" />
          <meta property="profile:username" content="Ryu236" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
