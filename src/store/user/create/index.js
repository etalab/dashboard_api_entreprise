const state = {
  user_form: {
    email: '',
    context: '',
    adminContactEmail: '',
    adminContactPhone: '',
    techContactEmail: '',
    techContactPhone: ''
  }
}

const getters = {
  generatePayload (state, getters) {
    let contacts = []

    if (getters.adminContactPayload !== null) contacts.push(getters.adminContactPayload)
    if (getters.techContactPayload !== null) contacts.push(getters.techContactPayload)

    let payload = {
      email: state.user_form.email,
      context: state.user_form.context
    }
    if (contacts.length > 0) payload.contacts = contacts

    return payload
  },

  adminContactPayload (state) {
    if (state.user_form.adminContactEmail === '' && state.user_form.adminContactPhone === '') {
      return null
    }

    return {
      email: state.user_form.adminContactEmail,
      phone_number: state.user_form.adminContactPhone,
      contact_type: 'admin'
    }
  },

  techContactPayload (state) {
    if (state.user_form.techContactEmail === '' && state.user_form.techContactPhone === '') {
      return null
    }

    return {
      email: state.user_form.techContactEmail,
      phone_number: state.user_form.techContactPhone,
      contact_type: 'tech'
    }
  }
}

const mutations = {
  updateField (state, { field, val }) {
    state.user_form[field] = val
  }
}

const actions = {
  submit ({ dispatch, getters }) {
    const payload = getters.generatePayload
    return dispatch('api/admin/post', { url: '/users', params: payload }, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
