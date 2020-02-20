import Vuex from 'vuex'
import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import MetadataHelper from '@/presentation/helpers/metadataHelper.vue'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('MetadataHelper.vue', () => {
  let store
  let state
  let actionDevice

  beforeEach(() => {
    state = {
      device: 'Apple'
    }
    actionDevice = {
      setDevice: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        metadata: {
          namespaced: true,
          state
        },
        device: {
          actions: actionDevice
        }
      }
    })
  })

  it('store metadata value and display value match', async () => {
    const wrapper = shallowMount(MetadataHelper, { store, localVue })
    wrapper.setProps({ attribute: 'device' })
    let displayValueText = wrapper.find('#mh_container_text')
    await Vue.nextTick()
    expect(displayValueText.text()).toBe('Apple')
    expect(wrapper.vm.$data.isMetadata).toBe(true)
  })

  it('store metadata value and display value dont match', async () => {
    const wrapper = shallowMount(MetadataHelper, { store, localVue })
    wrapper.setProps({ selectedValue: 'Motorola', attribute: 'device' })
    let displayValueText = wrapper.find('#mh_container_text')
    await Vue.nextTick()
    expect(displayValueText.text()).toBe('Apple')
    expect(wrapper.vm.$data.isMetadata).toBe(false)
  })

  /*it('resets display value to store metadata value', async () => {
    const dispatch = jest.fn()
    const wrapper = mount(MetadataHelper, { store, localVue })
    wrapper.setProps({ selectedValue: 'Motorola', attribute: 'device' })
    let metadataHelperContainer = wrapper.find('#mh_container')
    await Vue.nextTick()
    metadataHelperContainer.trigger('click')
    await wrapper.vm.$nextTick()
     await flushPromises()
    expect(actionDevice.setDevice).toBeCalled()
    // expect(displayValueText.text()).toBe('Apple')
    // expect(wrapper.vm.$data.isMetadata).toBe(true)
  })*/
})
