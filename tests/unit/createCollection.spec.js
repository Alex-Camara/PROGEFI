import { shallowMount, createLocalVue } from "@vue/test-utils";
import createCollection from "@/presentation/components/createCollection.vue";
import Buefy from "buefy";
import { testCollection1 } from "./mocks/Collection.spec";
const flushPromises = require("flush-promises");

const localVue = createLocalVue();
localVue.use(Buefy);

describe("ui showCollection view", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(createCollection, {
      localVue,
      propsData: { collection: testCollection1 }
    });
  });

  it("sets correct collection's name", async () => {
    wrapper.vm.name = "Colección biologica";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.collection.getNameValid()).toStrictEqual({
      isValid: true,
      message: null
    });
  });

  it("sets minimal number of characters in collection's name", async () => {
    wrapper.vm.name = "Co";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.getName()).toStrictEqual("Co");
    expect(wrapper.vm.collection.getNameValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets numbers in collection name", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.name = "Colección";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.name = "Colección 2";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.name).toStrictEqual("Colección");
  });

  it("sets not allowed characters in collection's name", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.name = "Colección";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.name = "Colección@";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.name).toStrictEqual("Colección");
  });

  it("sets correct code to collection", async () => {
    wrapper.vm.name = "IIBUV-";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.collection.getCodeValid()).toStrictEqual({
      isValid: true,
      message: null
    });
  });

  it("sets minimal number of characters in code's name", async () => {
    wrapper.vm.code = "C";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.getCode()).toStrictEqual("C");
    expect(wrapper.vm.collection.getCodeValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets not allowed characters in collection's code", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.code = "IIB";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.code = "IIB@";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.code).toStrictEqual("IIB");
  });

  it("sets correct collection's institute name", async () => {
    wrapper.vm.name = "Colección biologica de animales vertebrados terrestres";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.collection.getInstituteNameValid()).toStrictEqual({
      isValid: true,
      message: null
    });
  });

  it("sets minimal number of characters in collection's institute name", async () => {
    wrapper.vm.instituteName = "Uni";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.getInstituteName()).toStrictEqual("Uni");
    expect(wrapper.vm.collection.getInstituteNameValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets numbers in collection's institute name", async () => {
    wrapper.vm.instituteName = "Universidad";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.instituteName = "Universidad 2";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.instituteName).toStrictEqual("Universidad");
  });

  it("sets not allowed characters in collection's institute name", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.instituteName = "Universidad";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.instituteName = "Universidad@";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.instituteName).toStrictEqual("Universidad");
  });

  it("sets correct collection's institute name acronym", async () => {
    wrapper.vm.instituteAcronym = "IIBUV";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.collection.getInstituteAcronymValid()).toStrictEqual({
      isValid: true,
      message: null
    });
  });

  it("sets minimal number of characters in collection's institute name acronym", async () => {
    wrapper.vm.instituteAcronym = "U";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.getInstituteAcronym()).toStrictEqual("U");
    expect(wrapper.vm.collection.getInstituteAcronymValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets numbers in collection's institute name acronym", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.instituteAcronym = "IIBUV";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.instituteAcronym = "IIBUV2";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.instituteAcronym).toStrictEqual("IIBUV");
  });

  it("sets not allowed characters in collection's institute name acronym", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.instituteAcronym = "IIBUV";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.instituteAcronym = "IIBUV@";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.instituteAcronym).toStrictEqual("IIBUV");
  });

  it("sets correct collection's entity name", async () => {
    wrapper.vm.entityName = "Universidad Veracruzana";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.collection.getEntityNameValid()).toStrictEqual({
      isValid: true,
      message: null
    });
  });

  it("sets minimal number of characters in collection's entity", async () => {
    wrapper.vm.entityName = "U";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.getEntityName()).toStrictEqual("U");
    expect(wrapper.vm.collection.getEntityNameValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets not allowed characters in collection's entity", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.entityName = "UV";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.entityName = "UV@";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.entityName).toStrictEqual("UV");
  });

  it("sets correct collection's entity acronym", async () => {
    wrapper.vm.entityAcronym = "UV";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.collection.getEntityAcronymValid()).toStrictEqual({
      isValid: true,
      message: null
    });
  });

  it("sets minimal number of characters in collection's entity acronym", async () => {
    wrapper.vm.entityAcronym = "U";
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.getEntityAcronym()).toStrictEqual("U");
    expect(wrapper.vm.collection.getEntityAcronymValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets not allowed characters in collection's entity acronym", async () => {
    wrapper.vm.$forceUpdate();
    wrapper.vm.entityAcronym = "IIB";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.entityAcronym = "IIB@";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.collection.entityAcronym).toStrictEqual("IIB");
  });
});
