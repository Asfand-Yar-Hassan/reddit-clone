import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import {theme} from '../chakra/theme'

function App({Component, pageProps}: AppProps) {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider theme = {theme}>
      <Component {...pageProps}/>
    </ChakraProvider>
  )
}
export default App
