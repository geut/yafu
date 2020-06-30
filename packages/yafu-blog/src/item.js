import React, { useState, useEffect } from 'react'
import renderers from 'elems/renderers'
import { Heading1 } from 'elems'

import Content from '@geut/react-hast-content'
import Worker from '@geut/hast-worker'

import Layout from './components/layout'
import Container from './components/container'
import Markdown from './components/markdown'

export default function Entry ({ path }) {
  const [index, setIndex] = useState({})

  useEffect(() => {
    (async () => {
      setIndex(await beaker.hyperdrive.readFile('/index.json', 'json'))      
    })()
  }, [])

  return (
    <Layout name={index.title} title={index.title} showNav>
      <Container>
        <Markdown path={path}>
          {(post) => (
            <div key={post.data.path}>
              <Heading1>{post.data.title}</Heading1>
              <Content content={post.content} renderers={renderers} />
            </div>
          )}
        </Markdown>
      </Container>
    </Layout>
  )
}
