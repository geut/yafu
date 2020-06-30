
async function configFromModule({ default: config }) {
  return {
    filter: () => true,
    sort: (a, b) => a.path > b.path ? 1 : -1,
    ...((typeof config === 'function') ? await config() : config),
  }
}

export async function getConfig() {
  try {
    await beaker.hyperdrive.stat('/yafu.config.mjs') // check if file exists.
    const module = await import(/* webpackIgnore: true */'/yafu.config.mjs')
    return  configFromModule(module)
  }catch(err) {
    console.log('no config file found.')
  }
}
