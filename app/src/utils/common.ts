import { EffectCallback, DependencyList, useRef, useEffect } from "react"

export function useDidMountEffect(effect: EffectCallback, deps?: DependencyList) {
  const didMount = useRef(false)
  useEffect(() => {
    if (didMount.current) {
      return effect()
    } else {
      didMount.current = true
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}