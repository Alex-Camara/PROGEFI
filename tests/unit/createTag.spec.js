import { mount, createLocalVue } from "@vue/test-utils";
import createTag from "@/presentation/components/createTag.vue";
import Buefy from "buefy";
import { Store } from "vuex-mock-store";
import { Template } from "./mocks/Template.spec";

const store = new Store({
  state: {
    template: {
      namespaced: true,
      tagToCreate: null,
      tagToDelete: null
    }
  }
});

const mocks = {
  $store: store
};

const localVue = createLocalVue();
localVue.use(Buefy);

describe("createTag component", () => {
  let wrapper;
  beforeEach(async () => {
    let template = new Template();
    wrapper = mount(createTag, {
      localVue,
      mocks,
      propsData: { template }
    });
    await wrapper.vm.$nextTick();
  });

  it("disables Add Tag button when no tag is selected", async () => {
    let addTagButton = wrapper.find("#create_tag_add_tag_button");
    expect(addTagButton.attributes("disabled")).toBe("disabled");
  });

  it("enables Add Tag button when a tag is selected", async () => {
    wrapper.vm.selectedTagName = {
      tagName: "creationDate",
      model: "datacard",
      modelAttribute: "formattedCreationDate",
      tagPlaceholder: "Fecha de creación",
      example: "20/01/2020"
    };
    await wrapper.vm.$nextTick();
    let addTagButton = wrapper.find("#create_tag_add_tag_button");
    expect(addTagButton.attributes("disabled")).toBe(undefined);
  });

  // it("writes maximal characters in tag before input", async () => {
  //     // wrapper.vm.name = "Plantilla Nueva";
  //     let nameInput = wrapper.find("#create_tag_before_tag_input");
  //     nameInput.setValue("tag before test to see if it can handle more than 60 words a");
  //     nameInput.trigger("input");
  //     // await wrapper.vm.$nextTick();
  //     await flushPromises();
  //     nameInput.setValue("tag before test to see if it can handle more than 60 words atjjjjjjjj");
  //     nameInput.trigger("input");
  //     // await wrapper.vm.$nextTick();
  //     await flushPromises();
  //
  //     expect(wrapper.vm.tag.getTagBefore()).toStrictEqual(
  //         "tag before test to see if it can handle more than 60 words a"
  //     );
  //     expect(wrapper.vm.tag.getTagBeforeValid()).toStrictEqual({
  //         isValid: true,
  //         message: "temporary error"
  //     });
  // });
});
