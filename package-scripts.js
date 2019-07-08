const ghpages = require('gh-pages')
const npUtils = require('nps-utils')
const series = npUtils.series

const publish = function (src, branch) {
  const date = new Date().toISOString()
  const options = {
    branch: branch,
    dotfiles: true,
    message: `New build on ${date}.`
  }

  ghpages.publish(src, options, (err) => {
    if (err) {
      console.error(err)
    }
  })
}

module.exports = {
  scripts: {
    build: {
      default: series(
        'next build',
        'next export',
        'cp CNAME out/',
        'cp .nojekyll out/.nojekyll'
      )
    },
    publish: {
      default: series(
        publish('out', 'master')
      )
    }
  }
}