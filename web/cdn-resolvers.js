const moduleToCdn = require (`module-to-cdn`)

const resolve = (name, version) => {
  const list = [
    {
      name: `history`,
      var: `History`,
      url: `https://unpkg.com/history@${version}/umd/history.min.js`,
      version
    },
    {
      name: `ramda`,
      var: `R`,
      url: `https://unpkg.com/ramda@${version}/dist/ramda.min.js`,
      version
    },
    {
      name: `styled-components`,
      var: `styled`,
      url: `https://unpkg.com/styled-components@${version}/dist/styled-components.min.js`,
      version

    },
  ]

  return list.find (pkg => pkg.name === name)
}

module.exports = (name, version, opts) => (
  resolve (name, version) ||
  moduleToCdn (name, version, opts)
)
