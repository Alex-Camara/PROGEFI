import { shallowMount, createLocalVue } from "@vue/test-utils";
import UIShowCollection from "@/presentation/views/UIShowCollection.vue";
import Buefy from "buefy";
import { Collection, testCollection1 } from "./mocks/Collection.spec";
import {testCatalogue1, testCatalogue2} from "./mocks/Catalogue.spec";

const localVue = createLocalVue();
localVue.use(Buefy);

describe("ui showCollection view", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(UIShowCollection, {
            localVue
        });
    });

    it("loads collection on component mount", async () => {
        expect(wrapper.vm.collection).toStrictEqual(testCollection1);
    });

})