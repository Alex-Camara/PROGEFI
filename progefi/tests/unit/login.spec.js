import { shallowMount, createLocalVue } from "@vue/test-utils";
import login from "@/presentation/components/logIn.vue";
import Buefy from "buefy";
const flushPromises = require("flush-promises");

const localVue = createLocalVue();
localVue.use(Buefy);

describe("login user component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(login, {
      localVue
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
      "Alejandro Miguel Alan Zaret Mariana Fernando Aleydis Atenas Ricardo Roberto Karl";
    await wrapper.vm.$nextTick();
    await flushPromises();
    wrapper.vm.name =
      "Alejandro Miguel Alan Zaret Mariana Fernando Aleydis Atenas Ricardo Roberto Karla";
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(wrapper.vm.user.getName()).toStrictEqual(
      "Alejandro Miguel Alan Zaret Mariana Fernando Aleydis Atenas Ricardo Roberto Karl"
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

  it("enables enter button", async () => {
    wrapper.vm.password = "holaadmin1234r";
    wrapper.vm.password = "Miguel Alejandro";
    await wrapper.vm.$nextTick();
    await flushPromises();
    let button = wrapper.find("#login_button");
    expect(button.attributes("disabled")).toBe("disabled");
  });
});
