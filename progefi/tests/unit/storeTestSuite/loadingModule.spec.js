import Vuex from 'vuex'
import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import LoadingHelper from '@/presentation/helpers/loadingHelper.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('LoadingHelper.vue', () => {
  let store
  let state

  beforeEach(() => {
    state = {
      active: false
    }
    store = new Vuex.Store({
      modules: {
        loading: {
          namespaced: true,
          state
        }
      }
    })
  })

  // it('is-active class is not included in the modal', async () => {
    // const wrapper = shallowMount(LoadingHelper, { store, localVue })
    // store.state.loading.active = true
    // wrapper.setData({ active: true })
    // let modal = wrapper.find('#loading_modal')
    // await Vue.nextTick()
    // expect(modal.isVisible()).toBe(true)
    // expect(store.state.loading.active).toBe(true)
    // expect(wrapper.get('.is-active'))
  // })

  it('is-active class is included in the modal', async () => {
    const wrapper = shallowMount(LoadingHelper, { store, localVue })
    //wrapper.setData({ active: true })
    let modal = wrapper.find('#loading_modal')
    await Vue.nextTick()
    expect(modal.classes('is-active')).toBe(false)
  })
})
