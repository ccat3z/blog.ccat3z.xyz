import React from 'react'
import { registerPageType } from '@/PageDispatcher'
import { useBlogData } from '@/BlogData'
import Raw from '@/components/RawElement'

function DebugPage() {
  const data = useBlogData()

  return (
    <div>
      {'BlogData: ' + JSON.stringify(data)}
      {data.content && <Raw element={data.content} />}
    </div>
  )
}

registerPageType({
  type: 'fallback',
  component: DebugPage
})