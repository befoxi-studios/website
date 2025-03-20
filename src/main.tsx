/** Import a global stylesheet with tailwindcss settings included. */
import './index.css'

import { render } from 'preact'
import { App } from './templates/app.tsx'

render(<App />, document.getElementById('app')!)
