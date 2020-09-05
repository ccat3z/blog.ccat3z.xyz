import React, { useState, useEffect, useCallback } from 'react'
import { useBlogData, useBlogDataLoadingState } from '../BlogData'
import { useHistory, useLocation } from 'react-router-dom'
import './Header.scss'

type Location = {
  pathname: string
}

const virtualCommands = [
  l => { if (l.pathname === '/') return 'screenfetch' },
  l => { if (l.pathname.match(/^\/posts(|\/\d*)\/?$/)) return 'ls /posts'},
  l => 'cat ' + l.pathname.replace(/\/$/, '').replace(/\.[^./]*/, '')
] as ((locaction: Location) => string | undefined)[]

function convertUrlToVirtualCommand(location: Location) {
  let res = ''
  for (let f of virtualCommands) {
    res = f(location) || ''
    if (res) return res
  }
  return `cat ${location.pathname}`
}

function PageFilterCommand() {
  const { pagination } = useBlogData()
  const { push: _goTo } = useHistory()
  const [current, setCurrent] = useState<number>()
  const goTo = useCallback((index: number) => {
    if (pagination === undefined) return
    if (index < 1) return
    if (index > pagination.length) return
    _goTo(pagination[index - 1].href)
  }, [_goTo, pagination])
  useEffect(() => {
    if (pagination) {
      setCurrent(pagination.findIndex(p => p.current) + 1)
    }
  }, [pagination])

  if (pagination === undefined || current === undefined) return <></>

  const total = pagination.length

  return <span className="pager">
    &nbsp;| page&nbsp;
    <input
      value={current}
      onChange={v => {
        let p = parseInt(v.target.value)
        if (1 <= p && p <= total) setCurrent(p)
      }}
      type="number"
    />
    &nbsp;of {total}
    &nbsp;
    <span className="page-btns">
      (
      <a
        onClick={() => goTo(current - 1)}
        className={`page-btn ${current === 1 ? "disabled" : "" }`}
      >prev</a>,&nbsp;
      <a
        onClick={() => goTo(current + 1)}
        className={`page-btn ${current === total ? "disabled" : "" }`}
      >next</a>
      )
    </span>
  </span>
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
      <span>
        {`${convertUrlToVirtualCommand({pathname})}`}
      </span>
      <PageFilterCommand />
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