import { shallowMount, createLocalVue } from "@vue/test-utils";
import register from "@/presentation/components/register.vue";
import Buefy from "buefy";
import User from "../../src/presentation/models/user";
const flushPromises = require("flush-promises");

const localVue = createLocalVue();
localVue.use(Buefy);

describe("register user component", () => {
  let wrapper;
  let user = new User();
  beforeEach(() => {
    wrapper = shallowMount(register, {
      localVue,
      propsData: { user: user }
    });
  });

  it("sets correct name to user", async () => {
    wrapper.vm.name = "Alejandro";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.user.getNameValid()).toStrictEqual({
      isValid: true,
      message: null
    });
  });

  it("sets minimal characters in user's name", async () => {
    wrapper.vm.name = "Al";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.user.getNameValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets maximal characters in user's name", async () => {
    wrapper.vm.name =
      "Alejandro Miguel Alan Zaret Mariana Fernando Aleydys Atenas Ricardo Roberto Karl";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.name =
      "Alejandro Miguel Alan Zaret Mariana Fernando Aleydys Atenas Ricardo Roberto Karla";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.user.getName()).toStrictEqual(
      "Alejandro Miguel Alan Zaret Mariana Fernando Aleydys Atenas Ricardo Roberto Karl"
    );
    expect(wrapper.vm.user.getNameValid()).toStrictEqual({
      isValid: true,
      message: "temporary error"
    });
  });

  it("sets incorrect characters in user's name", async () => {
    wrapper.vm.name = "Alejandro Migue";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.name = "Alejandro Migue1";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.user.getName()).toStrictEqual("Alejandro Migue");
    expect(wrapper.vm.user.getNameValid()).toStrictEqual({
      isValid: true,
      message: "temporary error"
    });
  });

  it("sets correct last name to user", async () => {
    wrapper.vm.lastName = "Cámara Árciga";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.user.getLastNameValid()).toStrictEqual({
      isValid: true,
      message: null
    });
  });

  it("sets minimal characters in user's last name", async () => {
    wrapper.vm.lastName = "Ca";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.user.getLastNameValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets maximal characters in user's last name", async () => {
    wrapper.vm.lastName =
      "Alejandro Miguel Alan Zaret Mariana Fernando Aleydys Atenas Ricardo Roberto Karl";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.lastName =
      "Alejandro Miguel Alan Zaret Mariana Fernando Aleydys Atenas Ricardo Roberto Karla";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.user.getLastName()).toStrictEqual(
      "Alejandro Miguel Alan Zaret Mariana Fernando Aleydys Atenas Ricardo Roberto Karl"
    );
    expect(wrapper.vm.user.getLastNameValid()).toStrictEqual({
      isValid: true,
      message: "temporary error"
    });
  });

  it("sets incorrect characters in user's last name", async () => {
    wrapper.vm.lastName = "Cámar";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.lastName = "Cámar@";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.user.getLastName()).toStrictEqual("Cámar");
    expect(wrapper.vm.user.getLastNameValid()).toStrictEqual({
      isValid: true,
      message: "temporary error"
    });
  });

  it("sets correct password to user", async () => {
    wrapper.vm.password = "holaadmin";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.user.getPasswordValid()).toStrictEqual({
      isValid: true,
      message: null
    });
  });

  it("sets minimal characters in user's password", async () => {
    wrapper.vm.password = "holaa";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.user.getPasswordValid()).toStrictEqual({
      isValid: false,
      message: "Longitud mínima inválida"
    });
  });

  it("sets maximal characters in user's password", async () => {
    wrapper.vm.password = "holaadmin1234ro";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.password = "holaadmin1234rom";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.user.getPassword()).toStrictEqual("holaadmin1234ro");
    expect(wrapper.vm.user.getPasswordValid()).toStrictEqual({
      isValid: true,
      message: "temporary error"
    });
  });

  it("sets incorrect characters in user's password", async () => {
    wrapper.vm.password = "holaadmin1234r";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.password = "holaadmin1234r@";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.user.getPassword()).toStrictEqual("holaadmin1234r");
    expect(wrapper.vm.user.getPasswordValid()).toStrictEqual({
      isValid: true,
      message: "temporary error"
    });
  });

    it("leaves password confirmation empty", async () => {
        wrapper.vm.password = "holahola";
        await wrapper.vm.$nextTick();
        await flushPromises();
        expect(wrapper.vm.isPasswordConfirmationValid).toStrictEqual({
            isValid: false,
            message: "Campo requerido"
        });
    });
});
