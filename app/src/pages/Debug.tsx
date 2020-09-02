import React from 'react'
import { useBlogData, registerPageType } from '../PageDispatcher'

function DebugPage() {
  const data = useBlogData()

  return (
    <div>
      {'BlogData: ' + JSON.stringify(data)}
      <div dangerouslySetInnerHTML={{
        __html: data.content?.outerHTML || ''
      }}>
      </div>
    </div>
  )
}

registerPageType({
  type: 'fallback',
  component: DebugPage
})