import React, { useState, ReactNode, CSSProperties } from 'react'
import './Comment.scss'

// Original author: https://github.com/utterance/utterances/issues/161#issuecomment-550991248
export const UtterancesComments = (props: {
  term: string,
  loading?: ReactNode,
  className?: string,
  style?: CSSProperties
}) => {
  const [loaded, setLoaded] = useState(false)

  return <div>
    <div>{loaded || props.loading || 'loading comments...'}</div>
    <section
      className={props.className}
      style={props.style}
      ref={elem => {
        if (!elem) return
        if (elem.children.length > 0) return

        setLoaded(false)
        new ResizeObserver((es, ob) => {
          for (let e of es) {
            if (e.contentRect.height > 0) {
              setLoaded(true)
              ob.disconnect()
              return
            }
          }
        }).observe(elem)

        const scriptElem = document.createElement("script");
        scriptElem.src = "https://utteranc.es/client.js";
        scriptElem.async = true;
        scriptElem.crossOrigin = "anonymous";
        // TODO: extract repo config
        scriptElem.setAttribute("repo", "ccat3z/blog.ccat3z.xyz");
        scriptElem.setAttribute("issue-term", props.term);
        scriptElem.setAttribute("label", "blog comment");
        scriptElem.setAttribute("theme", "github-light");
        elem.appendChild(scriptElem);
      }}
    />
  </div>
};