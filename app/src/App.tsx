import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import PageDispatcher from './PageDispatcher'
import './pages/Splash'
import Root from './components/Root'

if (process.env.NODE_ENV === 'development') {
  require("./pages/Debug")
} else {
  require("./pages/WIP")
}

function App() {
  return (
    <Router>
      <Root>
        <PageDispatcher />
      </Root>
    </Router>
  )
}

export default App
