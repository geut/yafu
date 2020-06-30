import React, { useState, useEffect } from 'react'
import Worker from '@geut/hast-worker'

export default function Markdown({ path, children }) {
  const [post, setPost] = useState()

  useEffect(() => {
    let worker
    (async () => {
      const raw = await beaker.hyperdrive.readFile(path)
      worker = new Worker()
      worker.onmessage = function (event) {          
        setPost(event.data)
      };
      worker.postMessage({ raw, data: { path } })
    })()

    return () => {
      worker && worker.terminate()
    }
  }, [path])

  return ( post ? children(post) : null )
}