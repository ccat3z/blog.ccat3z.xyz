import React, { useState, useContext, useMemo } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import { fetchBlogData, usePromise, BlogData } from './utils'

const BlogContext = React.createContext<BlogData>({ type: 'splash' })
export function useBlogData() { return useContext(BlogContext) }

export default function BlogDataContext(props: { children: React.ReactNode }) {
  const { push } = useHistory(); (global as any).router = push
  const { pathname } = useLocation()
  const [initPath] = useState(pathname)
  const { data: _blogData } = usePromise(() => fetchBlogData(pathname === initPath ? undefined : pathname), [pathname])
  const blogData = useMemo(() => _blogData || { type: 'splash' }, [_blogData])

  return (
    <BlogContext.Provider value={blogData}>
      {props.children}
    </BlogContext.Provider>
  )
}
