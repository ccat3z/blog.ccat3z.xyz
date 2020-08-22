import React from 'react'
import { registerPageType } from '../PageDispatcher'

function WIPPage() {
  const oldVersionUrl = `https://b.ccat3z.xyz${window.location.pathname}`
  window.location.href = oldVersionUrl
  return (
    <div>
      {'[WIP] '}
      <a href={oldVersionUrl}>Redirecting to old version...</a>
    </div>
  )
}

registerPageType({
  type: 'fallback',
  component: WIPPage
})
