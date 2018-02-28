import axios from 'axios'

const API_URL = `${process.env.API_BASE_URL}${process.env.API_URL_PREFIX}`

const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
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
  },

  post (ctx, { url, params = {} }) {
    return new Promise((resolve, reject) => {
      http.post(url, params)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response.data.errors))
    })
  },

  updateAuthorizationBearer (ctx) {
    http.defaults.headers['Authorization'] = 'Bearer ' + localStorage.token
  }
}

export default { namespaced: true, actions }
