<template>
  <div>
    <div id="modal" class="modal">
      <div class="modal-background" @click="setActive(false)"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{title}}</p>
          <button class="delete" aria-label="close" @click="setActive(false)"></button>
        </header>
        <section class="modal-card-body">
          <b-field id="modal_input_field" custom-class="is-small is-centered" :label="fieldText">
            <input id="modal_input" class="input" v-model="value" placeholder="Introduce el valor" />
          </b-field>
        </section>
        <section class="modal-card-body">
          <b>Valor: {{value}}</b>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-secondary" @click="saveValue()" :disabled="disable">Guardar</button>
          <button class="button is-danger" @click="setActive(false)">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/store.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      disable: true
    };
  },
  created() {
    store.watch(
      state => state.modal.active,
      (newValue, oldValue) => {
        if (newValue) {
          this.openModal();
        } else {
          this.closeModal();
        }
      }
    );
    store.watch(
      state => state.modal.modalValue.valid,
      (newValue, oldValue) => {
        console.log(newValue);
        if (!newValue.isValid) {
          this.addShakeEffect("modal_input");
          this.disable = true;
        } else {
          this.disable = false;
        }
        if (newValue.message == "temporary error") {
          this.addShakeEffect("modal_input");
        }
      }
    );
  },
  computed: {
    ...mapState("modal", {
      title: state => state.title,
      fieldText: state => state.fieldText,
      modalState: state => state
    }),
    value: {
      get: function() {
        return store.state.modal.modalValue.value;
      },
      set: function(newValue) {
        store.dispatch("modal/setValue", newValue);
      }
    }
  },
  methods: {
    setActive(value) {
      store.dispatch("modal/closeModal");
    },
    openModal() {
      var element = document.getElementById("modal");
      element.classList.add("is-active");
    },
    closeModal() {
      var element = document.getElementById("modal");
      element.classList.remove("is-active");
    },
    disableButton() {
      //store.dispatch("modal/setValue", );
    },
    saveValue() {
      store.dispatch("modal/saveValue");
      this.setActive(false);
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

<style lang="scss">
.shake_field {
  outline-color: red;
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