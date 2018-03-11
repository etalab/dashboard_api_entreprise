const fs = require('fs')

const loadMockedData = (name) => {
  return JSON.parse(fs.readFileSync(`./src/__mocksData__/${name}.json`, 'utf8'))
}

module.exports = {
  loadMockedData
}
