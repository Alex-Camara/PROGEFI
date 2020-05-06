import { shallowMount, createLocalVue } from "@vue/test-utils";
import templatesTable from "@/presentation/components/templatesTable.vue";
import Buefy from "buefy";
import { Template, testTemplate1, testTemplate2 } from "./mocks/Template.spec";

const localVue = createLocalVue();
localVue.use(Buefy);

describe("showCollection component", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(templatesTable, {
            localVue
        });
    });

    it("loads templates on component mount", async () => {
        expect(wrapper.vm.templates).toStrictEqual([testTemplate1, testTemplate2]);
    });

    it("shows null message if there are no templates", async () => {
        const mockGetAll = jest.fn();
        mockGetAll.mockReturnValue([]);
        Template.getAll = mockGetAll;
        wrapper = shallowMount(templatesTable, {
            localVue
        });
        let divMessage = wrapper.find("#templates_table_null_templates_message");
        expect(divMessage.isVisible()).toBe(true);
    });
});
