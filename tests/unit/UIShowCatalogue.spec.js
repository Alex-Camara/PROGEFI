import { shallowMount, createLocalVue } from "@vue/test-utils";
import UIShowCatalogue from "@/presentation/views/UIShowCatalogue.vue";
import Buefy from "buefy";
import { Catalogue, testCatalogue1 } from "./mocks/Catalogue.spec";
import Collection from "./mocks/Collection.spec";
const flushPromises = require("flush-promises");

let deleteCatalogueMethod = jest.fn();
let openDialogMethod = jest.fn();
let onConfirmMock = jest.fn();
openDialogMethod.onConfirm = onConfirmMock;

let methods ={
  deleteCatalogue: deleteCatalogueMethod,
  openDialog: openDialogMethod
}

const localVue = createLocalVue();
localVue.use(Buefy);

describe("ui show catalogue view", () => {
  let wrapper;
  let propCatalogue;
  beforeEach(() => {
    propCatalogue = testCatalogue1;
    wrapper = shallowMount(UIShowCatalogue, {
      localVue,
      methods,
      propsData: { catalogue: propCatalogue }
    });
  });

  it("triggers delete catalogue method when delete button clicked", async () => {
    let deleteButton = wrapper.find("#ui_show_catalogue_delete_button");
    deleteButton.trigger("click");
    await wrapper.vm.$nextTick();
    expect(methods.deleteCatalogue).toHaveBeenCalled();
  });
});
