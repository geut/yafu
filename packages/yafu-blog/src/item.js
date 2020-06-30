import React from 'react'
import renderers from 'elems/renderers'
import { Heading1 } from 'elems'

import Content from '@geut/react-hast-content'

import Layout from './components/layout'
import Container from './components/container'
import Markdown from './components/markdown'
import { useProperties } from './hooks/drive'

export default function Entry ({ path }) {
  const [drive] = useProperties()
  return (
  <Markdown path={path}>
    {(post) => (
      <Layout name={drive.title} title={`${drive.title} | ${post.data.title}`} showNav>
        <Container>
          <div key={post.data.path}>
            <Heading1>{post.data.title}</Heading1>
            <Content content={post.content} renderers={renderers} />
          </div>
        </Container>
      </Layout>
    )}
  </Markdown>
  )
}
