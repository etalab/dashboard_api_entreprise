/* global describe, expect, it, beforeEach, require */
import { mount } from 'vue-test-utils'
import EndpointsTable from '@/components/dashboard/EndpointsTable'
const helper = require('./EndpointsHelper')

describe('Dashboard/EndpointsTable', () => {
  let wrapper
  const slot1 = '<div id="slot-1">slot info-v1</div>'
  const slot2 = '<div id="slot-2">slot info-v2</div>'

  beforeEach(() => {
    wrapper = mount(EndpointsTable, {
      slots: {
        'info-v1': slot1,
        'info-v2': slot2
      }
    })
  })

  describe('table with the right columns', () => {
    it('contains two tables', () => {
      expect(wrapper.findAll('table')).toHaveLength(2)
    })

    it('contains 2*3 headers', () => {
      expect(wrapper.findAll('table thead tr th')).toHaveLength(6)
    })
  })

  it('contains slot 1', () => {
    expect(wrapper.contains('#slot-1')).toBeTruthy
  })

  it('contains slot 2', () => {
    expect(wrapper.contains('#slot-2')).toBeTruthy
  })
})
