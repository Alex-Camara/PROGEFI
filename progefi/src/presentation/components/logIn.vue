<template>
  <div id="login_container">
    <div id="title">{{ title }}</div>

    <div class="space"></div>

    <div class="div_width">
      <required-field-helper
        class="text"
        :name="'Nombre:'"
        :valid="isNameValid"
      ></required-field-helper>
      <input id="login_name_input" class="input login_input" v-model="name" />
    </div>

    <div class="space"></div>

    <div class="div_width">
      <required-field-helper
        class="text"
        :name="'Contraseña:'"
        :valid="isPasswordValid"
      ></required-field-helper>
      <input
        id="login_password_input"
        type="password"
        class="input login_input"
        v-model="password"
      />
    </div>

    <div class="space"></div>

    <b-checkbox id="login_checkbox" v-model="keepSession">
      <p class="text">{{ keepSessionText }}</p>
    </b-checkbox>

    <div class="space"></div>

    <div class="div_width">
      <button
        id="login_button"
        class="button is-secondary"
        :disabled="isLogInButtonDisabled"
        @click="logIn"
      >
        {{ loginButtonText }}
      </button>
    </div>

    <div class="space"></div>

    <b-notification
            auto-close type="is-warning"
            :active.sync="errorActive"
            aria-close-label="Close notification">
      {{errorMessage}}
    </b-notification>
  </div>
</template>

<script>
import User from "../models/user";
import requiredFieldHelper from "../helpers/requiredFieldHelper";

export default {
  name: "logIn",
  components: {
    "required-field-helper": requiredFieldHelper
  },
  data() {
    return {
      title: "Inicia sesión",
      loginButtonText: "Ingresar",
      keepSessionText: "Mantener la sesión iniciada",
      errorMessage: "",
      errorActive: false,
      user: new User()
    };
  },

  computed: {
    isNameValid: function() {
      return this.user.getNameValid();
    },
    isPasswordValid: function() {
      return this.user.getPasswordValid();
    },
    isLogInButtonDisabled: function() {
      return !(this.isNameValid.isValid && this.isPasswordValid.isValid);
      // return false
    },
    name: {
      get: function() {
        let name = this.user.getName();
        if (this.user.getNameValid().message === "temporary error") {
          this.addShakeEffect("login_name_input");
        }
        return name;
      },
      set: async function(newValue) {
        await this.user.setName(newValue);
      }
    },
    password: {
      get: function() {
        let name = this.user.getPassword();
        if (this.user.getPasswordValid().message === "temporary error") {
          this.addShakeEffect("login_password_input");
        }
        return name;
      },
      set: async function(newValue) {
        await this.user.setPassword(newValue);
      }
    },
    keepSession: {
      get: function() {
        return this.user.isKeepingSession();
      },
      set: function(newValue) {
        this.user.doKeepSession(newValue);
      }
    }
  },
  methods: {
    logIn() {
      this.user
        .validateCredentials()
        .then(() => {
          this.openToast("¡Bienvenido! " + this.user.getName());
          this.$emit("succesful-login", this.user);
        })
        .catch(error => {
          if (error === "db-error") {
            this.errorActive = true;
            this.errorMessage = "Ha ocurrido un error con la base de datos";
          }
          if (error === "invalid-credentials") {
            this.errorActive = true;
            this.errorMessage =  "Credenciales inválidas";
          }
        });
    },

    openToast(message) {
      this.$buefy.toast.open(message);
    },
    openDialog(message) {
      debugger
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
#login_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /*background-color: #ff9100;*/
}
#title {
  font-size: 25px;
  color: white;
  margin-bottom: 20px;
}
.text {
  color: white;
  font-size: 14px;
}
.div_width {
  width: 100%;
}
.login_input {
  width: 100%;
  opacity: 0.5;
  margin-bottom: 10px;
}
.login_input.text {
  opacity: 1;
}
.space {
  height: 20px;
}
#login_checkbox {
  margin-right: auto;
}
#login_checkbox.text {
  color: white;
  font-size: 14px;
}
#login_button {
  width: 100% !important;
  margin-top: 20px;
}
</style>
