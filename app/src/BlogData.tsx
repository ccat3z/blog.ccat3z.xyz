import React, { useState, useContext, useMemo, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import { fetchBlogData, usePromise, BlogData } from './utils'

const BlogContext = React.createContext<BlogData>({ title: 'loading', type: 'splash' })
export function useBlogData() { return useContext(BlogContext) }

const defaultLoadingState = {
  state: 'resolved' as 'pending' | 'rejected' | 'resolved',
  retry: () => {}
}
const LoadingStateContext = React.createContext(defaultLoadingState)
export function useBlogDataLoadingState() { return useContext(LoadingStateContext) }

export default function BlogDataContext(props: { children: React.ReactNode }) {
  const { push } = useHistory(); (global as any).router = push
  const { pathname } = useLocation()
  const [initPath] = useState(pathname)
  const { data: _blogData, state, retry } = usePromise(() => fetchBlogData(pathname === initPath ? undefined : pathname), [pathname])
  const blogData = useMemo(() => _blogData || { title: 'loading', type: 'splash' }, [_blogData])
  const loadingState = useMemo(() => {
    return {
      state,
      retry
    }
  }, [state, retry])
  useEffect(() => { document.title = blogData.title }, [blogData.title])

  return (
    <BlogContext.Provider value={blogData}>
      <LoadingStateContext.Provider value={loadingState}>
        {props.children}
      </LoadingStateContext.Provider>
    </BlogContext.Provider>
  )
}
