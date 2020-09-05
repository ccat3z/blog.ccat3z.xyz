import React from 'react'
import './Comment.scss'

// Author: https://github.com/utterance/utterances/issues/161#issuecomment-550991248
export const UtterancesComments = (props: {
  term: string
}) => (
  <section
    ref={elem => {
      if (!elem) {
        return;
      }
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
);