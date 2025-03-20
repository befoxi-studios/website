import { Router, Route, LocationProvider, ErrorBoundary, lazy } from 'preact-iso'

import Home from '../routes/home'
const Blog = lazy(() => import('../routes/blog'))
const NotFound = lazy(() => import('../routes/_404'))

export function App() {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route path='/' component={Home} />
          <Route path='/blog' component={Blog} />
          <Route path='/blog/:post' component={Blog} />
          <Route default component={NotFound} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  )
}
