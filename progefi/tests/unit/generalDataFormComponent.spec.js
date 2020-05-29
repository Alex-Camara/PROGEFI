import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import generalDataForm from "@/presentation/components/generalDataForm.vue";
import Datacard from "@/presentation/models/datacard.js";
// import Collector from "@/presentation/models/collector.js";
import Buefy from "buefy";
import { Store } from "vuex-mock-store";
import Collect from "../../src/presentation/models/collect";
const flushPromises = require("flush-promises");
import {Catalogue, testCatalogue1, testCatalogue2} from "./mocks/Catalogue.spec";
import { Collection, testCollection1 } from "./mocks/Collection.spec";
import { Project, testProject1 } from "./mocks/Project.spec";
import { testDatacard1, loadDatacardValues } from "./mocks/Datacard.spec";
import {
  Device,
  loadDeviceValues,
  testDevice1,
  testDevice2
} from "./mocks/Device.spec";
import {
  Model,
  loadModelValues,
  testModel1,
  testModel2
} from "./mocks/Model.spec";
import {
  Collector,
  testCollector1,
  testCollector2
} from "./mocks/Collector.spec";
// const { ipcRenderer } = require("electron");
//
// jest.mock(
//   "electron",
//   () => {
//     const mElectron = { ipcRenderer: { once: jest.fn(), send: jest.fn() } };
//     return mElectron;
//   },
//   { virtual: true }
// );

// jest.mock("@/presentation/models/catalogue.js");
// jest.mock("@/presentation/models/collection.js");
jest.mock("@/presentation/models/project.js");
// jest.mock("@/presentation/models/collector.js");

let setCollector = jest.fn();
setCollector.mockReturnValue(testCollector1);

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    datacard: {
      namespaced: true,
      state: {
        datacard: new Datacard()
      },
      actions: {
        setCollector: setCollector
      }
    },
    metadata: {
      namespaced: true,
      state: {
        hasMetadata: false,
        collect: new Collect()
      }
    },
    modal: {
      namespaced: true,
    }
  }
});

const mocks = {
  $store: store
};

describe("generalDataForm component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(generalDataForm, {
      localVue,
      mocks
    });
    // Catalogue.mockClear();
    // Collection.mockClear();
    Project.mockClear();
    // Collector.mockClear();
  });

  it("loads initial values on component mount", async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.collection).toStrictEqual(testCollection1);
    expect(wrapper.vm.catalogues).toStrictEqual([testCatalogue1, testCatalogue2]);
    expect(wrapper.vm.projects).toStrictEqual([testProject1]);
  });

  // it("set collectors select visible after catalogue selection", async () => {
  //   wrapper = shallowMount(generalDataForm, {
  //     localVue,
  //     mocks
  //   });
  //   await wrapper.vm.$nextTick();
  //   wrapper.vm.selectedCatalogue = testCatalogue1;
  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.find("#collector_select").attributes("disabled")).toBe(
  //     "disabled"
  //   );
  // });

  it("sets datacard code on catalogue selection", async () => {
    await wrapper.vm.$nextTick();
    testCatalogue1.setDatacardCount(10);
    wrapper.vm.selectedCatalogue = testCatalogue1;
    await wrapper.vm.$nextTick();
    expect(store.state.datacard.datacard.getCode()).toStrictEqual(
      "IIB-CATA 00010f"
    );
  });

  it("sets datacard code on catalogue selection with three digit number", async () => {
    await wrapper.vm.$nextTick();
    testCatalogue1.setDatacardCount(101);
    wrapper.vm.selectedCatalogue = testCatalogue1;
    await wrapper.vm.$nextTick();
    expect(store.state.datacard.datacard.getCode()).toStrictEqual(
      "IIB-CATA 00101f"
    );
  });

  it("writes minimal numbers of characters in collector", async () => {
    const mockGetExisting = jest.fn();
    mockGetExisting.mockReturnValue(false);
    Collector.getExisting = mockGetExisting;

    let mockVerifyDuplicateCode = jest.fn();
    mockVerifyDuplicateCode.mockReturnValue("RRE");
    store.state.datacard.datacard
      .getCollect()
      .getCollector().verifyDuplicateCode = mockVerifyDuplicateCode;

    wrapper = shallowMount(generalDataForm, {
      localVue,
      mocks
    });

    wrapper.vm.selectedCatalogue = testCatalogue1;
    await wrapper.vm.$nextTick();
    wrapper.vm.selectedCollector = "A";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(
      wrapper.vm.datacard
        .getCollect()
        .getCollector()
        .getValid()
    ).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets datacard collector code when a collector is selected", async () => {
    const mockGenerateCode = jest.fn();
    mockGenerateCode.mockImplementation(
      store.state.datacard.datacard.setCollectorCode("RRE 0001")
    );
    store.state.datacard.datacard.generateCollectorCode = mockGenerateCode;

    const mockGetExisting = jest.fn();
    mockGetExisting.mockReturnValue(false);
    Collector.getExisting = mockGetExisting;

    let mockVerifyDuplicateCode = jest.fn();
    mockVerifyDuplicateCode.mockReturnValue("RRE");
    store.state.datacard.datacard
      .getCollect()
      .getCollector().verifyDuplicateCode = mockVerifyDuplicateCode;

    wrapper.vm.selectedCatalogue = testCatalogue1;
    await wrapper.vm.$nextTick();
    wrapper.vm.selectedCollector = testCollector1;
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.datacard.getCollectorCode()).toStrictEqual("RRE 0001");
  });

  it("writes maximal numbers of characters in collector", async () => {
    const mockGetExisting = jest.fn();
    mockGetExisting.mockReturnValue(false);
    Collector.getExisting = mockGetExisting;

    let mockVerifyDuplicateCode = jest.fn();
    mockVerifyDuplicateCode.mockReturnValue("RRE");
    store.state.datacard.datacard
      .getCollect()
      .getCollector().verifyDuplicateCode = mockVerifyDuplicateCode;

    wrapper.vm.selectedCatalogue = testCatalogue1;
    await wrapper.vm.$nextTick();
    wrapper.vm.selectedCollector =
      "Hubert Blaine Wolfeschlegelsteinhausenbergerdorffr";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.selectedCollector =
      "Hubert Blaine Wolfeschlegelsteinhausenbergerdorffra";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(
      wrapper.vm.datacard
        .getCollect()
        .getCollector()
        .getName()
    ).toStrictEqual("Hubert Blaine Wolfeschlegelsteinhausenbergerdorffr");
  });

  it("leaves collector empty", async () => {
    const mockGetExisting = jest.fn();
    mockGetExisting.mockReturnValue(false);
    Collector.getExisting = mockGetExisting;

    let mockVerifyDuplicateCode = jest.fn();
    mockVerifyDuplicateCode.mockReturnValue("RRE");
    store.state.datacard.datacard
      .getCollect()
      .getCollector().verifyDuplicateCode = mockVerifyDuplicateCode;

    wrapper.vm.selectedCatalogue = testCatalogue1;
    await wrapper.vm.$nextTick();
    wrapper.vm.selectedCollector = "";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(
      wrapper.vm.datacard
        .getCollect()
        .getCollector()
        .getValid()
    ).toStrictEqual({
      isValid: false,
      message: "Campo requerido"
    });
  });

  it("adds numbers to collector", async () => {
    const mockGetExisting = jest.fn();
    mockGetExisting.mockReturnValue(false);
    Collector.getExisting = mockGetExisting;

    let mockVerifyDuplicateCode = jest.fn();
    mockVerifyDuplicateCode.mockReturnValue("RRE");
    store.state.datacard.datacard
      .getCollect()
      .getCollector().verifyDuplicateCode = mockVerifyDuplicateCode;

    wrapper.vm.selectedCatalogue = testCatalogue1;
    await wrapper.vm.$nextTick();
    wrapper.vm.selectedCollector = "Ale";
    await wrapper.vm.$nextTick();
    wrapper.vm.selectedCollector = "Ale5";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.selectedCollector).toStrictEqual("Ale");
  });

  it("enters the name of an existing collector, so the system recovers said collector and selects it", async () => {
    const mockGetExisting = jest.fn();
    mockGetExisting.mockReturnValue(testCollector1);
    Collector.getExisting = mockGetExisting;

    let mockVerifyDuplicateCode = jest.fn();
    mockVerifyDuplicateCode.mockReturnValue("KJD");
    store.state.datacard.datacard
      .getCollect()
      .getCollector().verifyDuplicateCode = mockVerifyDuplicateCode;
    testCollector1.verifyDuplicateCode = mockVerifyDuplicateCode;

    wrapper.vm.selectedCatalogue = testCatalogue1;
    await wrapper.vm.$nextTick();
    wrapper.vm.selectedCollector = "Roberto Ruíz Esparza";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(
      store.state.datacard.datacard.getCollect().getCollector()
    ).toStrictEqual(testCollector1);
  });

  it("loads devices on character entered", async () => {
    await loadDeviceValues();
    await loadModelValues();
    wrapper.vm.selectedDevice = "a";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.devices).toStrictEqual([testDevice1, testDevice2]);
    expect(wrapper.vm.models).toStrictEqual([testModel1, testModel2]);
  });

  it("writes numbers in device", async () => {
    wrapper.vm.selectedDevice = "Motorol";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.selectedDevice = "Motorol4";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.selectedDevice).toStrictEqual("Motorol");
  });

  it("writes minimal numbers of characters in device", async () => {
    wrapper.vm.selectedDevice = "M";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    // await flushPromises();
    expect(wrapper.vm.datacard.getCollect().getModel().getDevice().getValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("writes maximal numbers of characters in device", async () => {
    wrapper.vm.selectedDevice = "Motorola Apple NVdia SamsungLG";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.selectedDevice = "Motorola Apple NVdia SamsungLGT";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    // await flushPromises();
    expect(wrapper.vm.selectedDevice).toStrictEqual("Motorola Apple NVdia SamsungLG");
  });

  it("writes not allowed characters in device", async () => {
    wrapper.vm.selectedDevice = "Motorol";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.selectedDevice = "Motorol@";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    // await flushPromises();
    expect(wrapper.vm.selectedDevice).toStrictEqual("Motorol");
  });

  it("writes minimal numbers of characters in model", async () => {
    wrapper.vm.selectedModel = "i";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    // await flushPromises();
    expect(wrapper.vm.datacard.getCollect().getModel().getValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("writes maximal numbers of characters in model", async () => {
    wrapper.vm.selectedModel = "Motorola Apple NVdia SamsungLG";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.selectedModel = "Motorola Apple NVdia SamsungLGT";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    // await flushPromises();
    expect(wrapper.vm.selectedModel).toStrictEqual("Motorola Apple NVdia SamsungLG");
  });

  it("writes not allowed characters in model", async () => {
    wrapper.vm.selectedModel = "iPhon";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.selectedModel = "iPhon@";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    // await flushPromises();
    expect(wrapper.vm.selectedModel).toStrictEqual("iPhon");
  });

  it("sets device to match the model when it's selected", async () => {
    wrapper.vm.selectedDevice = testDevice1;
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.selectedModel = "Nuevo model";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    // await flushPromises();
    expect(wrapper.vm.datacard.getCollect().getModel().getDevice()).toStrictEqual(testDevice1);
  });

  it("sets values according to dacatacard draft", async () => {
    wrapper = shallowMount(generalDataForm, {
      localVue,
      mocks,
      propsData:{
        disableFields: true
      }
    });
    await loadModelValues();
    await loadDatacardValues();

    store.state.datacard.datacard = testDatacard1;
    wrapper.vm.$forceUpdate();
    await wrapper.vm.$nextTick();
    await flushPromises();

    expect(wrapper.vm.selectedCatalogue.id).toEqual(testCatalogue1.id);
    expect(wrapper.vm.selectedCollector).toEqual(testCollector1.name);
    expect(wrapper.vm.selectedProject.id).toEqual(testProject1.id);
    expect(wrapper.vm.selectedModel).toEqual(testModel1.name);
  });
});
