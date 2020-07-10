import React from 'react'
import { useBlogData, registerPageType } from '../PageDispatcher'

function DebugPage() {
  const data = useBlogData()

  return (
    <div>
      {'BlogData: ' + JSON.stringify(data)}
    </div>
  )
}

registerPageType({
  type: 'fallback',
  component: DebugPage
})