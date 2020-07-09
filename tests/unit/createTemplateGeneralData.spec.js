import { shallowMount, createLocalVue } from "@vue/test-utils";
import createTemplateGeneralData from "@/presentation/components/createTemplateGeneralData.vue";
import Buefy from "buefy";
const flushPromises = require("flush-promises");

import { Template, testTemplate1 } from "./mocks/Template.spec";

const localVue = createLocalVue();
localVue.use(Buefy);

describe("createTemplateGeneralData component", () => {
  let wrapper;
  beforeEach(() => {
    let template = new Template();
    wrapper = shallowMount(createTemplateGeneralData, {
      localVue,
      propsData: { template }
    });
  });

  it("writes correct template name", async () => {
    // wrapper.vm.name = "Plantilla Nueva";
    let nameInput = wrapper.find("#create_template_name_input");
    nameInput.setValue("Plantilla Nueva");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getNameValid()).toStrictEqual({
      isValid: true,
      message: null
    });
  });

  it("writes minimal characters in template's name", async () => {
    // wrapper.vm.name = "Plantilla Nueva";
    let nameInput = wrapper.find("#create_template_name_input");
    nameInput.setValue("P");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getNameValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("writes not allowed characters in template's name", async () => {
    // wrapper.vm.name = "Plantilla Nueva";
    let nameInput = wrapper.find("#create_template_name_input");
    nameInput.setValue("Plantilla .");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getNameValid()).toStrictEqual({
      isValid: false,
      message: "Caracteres inválidos"
    });
  });

  it("writes maximal characters in template's name", async () => {
    // wrapper.vm.name = "Plantilla Nueva";
    let nameInput = wrapper.find("#create_template_name_input");
    nameInput.setValue("Plantilla que excede el límite");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    nameInput.setValue("Plantilla que excede el límite d");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();

    expect(wrapper.vm.template.getName()).toStrictEqual(
      "Plantilla que excede el límite"
    );
    expect(wrapper.vm.template.getNameValid()).toStrictEqual({
      isValid: true,
      message: "temporary error"
    });
  });

  it("writes another template's name", async () => {
    // wrapper.vm.name = "Plantilla Nueva";
    let nameInput = wrapper.find("#create_template_name_input");
    nameInput.setValue("Plantilla básica clara");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();

    expect(wrapper.vm.template.getNameValid()).toStrictEqual({
      isValid: false,
      message: "Nombre ya en uso"
    });
  });

  it("writes not valid font family", async () => {
    // wrapper.vm.name = "Plantilla Nueva";
    let nameInput = wrapper.find(
      "#create_template_general_data_font_family_input"
    );
    nameInput.setValue("Afg");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getFontFamilyValid()).toStrictEqual({
      isValid: false,
      message: "Fuente no válida"
    });
  });

  it("writes valid background color", async () => {
    let nameInput = wrapper.find(
        "#create_template_background_color_input"
    );
    nameInput.setValue("#f9582f");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getBackgroundColor()).toStrictEqual("#f9582f");
    expect(wrapper.vm.template.getBackgroundColorValid()).toStrictEqual({isValid: true, message: null});
  });

  it("writes invalid background color", async () => {
    let nameInput = wrapper.find(
        "#create_template_background_color_input"
    );
    nameInput.setValue("#f9582");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    nameInput.setValue("#f9582.");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getBackgroundColor()).toStrictEqual("#f9582");
    expect(wrapper.vm.template.getBackgroundColorValid()).toStrictEqual({isValid: false, message: "Caracteres inválidos"});
  });

  it("writes minimal characters in background color input", async () => {
    let nameInput = wrapper.find(
        "#create_template_background_color_input"
    );
    nameInput.setValue("#ff");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getBackgroundColorValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("writes valid font color", async () => {
    let nameInput = wrapper.find(
        "#create_template_font_color_input"
    );
    nameInput.setValue("#f9582f");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getFontColor()).toStrictEqual("#f9582f");
    expect(wrapper.vm.template.getFontColorValid()).toStrictEqual({isValid: true, message: null});
  });

  it("writes invalid font color", async () => {
    let nameInput = wrapper.find(
        "#create_template_font_color_input"
    );
    nameInput.setValue("#f9582");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    nameInput.setValue("#f9582.");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getFontColor()).toStrictEqual("#f9582");
    expect(wrapper.vm.template.getFontColorValid()).toStrictEqual({isValid: false, message: "Caracteres inválidos"});
  });

  it("writes minimal characters in font color input", async () => {
    let nameInput = wrapper.find(
        "#create_template_font_color_input"
    );
    nameInput.setValue("#ff");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getFontColorValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("writes minimal limit in height input", async () => {
    let nameInput = wrapper.find(
        "#create_template_height_input"
    );
    nameInput.setValue("-");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getHeight()).toStrictEqual("-");
    expect(wrapper.vm.template.getHeightValid()).toStrictEqual({
      isValid: false,
      message: "Ingresa un número"
    });
  });

  it("writes maximal limit in height input", async () => {
    let nameInput = wrapper.find(
        "#create_template_height_input"
    );
    nameInput.setValue("1000");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    nameInput.setValue("10001");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getHeight()).toStrictEqual("1000");
    expect(wrapper.vm.template.getHeightValid()).toStrictEqual({
      isValid: true,
      message: "temporary error"
    });
  });

  it("writes not allowed characters in height input", async () => {
    let nameInput = wrapper.find(
        "#create_template_height_input"
    );
    nameInput.setValue("1000");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    nameInput.setValue("1000a");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getHeight()).toStrictEqual("1000");
    expect(wrapper.vm.template.getHeightValid()).toStrictEqual({
      isValid: true,
      message: "temporary error"
    });
  });

  it("leaves height input empty", async () => {
    let nameInput = wrapper.find(
        "#create_template_height_input"
    );
    nameInput.setValue("");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getHeight()).toStrictEqual("");
    expect(wrapper.vm.template.getHeightValid()).toStrictEqual({
      isValid: false,
      message: "Campo requerido"
    });
  });

  it("writes minimal limit in width input", async () => {
    let nameInput = wrapper.find(
        "#create_template_width_input"
    );
    nameInput.setValue("-");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getWidth()).toStrictEqual("-");
    expect(wrapper.vm.template.getWidthValid()).toStrictEqual({
      isValid: false,
      message: "Ingresa un número"
    });
  });

  it("writes maximal limit in width input", async () => {
    let nameInput = wrapper.find(
        "#create_template_width_input"
    );
    nameInput.setValue("1000");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    nameInput.setValue("10001");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getWidth()).toStrictEqual("1000");
    expect(wrapper.vm.template.getWidthValid()).toStrictEqual({
      isValid: true,
      message: "temporary error"
    });
  });

  it("writes not allowed characters in width input", async () => {
    let nameInput = wrapper.find(
        "#create_template_width_input"
    );
    nameInput.setValue("1000");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    nameInput.setValue("1000a");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getWidth()).toStrictEqual("1000");
    expect(wrapper.vm.template.getWidthValid()).toStrictEqual({
      isValid: true,
      message: "temporary error"
    });
  });

  it("leaves width input empty", async () => {
    let nameInput = wrapper.find(
        "#create_template_width_input"
    );
    nameInput.setValue("");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getWidth()).toStrictEqual("");
    expect(wrapper.vm.template.getWidthValid()).toStrictEqual({
      isValid: false,
      message: "Campo requerido"
    });
  });

  it("writes minimal limit in horizontal margin input", async () => {
    let nameInput = wrapper.find(
        "#create_template_margin_x_input"
    );
    nameInput.setValue("-");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getMarginX()).toStrictEqual("-");
    expect(wrapper.vm.template.getMarginXValid()).toStrictEqual({
      isValid: false,
      message: "Ingresa un número"
    });
  });

  it("writes maximal limit in horizontal margin input", async () => {
    let nameInput = wrapper.find(
        "#create_template_margin_x_input"
    );
    nameInput.setValue("416");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    nameInput.setValue("500");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getMarginX()).toStrictEqual("416");
    expect(wrapper.vm.template.getMarginXValid()).toStrictEqual({
      isValid: true,
      message: "temporary error"
    });
  });

  it("writes not allowed characters in horizontal margin input", async () => {
    let nameInput = wrapper.find(
        "#create_template_margin_x_input"
    );
    nameInput.setValue("10");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    nameInput.setValue("10a");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getMarginX()).toStrictEqual("10");
    expect(wrapper.vm.template.getMarginXValid()).toStrictEqual({
      isValid: true,
      message: "temporary error"
    });
  });

  it("leaves horizontal margin input empty", async () => {
    let nameInput = wrapper.find(
        "#create_template_margin_x_input"
    );
    nameInput.setValue("");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getMarginX()).toStrictEqual("");
    expect(wrapper.vm.template.getMarginXValid()).toStrictEqual({
      isValid: false,
      message: "Campo requerido"
    });
  });

  it("writes minimal limit in vertical margin input", async () => {
    let nameInput = wrapper.find(
        "#create_template_margin_y_input"
    );
    nameInput.setValue("-");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getMarginY()).toStrictEqual("-");
    expect(wrapper.vm.template.getMarginYValid()).toStrictEqual({
      isValid: false,
      message: "Ingresa un número"
    });
  });

  it("writes maximal limit in vertical margin input", async () => {
    let nameInput = wrapper.find(
        "#create_template_margin_y_input"
    );
    nameInput.setValue("266");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    nameInput.setValue("267");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getMarginY()).toStrictEqual("266");
    expect(wrapper.vm.template.getMarginYValid()).toStrictEqual({
      isValid: true,
      message: "temporary error"
    });
  });

  it("writes not allowed characters in vertical margin input", async () => {
    let nameInput = wrapper.find(
        "#create_template_margin_y_input"
    );
    nameInput.setValue("10");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    nameInput.setValue("10a");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getMarginY()).toStrictEqual("10");
    expect(wrapper.vm.template.getMarginYValid()).toStrictEqual({
      isValid: true,
      message: "temporary error"
    });
  });

  it("leaves vertical margin input empty", async () => {
    let nameInput = wrapper.find(
        "#create_template_margin_y_input"
    );
    nameInput.setValue("");
    nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.template.getMarginY()).toStrictEqual("");
    expect(wrapper.vm.template.getMarginYValid()).toStrictEqual({
      isValid: false,
      message: "Campo requerido"
    });
  });
});
