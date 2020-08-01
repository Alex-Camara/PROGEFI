import { shallowMount, createLocalVue } from "@vue/test-utils";
import createCatalogue from "@/presentation/components/createCatalogue.vue";
import Buefy from "buefy";
import { testCatalogue1 } from "./mocks/Catalogue.spec";
const flushPromises = require("flush-promises");

const localVue = createLocalVue();
localVue.use(Buefy);

describe("create catalogue component", () => {
  let wrapper;
  let propCatalogue;
  beforeEach(() => {
    propCatalogue = testCatalogue1;
    wrapper = shallowMount(createCatalogue, {
      localVue,
      propsData: { catalogue: propCatalogue }
    });
  });

  it("sets correct name to catalogue", async () => {
    wrapper.vm.name = "Mamíferos";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.catalogue.getNameValid()).toStrictEqual({
      isValid: true,
      message: null
    });
  });

  it("sets minimal number of characters in catalogue's name", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.name = "Catalogue one";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.name = "Ma";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.catalogue.getName()).toStrictEqual("Ma");
    expect(wrapper.vm.catalogue.getNameValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets numbers in catalogue name", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.name = "Mamíferos";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.name = "Mamíferos2";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.catalogue.name).toStrictEqual("Mamíferos");
  });

  it("sets not allowed characters in catalogue name", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.name = "Mamíferos";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.name = "Mamíferos@";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.catalogue.name).toStrictEqual("Mamíferos");
  });

  it("sets duplicate name on catalogues's name", async () => {
    wrapper.vm.$forceUpdate();
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.name = "Catalogue tw";
    await wrapper.vm.$nextTick();
    await flushPromises();

    wrapper.vm.name = "Catalogue two";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.catalogue.name).toStrictEqual("Catalogue two");
    expect(wrapper.vm.catalogue.getNameValid()).toStrictEqual({
      isValid: false,
      message: "Nombre ya en uso"
    });
  });

  it("sets catalogue's code", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.code = "MAM";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.catalogue.code).toStrictEqual("MAM");
  });

  it("sets minimal characters in catalogue's code", async () => {
    wrapper.vm.$forceUpdate();
    await flushPromises();
    await wrapper.vm.$nextTick();
    wrapper.vm.code = "M";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.catalogue.code).toStrictEqual("M");
    expect(wrapper.vm.catalogue.getCodeValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets maximal characters in catalogue's code", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.code = "MAMIFEROS2";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.code = "MAMIFEROS22";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.catalogue.code).toStrictEqual("MAMIFEROS2");
  });

  it("sets not allowed characters in catalogue's code", async () => {
    wrapper.vm.$forceUpdate();
    await flushPromises();
    await wrapper.vm.$nextTick();
    wrapper.vm.code = "MAM";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.code = "MAM/";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.catalogue.code).toStrictEqual("MAM");
  });

  it("sets duplicate catalogues's code", async () => {
    wrapper.vm.$forceUpdate();
    await flushPromises();
    await wrapper.vm.$nextTick();
    wrapper.vm.code = "CAT";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.code = "CATB";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.catalogue.code).toStrictEqual("CATB");
    expect(wrapper.vm.catalogue.getCodeValid()).toStrictEqual({
      isValid: false,
      message: "Código ya en uso"
    });
  });

  it("sets minimal characters in description's code", async () => {
    wrapper.vm.$forceUpdate();
    await flushPromises();
    await wrapper.vm.$nextTick();
    wrapper.vm.description = "d";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.catalogue.description).toStrictEqual("d");
    expect(wrapper.vm.catalogue.getDescriptionValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });
});
