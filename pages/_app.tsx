import '../styles/globals.css'
import 'react-quill/dist/quill.snow.css'
import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'
//pd1
function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    <ChakraProvider>
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

