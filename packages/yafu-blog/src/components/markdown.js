import { useState, useEffect } from 'react'
import Worker from '@geut/hast-worker'

import { getConfig } from '../config'

export default function Markdown({ path, placeholder = null, children }) {
  const [post, setPost] = useState()

  useEffect(() => {
    (async () => {
      const { plugins: { rehype, remark } } = await getConfig()
      const raw = await beaker.hyperdrive.readFile(path)
      const worker = new Worker()
      worker.onmessage = function (event) {          
        setPost(event.data)
        worker.terminate()
      };
      worker.postMessage({ raw, data: { path }, config: { rehype, remark } })
    })()

  }, [path])

  return ( post ? children(post) : placeholder )
}