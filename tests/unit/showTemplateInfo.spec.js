import { mount, createLocalVue } from "@vue/test-utils";
import showTemplateInfo from "@/presentation/components/showTemplateInfo.vue";
import Buefy from "buefy";
import { testTemplate1 } from "./mocks/Template.spec";

const localVue = createLocalVue();
localVue.use(Buefy);

describe("showTemplateInfo component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(showTemplateInfo, {
      localVue,
      propsData: {
        template: testTemplate1,
      }
    });
  });

  it("show read only values when editMode is false", async () => {
    let nameValue = wrapper.find("#show_template_name_value");
    let fontFamilyValue = wrapper.find("#show_template_font_family_value");
    let backgroundColorValue = wrapper.find("#show_template_background_color_value");
    let fontColorValue = wrapper.find("#create_template_font_color_value");
    let heightValue = wrapper.find("#show_template_height_value");
    let widthValue = wrapper.find("#show_template_width_value");
    let marginXValue = wrapper.find("#show_template_x_margin_value");
    let marginYValue = wrapper.find("#show_template_y_margin_value");

    let nameInput = wrapper.find("#show_template_name_input");
    let fontFamilyInput = wrapper.find("#show_template_font_family_input");
    let backgroundColorInput = wrapper.find("#show_template_background_color_input");
    let fontColorInput = wrapper.find("#create_template_font_color_input");
    let heightInput = wrapper.find("#show_template_height_input");
    let widthInput = wrapper.find("#show_template_width_input");
    let marginXInput = wrapper.find("#show_template_x_margin_input");
    let marginYInput = wrapper.find("#show_template_y_margin_input");

    expect(nameValue.isVisible()).toBe(true);
    expect(fontFamilyValue.isVisible()).toBe(true);
    expect(backgroundColorValue.isVisible()).toBe(true);
    expect(fontColorValue.isVisible()).toBe(true);
    expect(heightValue.isVisible()).toBe(true);
    expect(widthValue.isVisible()).toBe(true);
    expect(marginXValue.isVisible()).toBe(true);
    expect(marginYValue.isVisible()).toBe(true);

    expect(nameInput.exists()).toBe(false);
    expect(fontFamilyInput.exists()).toBe(false);
    expect(backgroundColorInput.exists()).toBe(false);
    expect(fontColorInput.exists()).toBe(false);
    expect(heightInput.exists()).toBe(false);
    expect(widthInput.exists()).toBe(false);
    expect(marginXInput.exists()).toBe(false);
    expect(marginYInput.exists()).toBe(false);
  });

  it("show editable input fields when editMode is true", async () => {
    wrapper = mount(showTemplateInfo, {
      localVue,
      propsData: {
        template: testTemplate1,
        editMode: true
      }
    });
    await wrapper.vm.$nextTick();

    let nameValue = wrapper.find("#show_template_name_value");
    let fontFamilyValue = wrapper.find("#show_template_font_family_value");
    let backgroundColorValue = wrapper.find("#show_template_background_color_value");
    let fontColorValue = wrapper.find("#create_template_font_color_value");
    let heightValue = wrapper.find("#show_template_height_value");
    let widthValue = wrapper.find("#show_template_width_value");
    let marginXValue = wrapper.find("#show_template_x_margin_value");
    let marginYValue = wrapper.find("#show_template_y_margin_value");

    let nameInput = wrapper.find("#show_template_name_input");
    let fontFamilyInput = wrapper.find("#show_template_font_family_input");
    let backgroundColorInput = wrapper.find("#show_template_background_color_input");
    let fontColorInput = wrapper.find("#create_template_font_color_input");
    let heightInput = wrapper.find("#show_template_height_input");
    let widthInput = wrapper.find("#show_template_width_input");
    let marginXInput = wrapper.find("#show_template_x_margin_input");
    let marginYInput = wrapper.find("#show_template_y_margin_input");

    expect(nameValue.exists()).toBe(false);
    expect(fontFamilyValue.exists()).toBe(false);
    expect(backgroundColorValue.exists()).toBe(false);
    expect(fontColorValue.exists()).toBe(false);
    expect(heightValue.exists()).toBe(false);
    expect(widthValue.exists()).toBe(false);
    expect(marginXValue.exists()).toBe(false);
    expect(marginYValue.exists()).toBe(false);

    expect(nameInput.isVisible()).toBe(true);
    expect(fontFamilyInput.isVisible()).toBe(true);
    expect(backgroundColorInput.isVisible()).toBe(true);
    expect(fontColorInput.isVisible()).toBe(true);
    expect(heightInput.isVisible()).toBe(true);
    expect(widthInput.isVisible()).toBe(true);
    expect(marginXInput.isVisible()).toBe(true);
    expect(marginYInput.isVisible()).toBe(true);
  });

});
