import React from 'react'
import { useBlogData } from '@/BlogData'
import { registerPageType } from '@/PageDispatcher'

function PostsListPage() {
  const data = useBlogData()
  console.log(data)

  return (
    <div>
      list
    </div>
  )
}

registerPageType({
  type: 'posts-list',
  component: PostsListPage
})
