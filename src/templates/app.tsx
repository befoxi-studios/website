import './styles/fonts.css'
import { useEffect } from 'preact/hooks'
import { Router, Route, LocationProvider, ErrorBoundary, lazy } from 'preact-iso'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import '../utils/import-all-dayjs-locales'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

import Home from '../routes/home'
const AboutUs = lazy(() => import('../routes/about-us'))
const Contact = lazy(() => import('../routes/contact'))
const Roadmap = lazy(() => import('../routes/roadmap'))
const Blog = lazy(() => import('../routes/blog'))
const NotFound = lazy(() => import('../routes/_404'))

export function App() {
  useEffect(() => {
    globalThis.dayjs = dayjs
  }, [])

  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route path='/' component={Home} />
          <Route path='/home' component={Home} />
          <Route path='/about-us' component={AboutUs} />
          <Route path='/contact' component={Contact} />
          <Route path='/roadmap' component={Roadmap} />
          <Route path='/blog' component={Blog} />
          <Route path='/blog/:post' component={Blog} />
          <Route path='/*' component={NotFound} />
          <Route default component={NotFound} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  )
}
