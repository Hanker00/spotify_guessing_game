import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import { RecoilRoot } from "recoil"

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
