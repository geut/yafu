import { useState, useEffect } from 'react'

export function useProperties(initialValue = {}) {
  const [properties, setProperties] = useState(initialValue)

  useEffect(() => {
    beaker.hyperdrive.readFile('/index.json', 'json')
      .then(setProperties)
  }, [])

  return [properties]
}