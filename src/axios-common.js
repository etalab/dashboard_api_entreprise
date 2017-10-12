import axios from 'axios'

export default axios.create({
  baseURL: `${process.env.API_BASE_URL}${process.env.API_URL_PREFIX}`,
  timeout: 30000
})
