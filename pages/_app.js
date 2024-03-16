import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import { RecoilRoot } from "recoil"
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>Guessify</title>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
    </Head>
    <SessionProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
    </>
  )
}

export default MyApp
