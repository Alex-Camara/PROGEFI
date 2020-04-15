<template>
  <div id="templates_table_container">
    <div id="templates_table_null_templates_message" v-if="templateState.templates.length == 0">
      <p class="is-size-5">Aún no hay plantillas...</p>
    </div>

    <div id="templates_table_table_container">
      <div
        id="templates_table_container_elements"
        v-for="template in templateState.templates"
        :key="template.getId()"
        @click="setSelected(template)"
      >
        <div>
          <img :src="template.getSamplePath()" />
        </div>
        <div id="templates_table_element_title">{{template.getName()}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      selectedTemplate: null,
      loading: false
    };
  },
  mounted() {
    this.$store.dispatch("template/getTemplates");
  },
  computed: {
    ...mapState("template", {
      templateState: state => state
    })
  },
  methods: {
    setSelected(template) {
        this.selectedTemplate = template
    },
    showTemplate() {},
    // Usado para obtener la clase css de la fila que invoca al método
    getRowClass(row, index) {
      // debugger;
      if (this.selectedTemplate != null) {
        if (this.selectedTemplate.getId() == row.getId()) {
          return "selected";
        }
        return "not-selected";
      }
      return "not-selected";
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";
#templates_table_container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

#templates_table_null_templates_message {
  text-align: center;
}

#templates_table_table_container {
  display: flex;
  justify-content: center;
}

#templates_table_container_elements {
  border-radius: 5px 5px 5px 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: $light;
  height: 350px;
  width: 400px;
  margin: 50px;
  padding: 10px;
  cursor: pointer;
}

#templates_table_container_elements:hover {
  background-color: $secondary;
}

#templates_table_element_title {
  justify-self: end;
  align-self: center;
  font-weight: bold;
}
</style>