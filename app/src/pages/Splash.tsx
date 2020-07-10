import React from 'react'
import { registerPageType } from '../PageDispatcher'

function EmptyPage() {
  return <></>
}

registerPageType({
  type: 'splash',
  component: EmptyPage
})