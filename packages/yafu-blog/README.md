# yafu-blog

## Config

Create a `yafu.config.js` in your hyperdrive root.

- export async function that returns an object:

  ```
  export default async () => ({
    plugins: {
      remark: ['/remark-emoji.js']

    },

    filter: file => !file.path.endsWith('.es.md')
  })

  ```

- export an Object

  ```
  export default {
    filter: file => !file.path.endsWith('.es.md')
  }

  ```

  ### Config Object

  - filter {function(file) -> Boolean }
  - sort {function(file) -> Number}
  - plugins {Object}
    - remark
    - rehype