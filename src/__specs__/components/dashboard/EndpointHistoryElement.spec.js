/* global describe, expect, it, beforeEach, require */
import { mount } from 'vue-test-utils'
import EndpointHistoryElement from '@/components/dashboard/EndpointHistoryElement'
import dataHelper from '@/__specs__/dataHelper'

describe('EndpointHistoryElement', () => {
  let availabilityHistory
  const createwrapper = propsData => mount(EndpointHistoryElement, { propsData })

  beforeEach(() => {
    const data = dataHelper.loadMockedData('availability_history')
    availabilityHistory = data.results[1].endpoints_availability_history[0].availability_history
  })

  it('renders a svg element', () => {
    const wrapper = createwrapper({ provider_name: 'qualibat', endpoints_availability_history: availabilityHistory })
    expect(wrapper.contains('svg')).toBeTruthy()
  })
})
