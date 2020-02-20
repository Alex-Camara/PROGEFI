import {shallowMount, createLocalVue} from '@vue/test-utils';
import selectLocation from '@/presentation/components/selectLocation.vue';
import Location from '@/presentation/models/location.js';
import Buefy from 'buefy';
import VueObserveVisibility from 'vue-observe-visibility';
const flushPromises = require ('flush-promises');
import axios from 'axios';
import {Store} from 'vuex-mock-store';

jest.mock ('axios', () => ({
  get: jest.fn (() =>
    Promise.resolve ({
      data: "{address:{'country': 'México'}}",
    })
  ),
}));

let methods;

const store = new Store ({
  state: {
    location: {
      namespaced: true,
      location: new Location (),
    },
    coordinate: {
      namespaced: true,
      location: new Location (),
    },
    metadata: {
      namespaced: true,
      state: {
        hasMetadata: false,
        device: null,
        model: null,
        collectDate: null,
        collectHour: null,
        formattedDate: null,
        formattedHour: null,
        longitude: null,
        latitude: null,
        altitude: null,
      },
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

describe ('selectLocation component', () => {
  let wrapper = shallowMount (selectLocation, {
    localVue,
    mocks,
    methods
    // internetConnection,
  });

  it ('loads selectLocation initial values on component mount', async () => {
    let location = new Location ();
    expect (store.commit).toHaveBeenCalledWith (
      'location/setLocation',
      location
    );
    expect (store.commit).toHaveBeenCalledWith (
      'coordinate/setLocation',
      location
    );
    expect (store.dispatch).toBeCalledWith (
      'coordinate/setLatitude',
      '20.102365'
    );
    expect (store.dispatch).toBeCalledWith (
      'coordinate/setLongitude',
      '-101.433236'
    );

    // await flushPromises();

    expect (axios.get).toBeCalledWith (
      'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' +
        '20.102365' +
        '&lon=' +
        '-101.433236'
    );
    // await flushPromises();
    // console.info(wrapper.vm)
    // expect(wrapper.vm.computed.country).toEqual("México")
    // expect(store.dispatch).toBeCalledWith("location/setCountry", "México")
  });

  it ('input latitude triggers setLatitude in store', async () => {
    const latitudeInput = wrapper.find ('#latitude_input');
    latitudeInput.element.value = '19.5426';
    latitudeInput.trigger ('input');
    await wrapper.vm.$nextTick ();

    expect (store.dispatch).toHaveBeenCalledWith (
      'coordinate/setLatitude',
      '19.5426'
    );
    await flushPromises ();
    expect (axios.get).toBeCalledWith (
      'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' +
        '20.102365' +
        '&lon=' +
        '-101.433236'
    );
  });

  it ('input latitude triggers setLatitude in store', async () => {
    const latitudeInput = wrapper.find ('#latitude_input');
    latitudeInput.element.value = '19.5426';
    latitudeInput.trigger ('input');
    await wrapper.vm.$nextTick ();

    expect (store.dispatch).toHaveBeenCalledWith (
      'coordinate/setLatitude',
      '19.5426'
    );
  });

  it ('input altitude triggers setAltitude in store', async () => {
    const altitudeInput = wrapper.find ('#altitude_input');
    altitudeInput.element.value = '2000';
    altitudeInput.trigger ('input');
    await wrapper.vm.$nextTick ();

    expect (store.dispatch).toHaveBeenCalledWith (
      'coordinate/setAltitude',
      '2000'
    );
  });

  it ('input longitude triggers setLongitude in store', async () => {
    const longitudeInput = wrapper.find ('#longitude_input');
    longitudeInput.element.value = '98.125';
    longitudeInput.trigger ('input');
    await wrapper.vm.$nextTick ();

    expect (store.dispatch).toHaveBeenCalledWith (
      'coordinate/setLongitude',
      '98.125'
    );
  });

  it ('input country triggers setCountry in store', async () => {
    const countryInput = wrapper.find ('#country_input');
    countryInput.element.value = 'México';
    countryInput.trigger ('input');
    await wrapper.vm.$nextTick ();

    expect (store.dispatch).toHaveBeenCalledWith (
      'location/setCountry',
      'México'
    );
  });

  it ('input country state triggers setCountryState in store', async () => {
    const countryStateInput = wrapper.find ('#country_state_input');
    countryStateInput.element.value = 'Veracruz';
    countryStateInput.trigger ('input');
    await wrapper.vm.$nextTick ();

    expect (store.dispatch).toHaveBeenCalledWith (
      'location/setCountryState',
      'Veracruz'
    );
  });

  it ('input municipality triggers setMunicipality in store', async () => {
    const municipalityInput = wrapper.find ('#municipality_input');
    municipalityInput.element.value = 'Xalapa';
    municipalityInput.trigger ('input');
    await wrapper.vm.$nextTick ();

    expect (store.dispatch).toHaveBeenCalledWith (
      'location/setMunicipality',
      'Xalapa'
    );
  });

  it ('input locality triggers setLocality in store', async () => {
    const localityInput = wrapper.find ('#locality_input');
    localityInput.element.value = 'Xalapa';
    localityInput.trigger ('input');
    await wrapper.vm.$nextTick ();

    expect (store.dispatch).toHaveBeenCalledWith (
      'location/setLocality',
      'Xalapa'
    );
  });

  it ('input coordinate triggers axios response', async () => {
    // onlineStatusGetter.mockReturnValue (false);

    wrapper.vm.center = {
      lat: '19.5426',
      lng: '100.24',
    };
    wrapper.vm.getAddress ('19.5426', '100.24');
    // internetConnection = false
    // await flushPromises();
    await wrapper.vm.$nextTick ();

    // expect(store.dispatch).toHaveBeenCalledWith("coordinate/setLatitude", '19.5426')
    expect (axios.get).toBeCalledWith (
      'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' +
        '19.5426' +
        '&lon=' +
        '100.24'
    );
  });
});
