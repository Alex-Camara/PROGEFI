<template>
  <div id="ui_user_account_component">
    <div id="ui_user_account_component_title">
      <p class="component_title">{{ title }}</p>
    </div>
    <div id="ui_user_account_component_content" class="gray_box">
      <p class="title">{{ subtitle }}</p>
      <div class="space"></div>
      <div class="show_datacard_info_attributes_div">
        <p class="attribute_name">{{ nameText }}</p>
        <p class="attribute_value">{{ user.getName() }}</p>
      </div>
      <div class="space"></div>
      <div class="show_datacard_info_attributes_div">
        <p class="attribute_name">{{ lastNameText }}</p>
        <p class="attribute_value">{{ user.getLastName() }}</p>
      </div>
      <button
        id="ui_user_account_button"
        class="button is-danger"
        @click="logOut"
      >
        {{ logOutText }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "userAccount",
  data() {
    return {
      title: "Opciones de cuenta",
      subtitle: "Información del usuario",
      nameText: "Nombre: ",
      lastNameText: "Apellido: ",
      logOutText: "Cerrar sesión"
    };
  },
  computed: {
    ...mapState("user", {
      user: state => state.user
    })
  },
  methods: {
    logOut() {
      this.user.doKeepSession(false);
      const { ipcRenderer } = require("electron");
      ipcRenderer.send("logOut", this.user);
      this.$store.commit("user/reset");
      ipcRenderer.once("loggedOut", (event, result) => {
        ipcRenderer.send("minimize");
      });
    }
  }
};
</script>

<style scoped>
#ui_user_account_component {
  display: flex;
  flex-direction: column;
}
#ui_user_account_component_title {
  display: flex;
  justify-self: center;
  margin-top: 15px;
  align-self: center;
}
#ui_user_account_component_content {
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-top: 30px;
  width: 80%;
}
#ui_user_account_button {
  margin-top: 30px;
  width: 20%;
}
.space {
  height: 10px;
}
</style>
