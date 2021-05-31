import React from 'react'

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
      elem.querySelectorAll('script').forEach(script => {
        // eslint-disable-next-line no-eval
        window.eval(script.innerHTML)
      })
    }}
  />
}
