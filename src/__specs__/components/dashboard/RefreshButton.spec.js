/* global describe, expect, it, beforeEach, require, spyOn */
import { mount } from 'vue-test-utils'
import RefreshButton from '@/components/dashboard/RefreshButton'

describe('RefreshButton', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(RefreshButton)
  })

  it('calls loadData when clicked', () => {
    const stub = spyOn(wrapper.vm, 'loadData')
    wrapper.setMethods({ loadData: stub })

    wrapper.find('button').trigger('click')
    expect(wrapper.vm.loadData).toBeCalled()
  })

  it('emits event loadData when clicked', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted().loadData).toBeTruthy()
  })
})
