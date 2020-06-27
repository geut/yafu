import React, { useState, useEffect } from 'react'
import renderers from 'elems/renderers'
import { Heading1, Heading2, Anchor } from 'elems'

import Content from '@geut/react-hast-content'
import Worker from '@geut/hast-worker'

import { dirname } from 'path'

import Layout from './layout'
import Container from './container'

export default function List ({ path }) {
  const [index, setIndex] = useState({})
  const [files, setFiles] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    (async () => {
      setIndex(await beaker.hyperdrive.readFile('/index.json', 'json'))      
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const files = await beaker.hyperdrive.query({ 
        path: [`${path}*.md`,`${path}**/*.md`],
        type: 'file'
      })
      setFiles(files)
    })()
  }, [path])


  useEffect(() => {
    Promise.all(files.map(async ({ path }) => {
      const raw = await beaker.hyperdrive.readFile(path)
      return new Promise((resolve) => {
        const worker = new Worker()
        worker.onmessage = function (event) {          
          resolve(event.data)
      };
       worker.postMessage({ raw, data: { path } })
      })
    })).then(setPosts)
  }, [files])

  return (
    <Layout name={index.title} title={index.title}>
      <div className="header">
        <Container>
          <Heading1>{index.title}</Heading1>
          <p>{index.description}</p>
        </Container>
      </div>
      <Container>
        <section className="list">
        {posts.map(p => (
          <article key={p.data.path}>
            <div className="category">
              <Anchor href={dirname(p.data.path)}>{dirname(p.data.path)}</Anchor>
            </div>
            <Heading2><Anchor href={p.data.path}>{p.data.title}</Anchor></Heading2>
            <Content  content={p.content} renderers={renderers} excerpt/>
          </article>
        ))}
        </section>
      </Container>
      <style jsx>{`
        .header {
          background-color: var(--grey50);
          padding: calc(var(--spacing) * 6) 0;
        }
        section {
          margin: calc(var(--spacing) * 4) 0;
          display: flex;
          flex-direction: column;
        }
        article {
          margin: calc(var(--spacing) * 2) 0;
        }
        article .category :global(a) {
          color: #888;
          text-decoration: none;
        }

      `}</style>
    </Layout>
  )
}
