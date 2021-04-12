import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

import { GA_ID } from '../lib/gtag'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang="en" prefix="og: https://ogp.me/ns/profile#">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:title" content="ryu236.com" />
          <meta property="og:type" content="profile" />
          <meta property="og:url" content="https://www.ryu236.com/" />
          <meta property="og:image" content="/icon.png" />
          <meta property="profile:username" content="Ryu236" />
          {/* Google Analytics */}
          <script
            async={true}
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
