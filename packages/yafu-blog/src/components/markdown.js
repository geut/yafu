import { useState, useEffect } from 'react'
import Worker from '@geut/hast-worker'

import { getConfig } from '../config'

export default function Markdown({ path, children }) {
  const [post, setPost] = useState()

  useEffect(() => {
    let worker
    (async () => {
      const { plugins: { rehype, remark } } = await getConfig()
      const raw = await beaker.hyperdrive.readFile(path)
      worker = new Worker()
      worker.onmessage = function (event) {          
        setPost(event.data)
      };
      worker.postMessage({ raw, data: { path }, config: { rehype, remark } })
    })()

    return () => {
      worker && worker.terminate()
    }
  }, [path])

  return ( post ? children(post) : null )
}