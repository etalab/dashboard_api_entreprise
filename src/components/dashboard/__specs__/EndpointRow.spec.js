/* global describe, expect, it, beforeEach, require */
import { mount } from 'vue-test-utils'
import EndpointRow from '@/components/dashboard/EndpointRow'
const helper = require('./EndpointsHelper')

describe('Dashboard/EndpointRow', () => {
  const createwrapper = propsData => mount(EndpointRow, { propsData })

  it('renders a HTML row', () => {
    const wrapper = createwrapper(helper.endpoint200)
    expect(wrapper.findAll('tr td')).toHaveLength(3)
  })

  it('displays the endpoint name', () => {
    const wrapper = createwrapper(helper.endpoint200)
    const displayedName = wrapper.find('tr td:first-of-type').text()
    expect(displayedName).toEqual('Name 200')
  })

  describe('status', () => {
    it('displays UP', () => {
      const wrapper = createwrapper(helper.endpoint200)
      const displayedStatus = wrapper.find('tr td:nth-child(2)').text()
      expect(displayedStatus).toEqual('UP')
    })

    it('displays INCOMPLETE', () => {
      const wrapper = createwrapper(helper.endpoint206)
      const displayedStatus = wrapper.find('tr td:nth-child(2)').text()
      expect(displayedStatus).toEqual('INCOMPLETE')
    })

    it('displays DOWN', () => {
      const wrapper = createwrapper(helper.endpoint500)
      const displayedStatus = wrapper.find('tr td:nth-child(2)').text()
      expect(displayedStatus).toEqual('DOWN')
    })
  })

  describe('from now timestamp', () => {
    it('displays few seconds ago', () => {
      const wrapper = createwrapper(helper.endpointSecondsAgo)
      const displayedTime = wrapper.find('tr td:nth-child(3)').text()
      expect(displayedTime).toEqual('il y a quelques secondes')
    })

    it('displays 15 minutes ago', () => {
      const wrapper = createwrapper(helper.endpointMinutesAgo)
      const displayedTime = wrapper.find('tr td:nth-child(3)').text()
      expect(displayedTime).toEqual('il y a 15 minutes')
    })

    it('displays 3 hours ago', () => {
      const wrapper = createwrapper(helper.endpointHoursAgo)
      const displayedTime = wrapper.find('tr td:nth-child(3)').text()
      expect(displayedTime).toEqual('il y a 3 heures')
    })
  })
})
