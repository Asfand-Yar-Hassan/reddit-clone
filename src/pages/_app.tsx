import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import {theme} from '../chakra/theme'
import Layout from '../components/Layout/layout'
import { RecoilRoot } from 'recoil'
import { SpeedInsights } from '@vercel/speed-insights/next'

function App({Component, pageProps}: AppProps) {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
      <SpeedInsights/>
    </RecoilRoot>
  )
}
export default App
