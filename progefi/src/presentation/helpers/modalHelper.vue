<template>
  <div>
    <div id="modal" class="modal">
      <div class="modal-background" @click="closeModal()"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ title }}</p>
          <button
            class="delete"
            aria-label="close"
            @click="closeModal()"
          ></button>
        </header>
        <div id="model_helper_content" class="modal-card-body">
          <div class="container_flex_column">
            <div class="container_flex_column">
              <required-field-helper
                id="modal_helper_required_field_helper"
                :name="fieldText"
                :valid="isValid"
              ></required-field-helper>
              <input
                id="modal_input"
                class="input"
                v-model="value"
                placeholder="Introduce el valor"
              />
            </div>
            <b>{{ valueText + value }}</b>
          </div>
        </div>
        <footer class="modal-card-foot">
          <button
            class="button is-secondary"
            @click="save"
            :disabled="!isValid.isValid"
          >
            {{ saveButtonText }}
          </button>
          <button class="button is-danger" @click="closeModal()">
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import requiredFieldHelper from "./requiredFieldHelper";

export default {
  name: "modal-helper",
  components: {
    "required-field-helper": requiredFieldHelper
  },
  data() {
    return {
      disable: true,
      saveButtonText: "Guardar",
      valueText: "Valor: "
    };
  },
  created() {},
  computed: {
    ...mapState("modal", {
      active: state => state.active,
      title: state => state.title,
      fieldText: state => state.fieldText,
      model: state => state.model,
      getterValue: state => state.getter,
      getterValidValue: state => state.getterValid,
      setter: state => state.setter,
      modalState: state => state
   }),
    isValid: function() {
      if (this.model) {
        return this.model[this.getterValidValue]();
      } else {
        return { isValid: false, message: null };
      }
    },
    value: {
      get: function() {
        if (this.model) {
          return this.model[this.getterValue]();
        }
        return null;
      },
      set: function(newValue) {
        this.model[this.setter](newValue);
      }
    },
    saveClimateTypeValue: {
      get: function() {
        return this.modal.state.saveClimateTypeValue;
      },
      set: function(newValue) {
        this.$store.commit("modal/setSaveClimateTypeValue", newValue);
      }
    },
    saveSexValue: {
      get: function() {
        return this.modal.state.saveSexValue;
      },
      set: function(newValue) {
        this.$store.commit("modal/setSaveSexValue", newValue);
      }
    },
    saveVegetationTypeValue: {
      get: function() {
        return this.modal.state.saveVegetationTypeValue;
      },
      set: function(newValue) {
        this.$store.commit("modal/setSaveVegetationTypeValue", newValue);
      }
    },
    saveLifeStageValue: {
      get: function() {
        return this.modal.state.saveLifeStageValue;
      },
      set: function(newValue) {
        this.$store.commit("modal/setSaveLifeStageValue", newValue);
      }
    },
    saveProjectValue: {
      get: function() {
        return this.modal.state.saveProjectValue;
      },
      set: function(newValue) {
        this.$store.commit("modal/setSaveProjectValue", newValue);
      }
    }
  },
  watch: {
    active(newValue) {
      if (newValue) {
        this.openModal();
      } else {
        this.closeModalWindow();
      }
    },
    isValid(newValue) {
      if (newValue.message === "temporary error") {
        this.addShakeEffect();
      }
    }
  },
  methods: {
    save() {
      this.setSaveValues(true);
    },
    closeModal() {
      this.setSaveValues(false);
      // this.$store.commit("modal/reset");
    },
    setSaveValues(save) {
      switch (this.model.constructor.name) {
        case "Sex":
          this.saveSexValue = save;
          break;
        case "ClimateType":
          this.saveClimateTypeValue = save;
          break;
        case "VegetationType":
          this.saveVegetationTypeValue = save;
          break;
        case "LifeStage":
          this.saveLifeStageValue = save;
          break;
        case "Project":
          this.saveProjectValue = save;
          break;
      }
    },
    openModal() {
      var element = document.getElementById("modal");
      element.classList.add("is-active");
    },
    closeModalWindow() {
      var element = document.getElementById("modal");
      element.classList.remove("is-active");
    },
    addShakeEffect() {
      let element = document.getElementById("modal_input");
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
.modal-card-body {
  height: 200px !important;
  padding-right: 80px !important;
  padding-left: 80px !important;
  padding-top: 50px !important;
}

#modal_input {
  margin-bottom: 20px;
}
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
