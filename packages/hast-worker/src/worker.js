
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import raw from 'rehype-raw'
import fm from 'frontmatter'

const extractTitle = (appendData) => {
  return () => /* attacher */ (tree) => {
    /* transformer */
    const [first, second] = tree.children
    if (first.type === 'heading') {
      const data = { title:  first.children[0].value }
      tree.children.shift();
      if (second.type === 'heading') {
        data.subTitle = second.children[0].value
        tree.children.shift();
      }
      appendData(data)
    }
    return tree
  }
}

const createParser = ({ remark = [], rehype = [] }, extract) => {
  return unified()
  .use(markdown)
  .use(remark.map(mapPlugin))
  .use(extract)
  .use(remark2rehype, { allowDangerousHtml: true })
  .use(rehype.map(mapPlugin))
  .use(raw)
}

const camelize = s => s.replace(/-./g, x=>x.toUpperCase()[1])

const fetchPlugin = (plugin, version = 'latest') => {
  importScripts(`https://wzrd.in/standalone/${plugin}@${version}`)
  return self[camelize(plugin)]
}

const mapPlugin = p => {
  if (Array.isArray(p)) {
    const [name, options] = p
    return [fetchPlugin(name), options]
  }
  return fetchPlugin(p)
}

// 
onmessage = function({ data: { raw, data, config } }) {
  const value = fm(raw)
  
  const parser = createParser({ ...config }, extractTitle(data => {
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