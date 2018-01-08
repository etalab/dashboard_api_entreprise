import axios from 'axios'

const API_URL = `${process.env.API_BASE_URL}${process.env.API_URL_PREFIX}`

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + (localStorage.token || '')
  },
  timeout: 30000
})
