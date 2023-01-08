import '../styles/global.css'
import type { AppProps } from 'next/app'
import { AuthProvider, ProtectRoute } from '../context/AuthContext'
import { usePathname } from 'next/navigation'
import { checkIsPublicRoute } from '../functions/check-is-public-route'
import { PrivateRoute } from '../components/PrivateRoute'


export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname()
  const isPublicPage = checkIsPublicRoute(pathname!)

  return (
    <AuthProvider>
      <ProtectRoute>
        {isPublicPage && <Component {...pageProps} />}
        {!isPublicPage && <PrivateRoute><Component {...pageProps} /></PrivateRoute>}
      </ProtectRoute>
    </AuthProvider>
  )
}