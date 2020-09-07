import React, { useMemo } from 'react'
import { useBlogData } from '@/BlogData'
import { registerPageType } from '@/PageDispatcher'
import Raw from '@/components/RawElement'

function HomePage() {
  const data = useBlogData()
  const content = useMemo(() => {
    let m = data.content?.querySelector('.message')
    return m
  }, [data.content])

  return <>
    {content && <Raw element={content} />}
  </>
}

registerPageType({
  type: 'home',
  component: HomePage
})