import React from 'react'
import { registerPageType } from '../PageDispatcher'

function WIPPage() {
  return <div>WIP</div>
}

registerPageType({
  type: 'fallback',
  component: WIPPage
})
