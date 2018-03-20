const fs = require('fs')

const validResponse = (data) => {
  return {
    data: data,
    headers: {
      'cache-control': 'max-age=0, private, must-revalidate',
      'content-type': 'application/json; charset=utf-8'
    },
    status: 200,
    statusText: 'OK'
  }
}

const axios = {
  create: () => { return axios },
  get: url => new Promise((resolve, reject) => {
    fs.readFile(`./src/__mocksData__${url}.json`, 'utf8', (error, data) => {
      if (error) reject(error)
      else resolve(validResponse(JSON.parse(data)))
    })
  })
}

export default axios
