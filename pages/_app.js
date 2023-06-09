// import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import '../public/css/style.css'


export default function App({ Component, pageProps: { session, ...pageProps }, }) {
  console.log(session);
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
