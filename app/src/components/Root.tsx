import React from 'react'

type HeaderProps = {
  children: React.ReactNode
}

export default function Header(props: HeaderProps) {
  return <div>
    aa
    {props.children}
  </div>
}
