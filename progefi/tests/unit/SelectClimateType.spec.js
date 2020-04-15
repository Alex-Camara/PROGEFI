import { shallowMount, createLocalVue } from "@vue/test-utils";
import selectClimateType from "@/presentation/components/selectClimateType.vue";
import Datacard from "@/presentation/models/datacard.js";
import Buefy from "buefy";
import { Store } from "vuex-mock-store";
const flushPromises = require ('flush-promises');
import {ClimateType, testClimateType1, testClimateType2} from "./mocks/ClimateType.spec";

jest.mock("@/presentation/models/climateType.js");

let methods = {
  showDescription: jest.fn(),
  showSelectedDescription: jest.fn(),
  addOption: jest.fn()
};

const store = new Store({
  state: {
    datacard: {
      namespaced: true,
      datacard: new Datacard()
    }
  }
});

const mocks = {
  $store: store
};

const localVue = createLocalVue();
localVue.use(Buefy);

describe("selectClimateType component", () => {
  let wrapper;
  beforeEach(() => {
    ClimateType.mockClear();
    wrapper = shallowMount(selectClimateType, {
      localVue,
      mocks,
      methods
    });
  });

  it("loads initial values on component mount", async () => {
    expect(wrapper.vm.climateTypes).toStrictEqual([
      testClimateType1,
      testClimateType2
    ]);
  });

  // it("sets selected climate type on user selection", async () => {
  //   let climateTypesList = wrapper.find("#select_climate_type_list_bubble");
  //   climateTypesList.element.value = testClimateType1;
  //   climateTypesList.trigger("click");
  //   await wrapper.vm.$nextTick();
  //   await flushPromises ();
  //
  //   expect(wrapper.vm.selectedClimateType).toEqual(testClimateType1);
  // });

  it("shows climate type description when hovered on it", async () => {
    const climateTypesList = wrapper.find("#select_climate_type_list_bubble");
    climateTypesList.element.value = testClimateType1;
    climateTypesList.trigger("mouseover");
    await wrapper.vm.$nextTick();

    expect(methods.showDescription).toHaveBeenCalled();
  });

  it("hides hovered climate type description and shows selected climate type description", async () => {
    // set the selected climate type
    wrapper.vm.selectedClimateType = testClimateType1;

    const climateTypesList = wrapper.find("#select_climate_type_list_bubble");
    climateTypesList.element.value = testClimateType2;
    climateTypesList.trigger("mouseover");
    await wrapper.vm.$nextTick();

    climateTypesList.trigger("mouseleave");
    await wrapper.vm.$nextTick();

    expect(methods.showSelectedDescription).toHaveBeenCalled();
  });

  it("triggers method addOption when add option menu is clicked", async () => {
    const addOptionButton = wrapper.find(
      "#select_climate_type_container_header_addOption"
    );
    addOptionButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(methods.addOption).toHaveBeenCalled();
  });
});
