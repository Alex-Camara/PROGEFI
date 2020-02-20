import Vuex from 'vuex';
import {
  mount,
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import observationInput from '@/presentation/components/observationInput.vue';
import Datacard from '@/presentation/models/datacard.js';
import Buefy from 'buefy';
import {
  Store
} from 'vuex-mock-store'

const store = new Store({
  state: {
    datacard: {
      namespaced: true,
      datacard: new Datacard()
    }
  }
})

const mocks = {
  $store: store,
}

const localVue = createLocalVue();
localVue.use(Buefy);

afterEach(() => {
  store.reset()
})

describe('observationInput component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(observationInput, {
      localVue,
      mocks
    });
  });

  it('triggers mutation setObservations in store', async () => {
    const textArea = wrapper.find({
      ref: "observation_input_text_area"
    })
    textArea.setValue('prueba')

    await wrapper.vm.$nextTick()
    expect(textArea.is('textarea')).toBe(true)
    expect(store.commit).toHaveBeenCalledWith('datacard/setObservations', 'prueba')
  });
});