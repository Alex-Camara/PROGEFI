import { shallowMount, createLocalVue } from "@vue/test-utils";
import UICreateCatalogue from "@/presentation/views/UICreateCatalogue.vue";
import Buefy from "buefy";
import {testCatalogue1, testCatalogue2} from "./mocks/Catalogue.spec";
import { Store } from "vuex-mock-store";
const flushPromises = require("flush-promises");

const store = new Store({
  modules: {
    loading: {
      namespaced: true,
      active: false,
      loadingMessage: ""
    }
  }
});

const mocks = {
  $store: store
};

const localVue = createLocalVue();
localVue.use(Buefy);

describe("generalDataForm component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(UICreateCatalogue, {
      localVue,
      mocks
    });
  });

  it("on load disable create button", async () => {
    let createButton = wrapper.find("#ui_create_catalogue_create_button");
    expect(createButton.classes()).toContain("float_button_lateral_disabled");
  });

  it("enables create button when catalogue is valid", async () => {
    wrapper.vm.isCatalogueValid = true;
    let createButton = wrapper.find("#ui_create_catalogue_create_button");
    !expect(createButton.classes()).toContain("float_button_lateral_disabled");
  });

  it("creates catalogue", async () => {
    const mockSave = jest.fn();
    mockSave.mockReturnValue(Promise.resolve());
    testCatalogue1.save = mockSave;

    wrapper = shallowMount(UICreateCatalogue, {
      localVue,
      mocks
    });

    wrapper.vm.catalogue = testCatalogue1;
    await wrapper.vm.$nextTick();
    let createButton = wrapper.find("#ui_create_catalogue_create_button");
    createButton.trigger("click");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(testCatalogue1.save).toHaveBeenCalled();
  });
});
