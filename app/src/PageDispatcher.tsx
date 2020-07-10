import React, { useState, useContext, ComponentType, ReactNode, useMemo } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import { fetchBlogData, usePromise, BlogData } from './utils'

const BlogContext = React.createContext<BlogData>({ type: 'splash' })
export function useBlogData() { return useContext(BlogContext) }

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

function PageDispatcher() {
  const { push } = useHistory(); (global as any).router = push
  const { pathname } = useLocation()
  const [initPath] = useState(pathname)
  const { data: _blogData } = usePromise(() => fetchBlogData(pathname === initPath ? undefined : pathname), [pathname])
  const blogData = useMemo(() => _blogData || { type: 'splash' }, [_blogData])

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

  return (
    <BlogContext.Provider value={blogData}>
      {page}
    </BlogContext.Provider>
  )
}

export default PageDispatcher
