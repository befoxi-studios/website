import '@/styles/fonts.css'
import { useEffect } from 'preact/hooks'
import { Router, Route, LocationProvider, ErrorBoundary, lazy } from 'preact-iso'
import { useGlobal } from '@/hooks/useGlobal'
import { local } from '@/utils/storage'
import { bus } from '@/utils/event-bus'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import '@/utils/import-all-dayjs-locales'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

import Home from '../routes/home'
const Blog = lazy(() => import('../routes/blog'))
const Roadmap = lazy(() => import('../routes/roadmap'))
const NotFound = lazy(() => import('../routes/_404'))

export function App() {
  const { langCode, setLanguageCode } = useGlobal()

  useEffect(() => {
    globalThis.dayjs = dayjs

    if (window && document) {
      const defaultLocale = window.document.documentElement.lang
      const localLocale = local.get('user-locale')
      setLanguageCode(localLocale || defaultLocale)
    }
  }, [])

  useEffect(() => {
    if (window && document) {
      window.document.documentElement.lang = langCode
      local.set('user-locale', langCode)
    }
  }, [langCode])

  useEffect(() => {
    const changeLanguageEvent = bus.onChannel('change-language', setLanguageCode)
    return () => {
      changeLanguageEvent()
    }
  }, [])

  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route path='/' component={Home} />
          <Route path='/home' component={Home} />
          <Route path='/blog' component={Blog} />
          <Route path='/blog/:post' component={Blog} />
          <Route path='/roadmap' component={Roadmap} />
          <Route default component={NotFound} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  )
}
