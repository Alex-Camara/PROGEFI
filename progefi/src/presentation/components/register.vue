<template>
  <div id="register_container">
    <div id="title">{{ title }}</div>
    <div class="div_width">
      <required-field-helper
        class="text"
        :name="'Nombre:'"
        :valid="isNameValid"
      ></required-field-helper>
      <input
        id="register_name_input"
        class="input register_input"
        v-model="name"
      />
    </div>

    <div class="div_width">
      <required-field-helper
        class="text"
        :name="'Apellidos:'"
        :valid="isLastNameValid"
      ></required-field-helper>
      <input
        id="register_last_name_input"
        class="input register_input"
        v-model="lastName"
      />
    </div>

    <div class="div_width">
      <required-field-helper
        class="text"
        :name="'Contraseña:'"
        :valid="isPasswordValid"
      ></required-field-helper>
      <input
        id="register_password_input"
        type="password"
        class="input register_input"
        v-model="password"
      />
    </div>

    <div class="div_width">
      <required-field-helper
        class="text"
        :name="'Confirma la contraseña:'"
        :valid="isPasswordConfirmationValid"
      ></required-field-helper>
      <input
        id="register_password_confirmation_input"
        type="password"
        class="input register_input"
        v-model="passwordConfirmation"
      />
    </div>

    <div class="div_width">
      <button
        id="register_button"
        class="button is-secondary"
        :disabled="isRegisterButtonDisabled"
        @click="registerUser"
      >
        {{ registerButtonText }}
      </button>
    </div>
  </div>
</template>

<script>
import requiredFieldHelper from "../helpers/requiredFieldHelper";
const { ipcRenderer } = require("electron");

export default {
  name: "register",
  props: ["user"],
  components: {
    "required-field-helper": requiredFieldHelper
  },
  data() {
    return {
      title: "Registrate",
      registerButtonText: "Registrar",
      confirmation: ""
    };
  },
  computed: {
    isNameValid: function() {
      return this.user.getNameValid();
    },
    isLastNameValid: function() {
      return this.user.getLastNameValid();
    },
    isPasswordValid: function() {
      return this.user.getPasswordValid();
    },
    isPasswordConfirmationValid: function() {
      let passwordConfirmationValid = {
        isValid: false,
        message: "Campo requerido"
      };
      if (
        this.password === this.passwordConfirmation &&
        this.isPasswordValid.isValid
      ) {
        passwordConfirmationValid.isValid = true;
        passwordConfirmationValid.message = "Coincide con la contraseña";
      } else {
        if (this.passwordConfirmation === null) {
          passwordConfirmationValid.isValid = false;
          passwordConfirmationValid.message = "Campo requerido";
        } else if (!this.isPasswordValid.isValid) {
          passwordConfirmationValid.isValid = false;
          passwordConfirmationValid.message = "La contraseña es errónea";
        } else {
          passwordConfirmationValid.isValid = false;
          passwordConfirmationValid.message = "No coincide con la contraseña";
        }
      }
      return passwordConfirmationValid;
    },
    isRegisterButtonDisabled: function() {
      return !(
        this.isNameValid.isValid &&
        this.isPasswordValid.isValid &&
        this.isPasswordConfirmationValid.isValid &&
        this.isLastNameValid.isValid
      );
      // return false
    },
    name: {
      get: function() {
        let name = this.user.getName();
        if (this.user.getNameValid().message === "temporary error") {
          this.addShakeEffect("register_name_input");
        }
        return name;
      },
      set: async function(newValue) {
        await this.user.setName(newValue);
      }
    },
    lastName: {
      get: function() {
        let name = this.user.getLastName();
        if (this.user.getLastNameValid().message === "temporary error") {
          this.addShakeEffect("register_last_name_input");
        }
        return name;
      },
      set: async function(newValue) {
        await this.user.setLastName(newValue);
      }
    },
    password: {
      get: function() {
        let name = this.user.getPassword();
        if (this.user.getPasswordValid().message === "temporary error") {
          this.addShakeEffect("register_password_input");
        }
        return name;
      },
      set: async function(newValue) {
        await this.user.setPassword(newValue);
      }
    },
    passwordConfirmation: {
      get: function() {
        if (
          this.user.getPasswordConfirmationValid().message === "temporary error"
        ) {
          this.addShakeEffect("register_password_confirmation_input");
        }
        return this.user.getPasswordConfirmation();
      },
      set: async function(newValue) {
        await this.user.setPasswordConfirmation(newValue);
      }
    }
  },

  methods: {
    registerUser(event) {
      event.currentTarget.classList.add("is-loading");
      this.user
        .save()
        .then(() => {
          this.openToast("Registro exitoso");
        })
        .catch(() => {
          this.openDialog("Ha ocurrido un error con la base de datos");
        });
    },
    openToast(message) {
      this.$buefy.toast.open(message);
    },
    openDialog(message) {
      this.$buefy.dialog.alert(message);
    },
    addShakeEffect(elemenId) {
      let element = document.getElementById(elemenId);
      if (element != null) {
        element.classList.remove("shake_field");
        void element.offsetWidth; // trigger a DOM reflow
        element.classList.add("shake_field");
      }
    }
  }
};
</script>

<style scoped lang="scss">
#title {
  font-size: 25px;
  color: white;
  margin-bottom: 20px;
}
.text {
  color: white;
  font-size: 14px;
}
.register_input {
  width: 100%;
  opacity: 0.5;
  margin-bottom: 10px;
}

.register_input.text {
  opacity: 1;
}
#register_button {
  width: 100% !important;
  margin-top: 20px;
}
.div_width {
  width: 100%;
}
</style>

<style lang="scss">
#register_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /*background-color: #ff9100;*/
}

.shake_field {
  outline-color: red !important;
  /* also need animation and -moz-animation */
  animation: shake 0.5s linear;
}

/* also need keyframes and -moz-keyframes */
@keyframes shake {
  8%,
  41% {
    -webkit-transform: translateX(-10px);
  }

  25%,
  58% {
    -webkit-transform: translateX(10px);
  }

  75% {
    -webkit-transform: translateX(-5px);
  }

  92% {
    -webkit-transform: translateX(5px);
  }

  0%,
  100% {
    -webkit-transform: translateX(0);
  }
}
</style>
