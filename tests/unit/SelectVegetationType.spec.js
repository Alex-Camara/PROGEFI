import { shallowMount, createLocalVue } from "@vue/test-utils";
import selectVegetationType from "@/presentation/components/selectVegetationType.vue";
import Datacard from "@/presentation/models/datacard.js";
import Buefy from "buefy";
const flushPromises = require("flush-promises");
import { Store } from "vuex-mock-store";
import {
  VegetalFormation,
  testVegetalFormation2,
  testVegetalFormation1,
  testVegetationType1
} from "./mocks/VegetalFormation.spec";
import {loadDatacardValues, testDatacard1} from "./mocks/Datacard.spec";

jest.mock("@/presentation/models/vegetalFormation.js");
jest.mock("@/presentation/models/vegetationType.js");

let addOption = jest.fn()

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

describe("selectVegetationType component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(selectVegetationType, {
      localVue,
      mocks,
    });
    VegetalFormation.mockClear();
  });

  it("loads initial values on component mount", async () => {
    expect(wrapper.vm.vegetalFormations).toStrictEqual([
      testVegetalFormation1,
      testVegetalFormation2
    ]);
  });

  it("sets vegetal formation and shows the corresponding vegetation types", async () => {
    let vegetalFormationList = wrapper.find(
      "#select_vegetation_vegetal_formation_list_item"
    );
    vegetalFormationList.element.value = testVegetalFormation1;
    vegetalFormationList.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectedVegetalFormation).toStrictEqual(
      testVegetalFormation1.getName()
    );
    expect(wrapper.vm.selectedVegetationTypes).toStrictEqual([
      testVegetationType1
    ]);
  });

  it("sets the selected vegetation type to the selected by the user", async () => {
    let vegetalFormationList = wrapper.find(
        "#select_vegetation_vegetal_formation_list_item"
    );
    vegetalFormationList.element.value = testVegetalFormation1;
    vegetalFormationList.trigger("click");
    await wrapper.vm.$nextTick();
    let vegetationTypeList = wrapper.find("#select_vegetation_type_list_item")
    vegetationTypeList.element.value = testVegetationType1;
    vegetationTypeList.trigger('click')
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectedVegetationType).toEqual(store.state.datacard.datacard.getCollect().getVegetationType());
  });

  it('triggers method addOption when menu addOption is clicked', async () => {
    wrapper.vm.addOption = addOption;

    const addOptionButton = wrapper.find("#select_vegetation_container_header_addOption")
    addOptionButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(addOption).toHaveBeenCalled()
  });

  it("sets values according to dacatacard draft", async () => {
    await loadDatacardValues();

    store.state.datacard.datacard = testDatacard1;
    wrapper.vm.$forceUpdate();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedVegetationType).toEqual(testDatacard1.collect.vegetationType);
  });
});
