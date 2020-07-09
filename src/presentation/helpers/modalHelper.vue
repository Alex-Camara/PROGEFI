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
import Project from "../models/project";
import VegetationType from "../models/vegetationType";
import ClimateType from "../models/climateType";
import Sex from "../models/sex";
import LifeStage from "../models/lifeStage";

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
      modalState: state => state,
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
        console.info("obteniendo ")
        return this.modalState.saveProjectValue;
      },
      set: function(newValue) {
        console.info("guardando proyecto")
        this.$store.commit("modal/setSaveProjectValue", newValue);
        console.info("proyecto guardado")
      }
    }
  },
  watch: {
    active(newValue) {
      if (newValue) {
        console.log("active: " + newValue)
        this.openModal();
      } else {
        console.log("active: " + newValue)
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
      console.info("entró al método save")
      console.info(this.model)
      console.info(this.model.constructor.name)
      this.setSaveValues(true);
    },
    closeModal() {
      console.info("cerrando modal")
      this.setSaveValues(false);
      // this.closeModalWindow();
      // this.$store.commit("modal/reset");
    },
    setSaveValues(save) {
      let modelClassName = this.getModelClassName(this.model);
      switch (modelClassName) {
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
          console.info("switch save proyecto");
          console.info(save)
          this.saveProjectValue = save;
          console.log("this.saveProjectValue: ")
          console.info(this.saveProjectValue)
          break;
      }
    },
    getModelClassName(model){
      if (model instanceof Project){
        return "Project"
      }
      if (model instanceof VegetationType){
        return "VegetationType"
      }
      if (model instanceof ClimateType){
        return "ClimateType"
      }
      if (model instanceof Sex){
        return "Sex"
      }
      if (model instanceof LifeStage){
        return "LifeStage"
      }
    },
    openModal() {
      var element = document.getElementById("modal");
      element.classList.add("is-active");
    },
    closeModalWindow() {
      console.info("close modal window")
      var element = document.getElementById("modal");
      element.classList.remove("is-active");
      console.info("class active desactivada")
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
