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
  }
}

export default { namespaced: true, actions }
