import { shallowMount, createLocalVue } from "@vue/test-utils";
import selectTemplate from "@/presentation/components/selectTemplate.vue";
import Datacard from "@/presentation/models/datacard.js";
import Buefy from "buefy";
import { Store } from "vuex-mock-store";

jest.mock("@/presentation/models/template.js");

import { Template, testTemplate1 } from "./mocks/Template.spec";

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

describe("selectTemplate component", () => {
  beforeEach(() => {
    Template.mockClear();
  });

  it("loads templates on component mount", async () => {
    let wrapper = shallowMount(selectTemplate, {
      localVue,
      mocks
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.templates).toStrictEqual([testTemplate1]);
  });

  it("sets initial selected template to the first in the templates array", async () => {
    let wrapper = shallowMount(selectTemplate, {
      localVue,
      mocks
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectedTemplate).toStrictEqual(testTemplate1);
  });
});
