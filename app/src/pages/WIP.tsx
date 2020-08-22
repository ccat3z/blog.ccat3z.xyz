import React from 'react'
import { registerPageType } from '../PageDispatcher'

function WIPPage() {
  const oldVersionUrl = `${window.location.origin}${window.location.pathname}?archive`
  if (oldVersionUrl !== window.location.href) {
    window.location.href = oldVersionUrl
  }
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
