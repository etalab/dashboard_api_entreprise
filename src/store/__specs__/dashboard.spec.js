/* global describe, it, expect, beforeEach, jest */
import { state, getters, mutations, actions } from '@/store/dashboard'
import Vue from 'vue'
import Vuex from 'vuex'

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
        .toEqual([{'uname': 'apie_1_certificats_qualibat', 'name': 'Certificats Qualibat', 'provider': 'qualibat', 'api_version': 1, 'code': 200, 'timestamp': '2018-03-07T14:50:10.585Z'}])
      )
  })

  it('fills endpoints history store', () => {
    return store.dispatch('endpointsHistory')
      .then(() => expect(store.getters.endpointsHistory)
        .toEqual([{'provider_name': 'dgfip', 'endpoints_availability_history': [{'uname': 'apie_2_liasses_fiscales_dgfip_declaration', 'name': 'Liasses fiscales (déclaration)', 'provider': 'dgfip', 'api_version': 2, 'timezone': 'Europe/Paris', 'provider_name': null, 'sla': 0.0, 'availability_history': [['2018-02-28 01:00:02', 500, '2018-03-07 15:00:03']]}]}])
      )
  })
})
