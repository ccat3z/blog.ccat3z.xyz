import React from 'react'
import Header from './Header'

type HeaderProps = {
  children: React.ReactNode
}

export default function Root(props: HeaderProps) {
  return <div style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  }}>
    <div style={{
      maxWidth: '860px',
      width: '95%'
    }}>
      <Header />
      <div style={{
        paddingBottom: '10px'
      }}>
        {props.children}
      </div>
    </div>
  </div>
}
