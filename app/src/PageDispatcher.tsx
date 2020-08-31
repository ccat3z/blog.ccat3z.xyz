import React, { ComponentType, ReactNode } from 'react'
import { useBlogData } from './BlogData'

export { useBlogData }

function DefaultFallbackPage () {
  const { type } = useBlogData()
  return <div>cannot recognize the page type: {type}</div>
}

type PageType = {
  type: string,
  component: ComponentType
}
const pageTypes: PageType[] = []
const fallbackPageType: PageType = {
  type: 'fallback',
  component: DefaultFallbackPage
}
export function registerPageType(page: PageType) {
  if (page.type === 'fallback') {
    fallbackPageType.component = page.component
  } else {
    pageTypes.push(page)
  }
}

export default function PageDispatcher() {
  const blogData = useBlogData()

  let page: ReactNode 
  for (const pt of pageTypes) {
    if (pt.type === blogData.type) {
      page = <pt.component />
      break
    }
  }
  if (page === undefined) {
    page = <fallbackPageType.component />
  }

  return <>{page}</>
}
