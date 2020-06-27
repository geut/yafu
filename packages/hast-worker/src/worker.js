
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import raw from 'rehype-raw'
import fm from 'frontmatter'

const parser = unified()
  .use(markdown)
  // .use(remark.map(mapPlugin))
  .use(remark2rehype, { allowDangerousHtml: true })
  // .use(rehype.map(mapPlugin))
  .use(raw)

onmessage = function({ data: { raw, data } }) {
  const value = fm(raw);

  postMessage({
    data: {
      ...data,
      ...value.data
    },
    content: parser.runSync(parser.parse(value.content))
  })
}