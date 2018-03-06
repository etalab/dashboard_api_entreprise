import axios from 'axios'

const API_URL = `${process.env.API_BASE_URL}${process.env.DASHBOARD_URL_PREFIX}`

const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

const actions = {
  get (ctx, { url, params = {} }) {
    return new Promise((resolve, reject) => {
      http.get(url, { params })
        .then(response => resolve(response.data))
        .catch(error => reject(error.response.data.errors))
    })
  }
}

export default { namespaced: true, actions }
