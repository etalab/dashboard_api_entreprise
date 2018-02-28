import axios from '@/axios-common'

const actions = {
  get (ctx, { url, params = {} }) {
    return new Promise((resolve, reject) => {
      axios.get(url, { params })
        .then(response => resolve(response.data))
        .catch(error => reject(error.response.data.errors))
    })
  },

  post (ctx, { url, params = {} }) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response.data.errors))
    })
  },

  updateAuthorizationBearer (ctx) {
    axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.token
  }
}

export default { namespaced: true, actions }
