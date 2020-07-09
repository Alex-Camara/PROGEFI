import { shallowMount, createLocalVue } from "@vue/test-utils";
import showCollection from "@/presentation/components/showCollection.vue";
import Buefy from "buefy";
import { Collection, testCollection1 } from "./mocks/Collection.spec";

const localVue = createLocalVue();
localVue.use(Buefy);

describe("showCollection component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(showCollection, {
      localVue,
      propsData: {
        collection: testCollection1
      }
    });
  });

  it("loads collection when passed by prop", async () => {
    expect(wrapper.vm.collection).toStrictEqual(testCollection1);
  });

  it("shows null message if there is no collection", async () => {
    wrapper = shallowMount(showCollection, {
      localVue,
      propsData: {
        collection: new Collection(),
        thereIsNoCollection: true
      }
    });
    let divMessage = wrapper.find("#show_collection_null_message");
    expect(divMessage.isVisible()).toBe(true);
  });
});
