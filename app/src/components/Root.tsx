import React from 'react'
import Header from './Header'
import './Root.scss'

type HeaderProps = {
  children: React.ReactNode
}

export default function Root(props: HeaderProps) {
  return <div className="blog-root-page">
    <div className="header-box">
      <Header className="header"/>
    </div>
    <div className="page">
      <div className="content">
        {props.children}
      </div>
    </div>
  </div>
}
