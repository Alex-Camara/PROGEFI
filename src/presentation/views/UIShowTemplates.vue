<template>
  <div id="show_templates_component">
    <div id="show_templates_component_title">
      <p class="component_title">Plantillas</p>
    </div>

    <div id="show_templates_component_content">
      <templates-table
        @showTemplate="showTemplate($event)"
        @templateCount="setTemplateCount($event)"
      ></templates-table>

      <div class="float_button" v-on:click="createTemplate()">
        <img class="float_button_icon" :src="require('../assets/plus.png')" />
      </div>
    </div>
  </div>
</template>

<script>
import templatesTable from "../components/templatesTable.vue";
export default {
  components: {
    "templates-table": templatesTable
  },
  data() {
    return {
      templateCount: 0,
      templateLimitMessage: "No se pueden registrar más de 15 plantillas..."
    };
  },
  methods: {
    createTemplate() {
      if (!this.templateCount >= 15) {
        this.openDialog(this.templateLimitMessage);
      } else {
        this.$router.push({
          name: "UICreateTemplate"
        });
      }
    },
    showTemplate(template) {
      this.$router.push({
        name: "UIShowTemplate",
        params: { template }
      });
    },
    setTemplateCount(count) {
      this.templateCount = count;
    },
    openDialog(message) {
      this.$buefy.dialog.alert(message);
    }
  }
};
</script>

<style lang="scss">
#show_templates_component {
  display: grid;
  grid-template-rows: 10% 90%;
  height: 100%;
}
#show_templates_component_title {
  grid-row: 1 / 2;
  display: flex;
  justify-self: center;
  align-self: center;
}
#show_templates_component_content {
  grid-row: 2 / 3;
  margin-top: 20px;
}
</style>
