import RequiredField from './helpers/requiredFieldHelper.vue'
import { mount } from '@vue/test-utils'

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(RequiredField)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
