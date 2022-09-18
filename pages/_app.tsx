import '../styles/globals.css'
import 'react-quill/dist/quill.snow.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { ChakraProvider } from '@chakra-ui/react'
//pd1
function MyApp({ Component, pageProps }: AppProps) {
  const LogRocket = require('logrocket');
  const setupLogRocketReact = require('logrocket-react');

  if (typeof window !== 'undefined') {
    LogRocket.init('qcrbh7/personalwebsite-o3z4s');
    setupLogRocketReact(LogRocket);
  }

  return (    
    <ChakraProvider>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENTID}}`}></Script>
      <Script id="google-analytics" strategy="lazyOnload">
      {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENTID}', {
              page_path: window.location.pathname,
            });
                `}
      </Script>

      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

