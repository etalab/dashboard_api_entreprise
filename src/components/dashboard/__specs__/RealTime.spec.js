/* global describe, expect, it, beforeEach, jest */
import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import dataHelper from '@/__specs__/dataHelper'
import RealTime from '@/components/dashboard/RealTime'
import RefreshButton from '@/components/dashboard/RefreshButton'
import EndpointsTable from '@/components/dashboard/EndpointsTable'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Dashboard/RealTime', () => {
  let wrapper, store

  beforeEach(() => {
    const getters = {
      homepageCode: () => 200,
      endpoints: () => dataHelper.loadMockedData('current_status').results
    }

    const actions = {
      homepageCode: jest.fn(),
      endpoints: jest.fn()
    }

    const modules = {
      dashboard: {
        namespaced: true,
        getters,
        actions
      }
    }

    store = new Vuex.Store({ modules })

    wrapper = shallow(RealTime, { store, localVue })
  })

  it('refresh button clicked calls loadData when loadData is emitted', () => {
    const stub = jest.fn()
    wrapper.setMethods({ loadData: stub })

    wrapper.find(RefreshButton).vm.$emit('loadData')
    expect(stub).toBeCalledWith()
  })

  it('has an EndpointsTable component', () => {
    expect(wrapper.contains(EndpointsTable)).toBeTruthy()
  })

  it('gets endpoints from back office', () => {
    wrapper.vm.loadData()
    expect(wrapper.vm.endpoints).toHaveLength(36)
  })

  it('has computed functions to filter endpoints', () => {
    wrapper.vm.loadData()
    expect(wrapper.vm.endpointsV1).toHaveLength(14)
    expect(wrapper.vm.endpointsV2).toHaveLength(22)
  })
})
