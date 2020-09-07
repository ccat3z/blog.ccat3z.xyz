import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import './App.scss';

import PageDispatcher from './PageDispatcher'
import BlogData from './BlogData'
import Root from './components/Root'

import './pages/Splash'
import './pages/Home'
import './pages/PostsList'
import './pages/Message'
import './pages/Post'

if (process.env.NODE_ENV === 'development') {
  require("./pages/Debug")
} else {
  require("./pages/WIP")
}

function App() {
  return (
    <Router>
      <BlogData>
        <Root>
          <PageDispatcher />
        </Root>
      </BlogData>
    </Router>
  )
}

export default App
