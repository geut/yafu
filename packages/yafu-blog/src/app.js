import React from 'react'
import List from './list'
import Entry from './entry'

export default function App () {
  const path = location.pathname;
  if (path.endsWith('.md')) {
    return <Entry path={path} />
  }
  return <List path={path} />
}
