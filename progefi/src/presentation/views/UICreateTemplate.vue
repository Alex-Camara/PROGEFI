<template>
  <div id="ui_create_template_container">
    <div id="ui_create_template_component_title">
      <p class="component_title">{{title}}</p>
    </div>
    <div id="ui_create_template_component_content">
      <b-steps size="is-small" type="is-secondary" :has-navigation="false" v-model="activeStep">
        <b-step-item label="Datos generales" :clickable="true">
          <ui-add-general-data></ui-add-general-data>
        </b-step-item>
        <b-step-item label="Distribución de datos" :clickable="true">
          <ui-data-distribution></ui-data-distribution>
        </b-step-item>
      </b-steps>
    </div>
  </div>
</template>

<script>
import UIAddGeneralData from "./UICreateTemplate/UIAddGeneralData.vue";
import UIDataDistribution from "./UICreateTemplate/UIDataDistribution.vue";

export default {
  components: {
    "ui-add-general-data": UIAddGeneralData,
    "ui-data-distribution": UIDataDistribution
  },
  data() {
    return {
      activeStep: 0,
      title: "Crear Plantilla"
    };
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
  width: 1000px;
  // background-color: red;
  justify-self: center;
}
</style>