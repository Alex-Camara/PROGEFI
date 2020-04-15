import { shallowMount, createLocalVue } from "@vue/test-utils";
import cataloguesTable from "@/presentation/components/cataloguesTable.vue";
import Buefy from "buefy";
import { Catalogue, testCatalogue1, testCatalogue2 } from "./mocks/Catalogue.spec";

const localVue = createLocalVue();
localVue.use(Buefy);

describe("generalDataForm component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(cataloguesTable, {
      localVue
    });
  });

    it("loads catalogues on component mount", async () => {
        expect(wrapper.vm.catalogues).toStrictEqual([testCatalogue1, testCatalogue2]);
    });

  it("shows null message if there are no catalogues", async () => {
    const mockGetAll = jest.fn();
    mockGetAll.mockReturnValue([]);
    Catalogue.getAll = mockGetAll;
    wrapper = shallowMount(cataloguesTable, {
      localVue
    });
    let divMessage = wrapper.find("#catalogues_table_null_catalogues_message");
    expect(divMessage.isVisible()).toBe(true);
  });
});
