import React, { useMemo } from 'react'
import { useBlogData } from '@/BlogData'
import { registerPageType } from '@/PageDispatcher'
import { useHistory } from 'react-router-dom'
import './PostsList.scss'

type PostInfo = {
  title: string,
  href: string,
  date: string,
  abstract: string,
  tags: {
    name: string,
    href: string
  }[]
}

export function extractPostInfo (e: Element): PostInfo | undefined {
  let title = e.querySelector('a.post-title')
  if (!title) return
  let date = e.querySelector('.post-date')
  if (!date) return
  let shortDescription = e.querySelector('.post-short-description')
  if (!shortDescription) return
  let tags = Array.from(e.querySelectorAll('.post-tags > li > a.post-tag'))

  return {
    title: title.textContent || '',
    href: title.getAttribute('href') || '#',
    date: date.textContent || '',
    abstract: shortDescription.textContent || '',
    tags: tags.map(e => ({
      name: e.textContent || '',
      href: e.getAttribute('href') || '#'
    })),
  }
}

function extractPostList (e: Element): PostInfo[] {
  let es = Array.from(e.querySelectorAll('ul.posts-list > li'))
  return es.map(p => {
    let res = extractPostInfo(p)
    
    return res || {
      title: 'ERROR',
      href: '#',
      date: '',
      abstract: '',
      tags: []
    }
  })
}

function PostsListPage() {
  const { content } = useBlogData()
  const { push: goTo } = useHistory()
  const posts = useMemo(() => {
    if (content) return extractPostList(content)
    else return []
  }, [content])

  return (
    <div className="posts-list">
      {posts.map(p => (
        <div className="post-item" key={p.href}>
          <div className="title-line">
            <span className="date">
              {p.date}
            </span>
            <a href={p.href} onClick={(e) => {
              goTo(p.href)
              e.stopPropagation()
              e.preventDefault()
            }} className="title">{p.title}</a>
            <div className="tags-group">
              {p.tags.map(t => (<span className="tag-box" key={p.href}>
                <a
                  className="tag"
                  href={t.href}
                  onClick={(e) => {
                    goTo(t.href)
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                >{t.name}</a>
              </span>))}
            </div>
          </div>
          <div className="abstract">
            {p.abstract}
          </div>
        </div>
      ))}
    </div>
  )
}

registerPageType({
  type: 'posts-list',
  component: PostsListPage
})
