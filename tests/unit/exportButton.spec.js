import { shallowMount, createLocalVue } from "@vue/test-utils";
import exportButton from "@/presentation/components/exportButton.vue";
import Buefy from "buefy";
const flushPromises = require("flush-promises");

let methods = {
    setDirectory: jest.fn()
};

const localVue = createLocalVue();
localVue.use(Buefy);

describe("exportButton component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(exportButton, {
      localVue,
      methods
    });
  });

  // it("sets jpeg on jpeg menu selection", async () => {
  //   let menuList = wrapper.find("#export_button_export_options");
  //   menuList.element.value = "JPEG";
  //   menuList.trigger("click");
  //   await wrapper.vm.$nextTick();
  //   await flushPromises();
  //   expect(methods.setDirectory).toHaveBeenCalled();
  // });
});
