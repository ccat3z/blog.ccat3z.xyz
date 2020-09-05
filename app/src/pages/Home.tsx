import React, { useMemo } from 'react'
import { useBlogData } from '@/BlogData'
import { registerPageType } from '@/PageDispatcher'

function HomePage() {
  const data = useBlogData()
  const content = useMemo(() => {
    let m = data.content?.querySelector('.message')
    return m
  }, [data.content])

  return (
    <div dangerouslySetInnerHTML={{ __html: content?.outerHTML || '' }}>
    </div>
  )
}

registerPageType({
  type: 'home',
  component: HomePage
})