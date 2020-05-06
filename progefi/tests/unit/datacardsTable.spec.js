import { shallowMount, createLocalVue } from "@vue/test-utils";
import datacardsTable from "@/presentation/components/datacardsTable.vue";
import Buefy from "buefy";
import { Datacard, testDatacard1, mockGetSorted } from "./mocks/Datacard.spec";
const flushPromises = require("flush-promises");

const localVue = createLocalVue();
localVue.use(Buefy);

describe("generalDataForm component", () => {
  let wrapper;
  beforeEach(() => {
    Datacard.getSorted = mockGetSorted;
    wrapper = shallowMount(datacardsTable, {
      localVue
    });
  });

  it("loads datacards on component mount", async () => {
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.datacards).toStrictEqual([testDatacard1]);
  });

  it("loads datacards null message if datacard's lenght is 0", async () => {
    let mockGetSortedEmpty = mockGetSorted;
    mockGetSortedEmpty.mockReturnValue(Promise.resolve([]));
    wrapper = shallowMount(datacardsTable, {
      localVue
    });
    await wrapper.vm.$nextTick();
    await flushPromises();
    let nullMesageDiv = wrapper.find("#datacards_table_null_datacards_message");
    expect(wrapper.vm.datacards).toStrictEqual([]);
    expect(nullMesageDiv.isVisible()).toBe(true);
  });

  it("enables 'load more' button when current datacard's length is bigger or equal to offset", async () => {
    let mockGetSortedEmpty = mockGetSorted;
    mockGetSortedEmpty.mockReturnValue(
      Promise.resolve([
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1
      ])
    );
    wrapper = shallowMount(datacardsTable, {
      localVue
    });
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.disableLoadMoreButton).toBe(false);
  });

  it("triggers gerSorted method when 'load more' button is clicked", async () => {
    let mockGetSortedEmpty = mockGetSorted;
    mockGetSortedEmpty.mockReturnValue(
      Promise.resolve([
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1
      ])
    );
    wrapper = shallowMount(datacardsTable, {
      localVue
    });
    await wrapper.vm.$nextTick();
    await flushPromises();
    let loadMoreButton = wrapper.find("#datacards_table_load_button");
    loadMoreButton.trigger("click");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(Datacard.getSorted).toHaveBeenCalled();
  });

  it("disables 'load more' button if offset is bigger than the current datacard's length", async () => {
    let mockGetSortedEmpty = mockGetSorted;
    mockGetSortedEmpty.mockReturnValue(
      Promise.resolve([
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1,
        testDatacard1
      ])
    );
    wrapper = shallowMount(datacardsTable, {
      localVue
    });
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.disableLoadMoreButton).toBe(true);
  });
});
