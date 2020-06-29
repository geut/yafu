import React from 'react'
import List from './list'
import Item from './item'

export default function App () {
  const path = location.pathname;
  if (path.endsWith('.md')) {
    return <Item path={path} />
  }
  return <List path={path} />
}
