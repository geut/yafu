import React, { useState, useEffect } from 'react'
import renderers from 'elems/renderers'
import { Heading1, Heading2, Anchor } from 'elems'

import Content from '@geut/react-hast-content'

import { dirname } from 'path'

import Layout from './components/layout'
import Container from './components/container'
import Markdown from './components/markdown'
import { useProperties } from './hooks/drive'
import { getConfig } from './config'

export default function List ({ path }) {
  const [files, setFiles] = useState([])
  const [drive] = useProperties()

  useEffect(() => {
    (async () => {
      const config = await getConfig()
      const files = await beaker.hyperdrive.query({
        path: [`${path}*.md`,`${path}**/*.md`],
        type: 'file'
      })

      setFiles(
        files
        .filter(config.filter)
        .sort(config.sort)
      )
    })()
  }, [path])

  return (
    <Layout name={drive.title} title={drive.title}>
      <div className="header">
        <Container>
          <Heading1>{drive.title}</Heading1>
          <p>{drive.description}</p>
        </Container>
      </div>
      <Container>
        <section className="list">
          {console.log(files), files
          .map(({ path }) => (
            <Markdown key={path} path={path}>
              {(p => (
                <article key={p.data.path}>
                  <div className="category">
                    <Anchor href={dirname(p.data.path)}>{dirname(p.data.path)}</Anchor>
                  </div>
                  <Heading2><Anchor href={p.data.path}>{p.data.title}</Anchor></Heading2>
                  <Content  content={p.content} renderers={renderers} excerpt/>
                </article>
              ))}
            </Markdown>
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
