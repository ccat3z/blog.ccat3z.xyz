import React, { useContext, useMemo, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import { fetchBlogData, usePromise, BlogData, findSEONodesInHead } from './utils'

const defaultBlogData: BlogData = { title: 'loading', type: 'splash', seo: { nodes: [] } }
const BlogContext = React.createContext<BlogData>(defaultBlogData)
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
  const { data: _blogData, state, retry } = usePromise(async () => fetchBlogData(pathname), [pathname])
  const blogData = useMemo(() => _blogData || defaultBlogData, [_blogData])
  const loadingState = useMemo(() => {
    return {
      state,
      retry
    }
  }, [state, retry])

  useEffect(() => {
    findSEONodesInHead(document.head).nodes.forEach(n => n.remove())
    document.head.append(...blogData.seo.nodes)
  }, [blogData])

  return (
    <BlogContext.Provider value={blogData}>
      <LoadingStateContext.Provider value={loadingState}>
        {props.children}
      </LoadingStateContext.Provider>
    </BlogContext.Provider>
  )
}
