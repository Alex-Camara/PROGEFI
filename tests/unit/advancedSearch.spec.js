import { shallowMount, createLocalVue } from "@vue/test-utils";
import advancedSearch from "@/presentation/components/advancedSearch.vue";
import Buefy from "buefy";
import { Datacard, testDatacard1 } from "./mocks/Datacard.spec";
const flushPromises = require("flush-promises");

const localVue = createLocalVue();
localVue.use(Buefy);

describe("advancedSearch component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(advancedSearch, {
      localVue
    });
  });

  it("is set visible when show prop is true", async () => {
    wrapper = shallowMount(advancedSearch, {
      localVue,
      propsData: {
        show: true
      }
    });
    expect(wrapper.isVisible()).toBe(true);
  });

  it("enables search and clean filters buttons when there is at least one filter", async () => {
    wrapper = shallowMount(advancedSearch, {
      localVue,
      propsData: {
        show: true
      }
    });
    let climateFilter = wrapper.find("#advanced_search_climate_input");
    let cleanFiltersButton = wrapper.find(
      "#advanced_search_clean_filters_button"
    );
    let searchButton = wrapper.find(
        "#advanced_search_search_button"
    );
    climateFilter.element.value = "aw";
    climateFilter.trigger("input");
    await wrapper.vm.$nextTick();
    !expect(cleanFiltersButton.attributes("disabled")).toBe("disabled");
      !expect(searchButton.attributes("disabled")).toBe("disabled");
  });
});
