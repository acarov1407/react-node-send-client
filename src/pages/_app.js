import '@/styles/globals.css'
import { AuthProvider } from "@/context/auth/AuthProvider"
import { AppProvider } from "@/context/app/AppProvider"

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  )
}
