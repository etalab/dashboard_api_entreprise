/* global describe, it, expect, beforeEach, jest */
import { state, getters, mutations, actions } from '@/store/dashboard'
import Vue from 'vue'
import Vuex from 'vuex'
import dataHelper from '@/__specs__/dataHelper'

Vue.use(Vuex)

describe('actions', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: state,
      getters: getters,
      mutations: mutations,
      actions: actions
    })
  })

  it('fills homepageCode store', () => {
    return store.dispatch('homepageCode')
      .then(() => expect(store.getters.homepageCode)
        .toEqual(200)
      )
  })

  it('fills endpoints store', () => {
    return store.dispatch('endpoints')
      .then(() => expect(store.getters.endpoints)
        .toEqual(dataHelper.loadMockedData('current_status').results)
      )
  })

  it('fills endpoints history store', () => {
    return store.dispatch('endpointsHistory')
      .then(() => expect(store.getters.providersHistory)
        .toEqual(dataHelper.loadMockedData('availability_history').results)
      )
  })
})
