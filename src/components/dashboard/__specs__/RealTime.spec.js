/* global describe, expect, it, beforeEach, jest */
import { shallow } from 'vue-test-utils'
import RealTime from '@/components/dashboard/RealTime'
import RefreshButton from '@/components/dashboard/RefreshButton'
import EndpointsTable from '@/components/dashboard/EndpointsTable'
const helper = require('./EndpointsHelper')

describe('Dashboard/RealTime', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(RealTime)
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
    expect(wrapper.vm.endpoints).toHaveLength(7)
  })

  it('has computed functions to filter endpoints', () => {
    wrapper.vm.loadData()
    expect(wrapper.vm.endpointsV1).toHaveLength(4)
    expect(wrapper.vm.endpointsV2).toHaveLength(3)
  })
})
