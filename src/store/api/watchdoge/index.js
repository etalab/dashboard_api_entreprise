import axios from 'axios'
import router from '@/router'

const API_URL = `${process.env.VUE_APP_WATCHDOGE_API_BASE_URL}${process.env.VUE_APP_WATCHDOGE_URL_PREFIX}`

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
        // TODO Handle those errors (a current fail redirects to login page)
        // .catch(error => reject(handleError(error)))
    })
  }
}

const handleError = (error) => {
  // TODO handle error message with vuex
  if (!error.response) router.push({ name: 'logout' })
  else if (error.response.status === 401) router.push({ name: 'logout' })
  else if (error.response.status === 422) return error.response.data.errors
}

export default { namespaced: true, actions }
