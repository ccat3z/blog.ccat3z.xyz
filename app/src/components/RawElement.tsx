import React from 'react'

// TODO: exec <script>
export default function RawElement(props: {
  element: Element,
  className?: string,
  style?: React.CSSProperties
}) {
  return <div
    className={props.className}
    style={props.style}
    ref={elem => {
      if (!elem) return
      elem.appendChild(props.element)
    }}
  />
}
