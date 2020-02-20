import {shallowMount, createLocalVue} from '@vue/test-utils';
import taxonomicalDataForm
  from '@/presentation/components/taxonomicalDataForm.vue';
import SpeciesData from '@/presentation/models/speciesData.js';
import Datacard from '@/presentation/models/datacard.js';
import Buefy from 'buefy';
import VueObserveVisibility from 'vue-observe-visibility';
const flushPromises = require ('flush-promises');
import axios from 'axios';
import {Store} from 'vuex-mock-store';

jest.mock ('axios');

let methods = {
  getSpeciesByScientificName: jest.fn (),
};

let computed = {
  family: 'Felidae',
  species: 'Felis catus',
};

const store = new Store ({
  state: {
    speciesData: {
      namespaced: true,
      speciesData: new SpeciesData (),
    },
    datacard: {
      namespaced: true,
      datacard: new Datacard (),
    },
  },
});

const mocks = {
  $store: store,
};

const localVue = createLocalVue ();
localVue.use (Buefy);
localVue.use (VueObserveVisibility);

afterEach (() => {
  store.reset ();
});

// let internetConnection = true;

describe ('taxonomicalDataForm component', () => {
  let wrapper = shallowMount (taxonomicalDataForm, {
    localVue,
    mocks,
  });

  it ('input scientific name triggers setScientific in store', async () => {
    const scientificNameInput = wrapper.find ('#scientific_name_input');
    scientificNameInput.element.value = 'felis';
    scientificNameInput.trigger ('input');
    await wrapper.vm.$nextTick ();

    expect (store.dispatch).toHaveBeenCalledWith (
      'speciesData/setScientificName',
      'felis'
    );
  });

  it ('input scientific name triggers search from thecatalogueoflife api', async () => {
    let wrapper = shallowMount (taxonomicalDataForm, {
      localVue,
      mocks,
      methods,
    });

    const scientificNameInput = wrapper.find ('#scientific_name_input');
    scientificNameInput.setValue ('felis');
    // scientificNameInput.element.value = 'felis';
    scientificNameInput.trigger ('keyup');
    await wrapper.vm.$nextTick ();

    expect (methods.getSpeciesByScientificName).toHaveBeenCalled ();
    // expect(axios.get).toBeCalledWith("http://webservice.catalogueoflife.org/col/webservice?format=json&response=full&rank=species&name=" + "felis");
  });

  it ('method setFields fills taxonomical data fields', async () => {
    let wrapper = shallowMount (taxonomicalDataForm, {
      localVue,
      mocks,
    });

    let species = {
      name: 'Felis catus',
      classification: [
        {
          rank: 'Kingdom',
          name: 'Animalia',
        },
        {
          rank: 'Phylum',
          name: 'Chordata',
        },
        {
          rank: 'Class',
          name: 'Mammalia',
        },
        {
          rank: 'Order',
          name: 'Carnivora',
        },
        {
          rank: 'Family',
          name: 'Felidae',
        },
        {
          rank: 'Genus',
          name: 'Felis',
        },
        {
          rank: 'Species',
          name: 'Felis catus',
        },
      ],
    };
    wrapper.vm.setFields (species).then (() => {
      expect (wrapper.vm.scientificName).toBe ('Felis catus');
      expect (wrapper.vm.family).toBe ('Felidae');
      expect (wrapper.vm.species).toBe ('Felis catus');
      expect (wrapper.vm.kingdom).toBe ('Animalia');
      expect (wrapper.vm.order).toBe ('Carnivora');
      expect (wrapper.vm.class).toBe ('Mammalia');
      expect (wrapper.vm.phylum).toBe ('Chordata');
      expect (wrapper.vm.genus).toBe ('Felis');
    });
  });

  it ('input scientific name triggers response from thecatalogueoflife api', async () => {
    let wrapper = shallowMount (taxonomicalDataForm, {
      localVue,
      mocks,
    });
    const scientificNameInput = wrapper.find ('#scientific_name_input');
    scientificNameInput.setValue ('felis');
    scientificNameInput.element.value = 'felis';
    scientificNameInput.trigger ('keyup');
    await wrapper.vm.$nextTick ();

    setTimeout (function () {
      expect (axios.get).toBeCalledWith (
        'http://webservice.catalogueoflife.org/col/webservice?format=json&response=full&rank=species&name=' +
          'felis'
      );
    }, 3000);
  });
});
