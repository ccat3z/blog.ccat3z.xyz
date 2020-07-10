// Author: https://github.com/bsonntag/react-use-promise

import { useEffect, useReducer, useCallback, Reducer } from 'react'
import { useTrigger } from './useTrigger'

function resolvePromise<T>(promise: Promise<T> | (() => Promise<T>)): Promise<T> {
  if (typeof promise === 'function') {
    return promise()
  }

  return promise
}

type State<T> = {
    error?: undefined | any,
    result?: undefined | T,
    state: 'pending' | 'rejected' | 'resolved'
}

type Action<T> = {
    type: 'pending'
} | {
    type: 'rejected',
    payload: any
} | {
    type: 'resolved',
    payload: T
}

function reducer<T>(state: State<T> = { state: 'pending' }, action: Action<T>): State<T> {
  switch (action.type) {
  case 'pending':
    return {
      error: undefined,
      result: state.result,
      state: 'pending'
    }
  case 'resolved':
    return {
      error: undefined,
      result: action.payload,
      state: 'resolved'
    }
  case 'rejected':
    return {
      error: action.payload,
      result: undefined,
      state: 'rejected'
    }
  default:
    return state
  }
}

function usePromise<T>(promise: Promise<T> | (() => Promise<T>), inputs: any[]): {
  data: T | undefined,
  error: any | undefined,
  state: 'pending' | 'rejected' | 'resolved',
  retry: () => void
} {
  const [{ error, result, state }, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(reducer, {
    state: 'pending'
  })
  const [triggerToken, trigger] = useTrigger()

  useEffect(() => {
    const _promise = resolvePromise(promise)

    if (_promise === undefined) {
      return
    }

    let canceled = false

    dispatch({ type: 'pending' })

    _promise.then(
      _result => !canceled && dispatch({
        payload: _result,
        type: 'resolved'
      }),
      _error => !canceled && dispatch({
        payload: _error,
        type: 'rejected'
      })
    )

    return () => {
      canceled = true
    }
  }, [...inputs, triggerToken]) // eslint-disable-line react-hooks/exhaustive-deps

  const cb = useCallback(() => {
    if (state !== 'pending') trigger()
  }, [trigger, state])

  return {
    data: result,
    error,
    state,
    retry: cb
  }
}

export { usePromise }