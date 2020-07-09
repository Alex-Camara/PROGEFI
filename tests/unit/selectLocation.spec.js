import { shallowMount, createLocalVue } from "@vue/test-utils";
import selectLocation from "@/presentation/components/selectLocation.vue";
import Datacard from "@/presentation/models/datacard.js";
import Buefy from "buefy";
import VueObserveVisibility from "vue-observe-visibility";
import { Store } from "vuex-mock-store";
import Collect from "../../src/presentation/models/collect";
import axios from "axios";
import {loadModelValues, testModel1} from "./mocks/Model.spec";
import {loadDatacardValues, testDatacard1} from "./mocks/Datacard.spec";
import {testCatalogue1} from "./mocks/Catalogue.spec";
import {testCollector1} from "./mocks/Collector.spec";
import {testProject1} from "./mocks/Project.spec";

jest.mock("axios");

const store = new Store({
  state: {
    datacard: {
      namespaced: true,
      datacard: new Datacard()
    },
    metadata: {
      namespaced: true,
      hasMetadata: false,
      collect: new Collect()
    }
  }
});

const mocks = {
  $store: store
};

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(VueObserveVisibility);
localVue.use(axios);

describe("selectLocation component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(selectLocation, {
      localVue,
      mocks
    });
  });

  it("change longitude on input", async () => {
    await wrapper.vm.$nextTick();
    wrapper.vm.longitude = -96.873879;
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    let longitudeInput = wrapper.find("#longitude_input");
    expect(longitudeInput.element.value).toStrictEqual("-96.873879");
  });

  it("writes alphabetic character in longitude input", async () => {
    wrapper.vm.longitude = "-96.87387";
    await wrapper.vm.$nextTick();
    wrapper.vm.longitude = "-96.87387a";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.longitude).toStrictEqual("-96.87387");
  });

  it("writes not allowed character in longitude input", async () => {
    wrapper.vm.longitude = "-96.8738";
    await wrapper.vm.$nextTick();
    wrapper.vm.longitude = "-96.8738@";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.longitude).toStrictEqual("-96.8738");
  });

  it("writes metadata value on longitude input when metadata is available", async () => {
    await store.state.metadata.collect.setLongitude("20.021");
    store.state.metadata.hasMetadata = true;

    wrapper = shallowMount(selectLocation, {
      localVue,
      mocks
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.longitude).toStrictEqual("20.021");
  });

  it("sets longitude below minimal limit", async () => {
    wrapper.vm.longitude = "-18";
    await wrapper.vm.$nextTick();
    wrapper.vm.longitude = "-181";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.longitude).toStrictEqual("-18");
  });

  it("sets longitude above maximal limit", async () => {
    wrapper.vm.longitude = "18";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.longitude = "181";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.longitude).toStrictEqual("18");
  });

  it("writes metadata value on latitude input when metadata is available", async () => {
    await store.state.metadata.collect.setLatitude("18.071");
    store.state.metadata.hasMetadata = true;

    wrapper = shallowMount(selectLocation, {
      localVue,
      mocks
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.latitude).toStrictEqual("18.071");
  });

  it("writes alphabetic character in latitude input", async () => {
    wrapper.vm.latitude = "-96.87387";
    await wrapper.vm.$nextTick();
    wrapper.vm.latitude = "-96.87387a";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.latitude).toStrictEqual("-96.87387");
  });

  it("writes not allowed character in latitude input", async () => {
    wrapper.vm.latitude = "-96.8738";
    await wrapper.vm.$nextTick();
    wrapper.vm.latitude = "-96.8738@";
    await wrapper.vm.$nextTick();
    // let longitudeInput = wrapper.find("#longitude_input");
    expect(wrapper.vm.latitude).toStrictEqual("-96.8738");
  });

  it("sets latitude below minimal limit", async () => {
    wrapper.vm.latitude = "-18";
    await wrapper.vm.$nextTick();
    wrapper.vm.latitude = "-181";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.latitude).toStrictEqual("-18");
  });

  it("sets latitude above maximal limit", async () => {
    wrapper.vm.latitude = "18";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.latitude = "181";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.latitude).toStrictEqual("18");
  });

  it("change latitude on input", async () => {
    await wrapper.vm.$nextTick();
    wrapper.vm.latitude = 19.516454;
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    let latitudeInput = wrapper.find("#latitude_input");
    expect(latitudeInput.element.value).toStrictEqual("19.516454");
  });

  it("change altitude on input", async () => {
    await wrapper.vm.$nextTick();
    wrapper.vm.altitude = 2000;
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    let altitudeInput = wrapper.find("#altitude_input");
    expect(altitudeInput.element.value).toStrictEqual("2000");
  });

  it("writes metadata value on altitude input when metadata is available", async () => {
    await store.state.metadata.collect.setAltitude("2250");
    store.state.metadata.hasMetadata = true;

    wrapper = shallowMount(selectLocation, {
      localVue,
      mocks
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.altitude).toStrictEqual("2250");
  });

  it("writes alphabetic character in altitude input", async () => {
    wrapper.vm.altitude = "200";
    await wrapper.vm.$nextTick();
    wrapper.vm.altitude = "200a";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.altitude).toStrictEqual("200");
  });

  it("writes not allowed character in altitude input", async () => {
    wrapper.vm.altitude = "200";
    await wrapper.vm.$nextTick();
    wrapper.vm.altitude = "200@";
    await wrapper.vm.$nextTick();
    // let longitudeInput = wrapper.find("#longitude_input");
    expect(wrapper.vm.altitude).toStrictEqual("200");
  });

  it("sets altitude below minimal limit", async () => {
    wrapper.vm.altitude = "-99";
    await wrapper.vm.$nextTick();
    wrapper.vm.altitude = "-100";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.altitude).toStrictEqual("-99");
  });

  it("sets altitude above maximal limit", async () => {
    wrapper.vm.altitude = "8000";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.altitude = "8001";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.altitude).toStrictEqual("8000");
  });

  it("writes numbers in country", async () => {
    wrapper.vm.country = "México";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.country = "México1";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.country).toStrictEqual("México");
  });

  it("writes minimal numbers of characters in country", async () => {
    wrapper.vm.country = "Mé";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.datacard.getCollect().getCountryValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("writes maximal numbers of characters in country", async () => {
    wrapper.vm.country =
      "The United Kingdom of Great Britain and Northern Ireland";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.country =
      "The United Kingdom of Great Britain and Northern Irelandy";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.country).toStrictEqual(
      "The United Kingdom of Great Britain and Northern Ireland"
    );
  });

  it("writes numbers in country state", async () => {
    wrapper.vm.countryState = "Veracru";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.countryState = "Veracru2";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.countryState).toStrictEqual("Veracru");
  });

  it("writes minimal numbers of characters in country state", async () => {
    wrapper.vm.countryState = "Ve";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(
      wrapper.vm.datacard.getCollect().getCountryStateValid()
    ).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("writes maximal numbers of characters in country state", async () => {
    wrapper.vm.countryState =
      "The United Kingdom of Great Britain and Northern Ireland";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.countryState =
      "The United Kingdom of Great Britain and Northern Irelandy";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.countryState).toStrictEqual(
      "The United Kingdom of Great Britain and Northern Ireland"
    );
  });

  it("writes numbers in municipality", async () => {
    wrapper.vm.municipality = "Xalap";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.municipality = "Xalap4";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.municipality).toStrictEqual("Xalap");
  });

  it("writes minimal numbers of characters in municipality", async () => {
    wrapper.vm.municipality = "Xa";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(
      wrapper.vm.datacard.getCollect().getMunicipalityValid()
    ).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("writes maximal numbers of characters in municipality", async () => {
    wrapper.vm.municipality =
      "Taumatawhakatangi­hangakoauauotamatea­turipukakapikimaunga­horonukupokaiwhen­uak";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.municipality =
      "Taumatawhakatangi­hangakoauauotamatea­turipukakapikimaunga­horonukupokaiwhen­uaka";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.municipality).toStrictEqual(
      "Taumatawhakatangi­hangakoauauotamatea­turipukakapikimaunga­horonukupokaiwhen­uak"
    );
  });

  it("writes numbers in locality", async () => {
    wrapper.vm.locality = "Xalap";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.locality = "Xalap4";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.locality).toStrictEqual("Xalap");
  });

  it("writes minimal numbers of characters in locality", async () => {
    wrapper.vm.locality = "Xa";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.datacard.getCollect().getLocalityValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("writes maximal numbers of characters in locality", async () => {
    wrapper.vm.locality =
      "Taumatawhakatangi­hangakoauauotamatea­turipukakapikimaunga­horonukupokaiwhen­uak";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.locality =
      "Taumatawhakatangi­hangakoauauotamatea­turipukakapikimaunga­horonukupokaiwhen­uaks";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.locality).toStrictEqual(
      "Taumatawhakatangi­hangakoauauotamatea­turipukakapikimaunga­horonukupokaiwhen­uak"
    );
  });

  it("calls to nominatim api and loads location values", async () => {
    let getMock = jest.fn();
    getMock.mockReturnValue(
      Promise.resolve({
        data: {
          address: {
            country: "México",
            county: "Xalapa",
            city: "Xalapa",
            state: "Veracruz"
          }
        }
      })
    );

    axios.get = getMock;
    await wrapper.vm.$nextTick();
    let latitude = 19.516454;
    let longitude = -96.873879;
    await wrapper.vm.getAddress(latitude, longitude);
    await wrapper.vm.$nextTick();
    expect(axios.get).toHaveBeenCalledWith(
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=19.516454&lon=-96.873879"
    );
    expect(wrapper.vm.country).toEqual("México");
    expect(wrapper.vm.countryState).toEqual("Veracruz");
    expect(wrapper.vm.municipality).toEqual("Xalapa");
    expect(wrapper.vm.locality).toEqual("Xalapa");
  });

  it("calls to nominatim api and returns error, it sets location on blank", async () => {
    let getMock = jest.fn();
    getMock.mockReturnValue(Promise.reject({}));
    axios.get = getMock;
    await wrapper.vm.$nextTick();
    let latitude = 19.516454;
    let longitude = -96.873879;
    await wrapper.vm.getAddress(latitude, longitude);
    await wrapper.vm.$nextTick();
    expect(axios.get).toHaveBeenCalledWith(
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=19.516454&lon=-96.873879"
    );
    expect(wrapper.vm.country).toEqual("");
    expect(wrapper.vm.countryState).toEqual("");
    expect(wrapper.vm.municipality).toEqual("");
    expect(wrapper.vm.locality).toEqual("");
  });

  it("searches the city value in api nominatim response", async () => {
    let address1 = {
      country: "México",
      county: "Xalapa",
      city: "Xalapa",
      state: "Veracruz"
    };

    let address2 = {
      country: "México",
      county: "Xalapa",
      hamlet: "Xalapa",
      state: "Veracruz"
    };

    let address3 = {
      country: "México",
      county: "Xalapa",
      village: "Xalapa",
      state: "Veracruz"
    };

    let address4 = {
      country: "México",
      county: "Xalapa",
      town: "Xalapa",
      state: "Veracruz"
    };
    let locality1 = wrapper.vm.getLocality(address1);
    let locality2 = wrapper.vm.getLocality(address2);
    let locality3 = wrapper.vm.getLocality(address3);
    let locality4 = wrapper.vm.getLocality(address4);

    expect(locality1).toStrictEqual("Xalapa");
    expect(locality2).toStrictEqual("Xalapa");
    expect(locality3).toStrictEqual("Xalapa");
    expect(locality4).toStrictEqual("Xalapa");
  });

  it("sets values according to dacatacard draft", async () => {
    await loadDatacardValues();

    store.state.datacard.datacard = testDatacard1;
    wrapper.vm.$forceUpdate();
    await wrapper.vm.$nextTick();
    // await flushPromises();

    expect(wrapper.vm.longitude).toEqual(testDatacard1.collect.longitude);
    expect(wrapper.vm.latitude).toEqual(testDatacard1.collect.latitude);
    expect(wrapper.vm.altitude).toEqual(testDatacard1.collect.altitude);
    expect(wrapper.vm.country).toEqual(testDatacard1.collect.country);
    expect(wrapper.vm.countryState).toEqual(testDatacard1.collect.countryState);
    expect(wrapper.vm.municipality).toEqual(testDatacard1.collect.municipality);
    expect(wrapper.vm.locality).toEqual(testDatacard1.collect.locality);
  });
});
