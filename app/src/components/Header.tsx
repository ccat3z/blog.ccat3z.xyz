import React, { useState, useEffect, useCallback } from 'react'
import { useBlogData, useBlogDataLoadingState } from '../BlogData'
import { useHistory, useLocation } from 'react-router-dom'
import debounce from 'lodash/debounce'
import './Header.scss'

function PureStringCommand(props: {text: string}) {
  return <span className="command">{props.text}</span>
}

function PageFilterCommand(props: {page: number}) {
  const { pagination } = useBlogData()

  const { push: _goTo } = useHistory()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const goTo = useCallback(debounce((index: number) => {
    if (pagination === undefined) return
    if (index < 1) return
    if (index > pagination.length) return
    console.log('goto ' + pagination[index - 1].href)
    _goTo(pagination[index - 1].href)
  }, 500), [_goTo, pagination])

  const [current, _setCurrent] = useState<number>(props.page)
  const setCurrent = useCallback((p: number) => {
    if (1 <= p && p <= (pagination || []).length)
      _setCurrent(p)
  }, [_setCurrent, pagination])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => goTo(current), [current])

  let autocomplete = <></>
  if (pagination !== undefined) {
    const total = pagination.length
    autocomplete = <span className="auto-complete">
      &nbsp;of {total}
      &nbsp;
      <span className="page-btns">
        (
        <a
          onClick={() => setCurrent(current - 1)}
          className={`page-btn ${current === 1 ? "disabled" : ""}`}
        >prev</a>,&nbsp;
        <a
          onClick={() => setCurrent(current + 1)}
          className={`page-btn ${current === total ? "disabled" : ""}`}
        >next</a>
        )
      </span>
    </span>
  }

  return <span className="pager command">
    page&nbsp;
    <input
      value={current}
      onChange={v => setCurrent(parseInt(v.target.value))}
      type="number"
    />
    {autocomplete}
  </span>
}

type Location = {
  pathname: string
}

const virtualCommands = [
  // /
  l => {
    if (l.pathname === '/') return <PureStringCommand text='screenfetch' />
  },
  // /posts /posts/:num
  l => {
    let m = l.pathname.match(/^\/posts(?:|\/(\d*))\/?$/)
    if (m === null) return
    let page = parseInt(m[1] || '1')
    return <>
      <PureStringCommand text='ls /posts' />
      <PageFilterCommand page={page} />
    </>
  },
  // /posts/:string
  l => {
    let m = l.pathname.match(/^\/posts\/([^/]{1,})\/?$/)
    if (m === null) return
    return <PureStringCommand text={`open /posts/${m[1]}`} />
  },
  // /*
  l => {
    let c = 'cat ' + l.pathname.replace(/\/$/, '').replace(/\.[^./]*/, '')
    return <PureStringCommand text={c} />
  }
] as ((locaction: Location) => React.ReactNode | undefined)[]

function convertUrlToVirtualCommand(location: Location): React.ReactNode {
  let res: React.ReactNode = undefined
  for (let f of virtualCommands) {
    res = f(location)
    if (res !== undefined) return res
  }
}

export default function Header(props: {
  className?: string
}) {
  const blogData = useBlogData()
  const { state, retry } = useBlogDataLoadingState()
  const { push: goTo } = useHistory()
  const { pathname } = useLocation()

  return <div className={`terminal-nav blog-header ${props.className || ''}`}>
    <div className="command-line">
      <span className={`ps1 ${state}`} onClick={() => {
        if (state === 'rejected') {
          retry()
        } else {
          goTo('/')
        }
      }} />
      <span className="command-pipeline">
        {convertUrlToVirtualCommand({pathname})}
      </span>
      { state === 'pending' && <span
        style={{
          margin: '0 0.3em',
          color: 'var(--secondary-color)'
        }}
      >...</span> }
    </div>
    <nav className="terminal-menu" style={{
      width: 'auto',
      flexGrow: 1
    }}>
      <ul>
        {(blogData.nav ?? []).map(n => <li key={n.name}>
          <a
            className="menu-item"
            onClick={() => { goTo(n.href) }}
          >{n.name}</a>
        </li>)}
      </ul>
    </nav>
  </div>
}