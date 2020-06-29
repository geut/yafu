
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

const extractTitle = (appendData) => {
  return () => /* attacher */ (tree) => {
    /* transformer */
    const [first] = tree.children
    if (first.type === 'heading' && first.depth === 1) {
      tree.children.shift();
      appendData({ title:  first.children[0].value })
    }
    return tree
  }
}

const createParser = (extract) => {
  return unified()
  .use(markdown)
  .use(extract)
  // .use(remark.map(mapPlugin))
  .use(remark2rehype, { allowDangerousHtml: true })
  // .use(rehype.map(mapPlugin))
  .use(raw)
}

onmessage = function({ data: { raw, data } }) {
  const value = fm(raw)
  
  const parser = createParser(extractTitle(data => {
    value.data = {
      ...data,
      ...value.data
    }
  }))

  const content = parser.runSync(parser.parse(value.content))

  postMessage({
    data: {
      ...data,
      ...value.data
    },
    content
  })
}