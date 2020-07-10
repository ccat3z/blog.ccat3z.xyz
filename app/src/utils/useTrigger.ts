import { useState } from 'react'

export function useTrigger(): [boolean, () => void] {
  const [value, setValue] = useState(true)
  return [value, () => { setValue(!value) }]
}
