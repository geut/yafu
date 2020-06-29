import React, { useState, useEffect } from 'react'
import renderers from 'elems/renderers'
import { Heading1 } from 'elems'

import Content from '@geut/react-hast-content'
import Worker from '@geut/hast-worker'

import Layout from './layout'
import Container from './container'

export default function Entry ({ path }) {
  const [index, setIndex] = useState({})
  const [post, setPost] = useState()

  useEffect(() => {
    (async () => {
      setIndex(await beaker.hyperdrive.readFile('/index.json', 'json'))      
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try{
        const raw = await beaker.hyperdrive.readFile(path)
  
        const worker = new Worker()
  
        worker.onmessage = function (event) {          
          setPost(event.data)
        };
        worker.postMessage({ raw, data: { path } })

      } catch(err) {
        console.log(err)
      }
    })();

  }, [path])

  return (
    <Layout name={index.title} title={index.title} showNav>
      <Container>
        {post && (
          <div key={post.data.path}>
            <Heading1>{post.data.title}</Heading1>
            <Content  content={post.content} renderers={renderers} />
          </div>
        )}
      </Container>
    </Layout>
  )
}
