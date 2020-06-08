<template>
  <div id="ui_create_template_container">
    <div id="ui_create_template_component_title">
      <p class="component_title">{{ title }}</p>
    </div>
    <div id="ui_create_template_component_content">
      <b-steps
        size="is-small"
        type="is-secondary"
        :has-navigation="false"
        v-model="activeStep"
      >
        <b-step-item label="Datos generales" :clickable="true">
          <p class="title">{{ generalDataTitle }}</p>
          <create-template-general-data
            :template="template"
          ></create-template-general-data>
          <template-thumbnail :template="template"></template-thumbnail>
        </b-step-item>
        <b-step-item label="Distribución de datos" :clickable="true">
          <div >
            <p id="ui_create_template_data_distribution_title" class="title">
              {{ dataDistributionTitle }}
            </p>
            <create-tag :template="template"></create-tag>
            <div id="ui_create_template_switch_button_div" class="gray_box">
              <b-switch
                id="ui_create_template_switch_button"
                v-model="switchButtonText"
                true-value="Vista de edición"
                false-value="Vista previa"
                @input="editMode = !editMode"
                >{{ switchButtonText }}</b-switch
              >
            </div>
            <preview-template
              :template="template"
              :generateTemplate="generateTemplate"
              :editMode="editMode"
              @exitComponent="returnToTemplates"
            ></preview-template>
          </div>
        </b-step-item>
        <div id="ui_create_template_buttons" class="container_flex">
          <button
            id="ui_create_template_previous_button"
            class="button"
            v-if="activeStep !== 0"
            @click="setPreviousStep"
          >
            {{ previousButtonText }}
          </button>
          <button
            id="ui_create_template_next_button"
            class="button is-accent"
            :disabled="disableNextButton"
            @click="setNextStep"
          >
            {{ nextButtonText }}
          </button>
        </div>
      </b-steps>
    </div>
  </div>
</template>

<script>
import UIDataDistribution from "./UICreateTemplate/UIDataDistribution.vue";
import Template from "../models/template";
import createTemplateGeneralData from "../components/createTemplateGeneralData";
import templateThumbnail from "../components/templateThumbnail";
import createTag from "../components/createTag";
import previewTemplate from "../components/previewTemplate";
import {mapState} from "vuex";
import store from "../store/store";

export default {
  components: {
    "ui-data-distribution": UIDataDistribution,
    "create-template-general-data": createTemplateGeneralData,
    "template-thumbnail": templateThumbnail,
    "create-tag": createTag,
    "preview-template": previewTemplate
  },
  data() {
    return {
      template: new Template(),
      generateTemplate: false,
      title: "Crear Plantilla",
      nextButtonText: "Siguiente",
      previousButtonText: "Anterior",
      generalDataTitle: "Datos de la plantilla:",
      dataDistributionTitle: "Distribución de los datos:",
      editMode: true,
      switchButtonText: "Vista de edición"
    };
  },
  mounted() {
    this.template.getFonts();
  },
  beforeDestroy() {
    this.$store.commit("template/reset");
  },
  beforeRouteLeave(to, from, next) {
    // Si la ruta destino tiene el parametro 'askToLeave',
    // esta especificando si se quiere preguntar antes de abandonar la ruta actual
    if (to.params.askToLeave || to.params.askToLeave == undefined) {
      this.showDialog().then(answer => {
        if (answer) {
          next();
        } else {
          next(false);
          this.$store.commit("menu/setSelected", "UIShowTemplates");
        }
      });
    } else {
      next();
    }
  },
  computed: {
    ...mapState("template", {
      templateState: state => state
    }),
    activeStep: {
      get: function() {
        return this.templateState.activeStep;
      },
      set: function(newValue) {
        if (newValue == 1){
          this.nextButtonText = "Crear plantilla";
        } else{
          this.nextButtonText = "Siguiente";
        }

        store.commit("template/setActiveStep", newValue);
        return newValue;
      }
    },
    isTemplateGeneralDataValid: function() {
      return (
        this.template.getNameValid().isValid &&
        this.template.getFontSizeValid().isValid &&
        this.template.getFontFamilyValid().isValid &&
        this.template.getBackgroundColorValid().isValid &&
        this.template.getFontColorValid().isValid &&
        this.template.getHeightValid().isValid &&
        this.template.getWidthValid().isValid
      );
    },
    disableNextButton: function() {
      if (this.isTemplateGeneralDataValid) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    setNextStep() {
      if (this.activeStep === 0) {
        this.activeStep = 1;
      } else {
        if (this.template.getTags().length < 2){
          this.openToast("Debes agregar mínimo 2 etiquetas")
        } else{
          this.editMode = false;
          this.generateTemplate = true;
        }
      }
    },
    setPreviousStep() {
      this.activeStep = 0;
      this.nextButtonText = "Siguiente";
    },
    returnToTemplates(){
      this.$router.push({
        name: "UIShowTemplates",
        params: {
          askToLeave: false,
        }
      });
    },
    openToast(message) {
      this.$buefy.toast.open(message);
    },
    showDialog() {
      return new Promise(resolve => {
        let f = this.$buefy.dialog.confirm({
          message: "¿Deseas salir de esta ventana? Tu trabajo no se guardará",
          confirmText: "Cancelar",
          cancelText: "Salir",
          onConfirm: () => {
            resolve(false);
          },
          onCancel: () => {
            resolve(true);
          }
        });
        console.info(f);
      });
    },
  }
};
</script>

<style lang="scss">
#ui_create_template_container {
  display: grid;
  grid-template-rows: 10% 90%;
  height: 100%;
}
#ui_create_template_component_title {
  grid-row: 1 / 2;
  justify-self: center;
  align-self: center;
}
#ui_create_template_component_content {
  grid-row: 2 / 3;
  /*width: 1100px;*/
  justify-self: center;
  margin-bottom: 50px;
}

#ui_create_template_buttons {
  justify-content: flex-end;
  margin-bottom: 50px;
  margin-top: 20px;
}

#ui_create_template_switch_button_div {
  display: flex;
  flex-basis: fit-content;
  margin-bottom: 20px;
  margin-top: 20px;
}

#ui_create_template_data_distribution_title {
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 60px;
}

#ui_create_template_next_button {
  /*margin-left: 20px;*/
}
</style>
