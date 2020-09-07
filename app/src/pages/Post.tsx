import React, { useMemo } from 'react'
import { registerPageType } from '@/PageDispatcher'
import { useBlogData } from '@/BlogData'
import Raw from '@/components/RawElement'
import { UtterancesComments as Comments } from '@/components/Comment'
import { BlogData } from '@/utils'
import { extractPostInfo } from './PostsList'
import './Post.scss'
import { useHistory } from 'react-router-dom'

function parsePostContent(e: Element) {
  const postInfoElement = e.querySelector('.post-info')
  if (!postInfoElement) return
  const postInfo = extractPostInfo(postInfoElement)
  if (!postInfo) return
  const contentElement = e.querySelector('.content')
  if (!contentElement) return
  
  return {
    postInfo,
    content: contentElement
  }
}

function PostPage(props: {
  data: BlogData & {
    type: 'post'
    content: Element
  }
}) {
  const post = useMemo(() => parsePostContent(props.data.content), [props.data.content])
  const { push: goTo } = useHistory()
  if (!post) return <></>

  return (
    <div className="post-page">
      <pre className="post-info-box highlight">
        <code>
          <span className="nn">---</span><br />
          <span className="na">title</span><span className="pi">:</span> <span className="s">{post.postInfo.title}</span><br />
          <span className="na">date</span><span className="pi">:</span> <span className="s">{post.postInfo.date}</span><br />
          <span className="na">description</span><span className="pi">:</span> <span className="pi">|-</span><br />
          <span style={{
            width: '100%',
            display: 'inline-flex',
            flexDirection: 'row'
          }}>
            <span>{`  `}</span><span className="s" style={{
              display: 'inline-block'
            }}>
              {post.postInfo.abstract}
            </span>
          </span><br />
          <span className="na">tags</span><span className="pi">:</span> <span className="pi">[</span>
          {post.postInfo.tags.map((t, i, { length }) => (
            <>
              <a key={t.href} className="tag sx" href={t.href}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  goTo(t.href)
                }}
              >{t.name}</a>
              { i !== length - 1 && <span className="pi">, </span> }
            </>
          ))}
          <span className="pi">]</span><br />
        </code>
      </pre>
      <Raw className="post-content" element={post.content} />
      <hr className="footer-line" />
      <Comments className="comments" term={`Comment: ${post.postInfo.id}`} />
    </div>
  )
}

const _postPage = () => {
  const data = useBlogData()
  if (data.type === 'post' && data.content !== undefined) {
    return <PostPage data={{
      ...data,
      type: data.type,
      content: data.content
    }} />
  }
  return <></>
}

registerPageType({
  type: 'post',
  component: _postPage
})