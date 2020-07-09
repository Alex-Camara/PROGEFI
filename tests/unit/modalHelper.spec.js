import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import modalHelper from "@/presentation/helpers/modalHelper.vue";
import Buefy from "buefy";
import { Project, testProject1 } from "./mocks/Project.spec";
const flushPromises = require("flush-promises");

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    modal: {
      namespaced: true,
      state: {
        active: false,
        title: "Agregar proyecto",
        fieldText: "Ingresa el nombre del proyecto:",
        model: testProject1,
        getter: "getName",
        setter: "setName",
        getterValid: "getNameValid"
      }
    }
  }
});

const mocks = {
  $store: store
};

describe("generalDataForm component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(modalHelper, {
      localVue,
      mocks
    });
  });

  it("loads project on modal showing", async () => {
    expect(wrapper.vm.model).toBe(testProject1);
  });

  it("enters a duplicate project's name", async () => {
    let input = wrapper.find("#modal_input");
    input.element.value = "Proyecto de aves en Belice";
    input.trigger("input");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isValid).toStrictEqual({
      isValid: false,
      message: "Proyecto ya registrado"
    });
  });

  it("enters minimal characters in project's name", async () => {
    let input = wrapper.find("#modal_input");
    input.setValue("P");
    // input.trigger("input");

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();

    expect(wrapper.vm.isValid).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

    it("enters invalid characters in project's name", async () => {
        let input = wrapper.find("#modal_input");
        input.setValue("P");
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        await flushPromises();
        input.setValue("P@");
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        await flushPromises();

        expect(wrapper.vm.isValid).toStrictEqual({
            isValid: false,
            message: "Caracteres inválidos"
        });
    });
});
