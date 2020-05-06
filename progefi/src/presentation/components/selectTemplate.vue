<template>
  <div>
    <div id="template_helper_container" class="gray_box">
      <div id="template_helper_container_header">
        <div id="template_helper_container_header_title">
          <b class="is-size-6">{{ title }}</b>
        </div>

        <div id="template_helper_container_content">
          <div id="template_helper_container_content_select">
            <b-field
              id="template-select"
              custom-class="is-small is-centered"
              label="Plantilla:"
            >
              <div class="select">
                <select
                  id="template_select"
                  placeholder="Selecciona una plantilla"
                  v-model="selectedTemplate"
                >
                  <option
                    v-for="template in templates"
                    :key="template.getName()"
                    :value="template"
                    >{{ template.getName() }}</option
                  >
                </select>
              </div>
            </b-field>
          </div>
          <div id="template_helper_container_content_template_sample">
            <b id="sample_image_text">Muestra:</b>
            <img id="sample_image" :src="selectedTemplate.getSamplePath()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Template from "../models/template";

export default {
  data() {
    return {
      title: "Plantilla a utilizar:",
      templates: []
    };
  },
  async mounted() {
    this.templates = await Template.getAll();

    if (this.selectedTemplate.getId() === null) {
      this.selectedTemplate = this.templates[0];
    } else {
      this.selectedTemplate = this.templates.find(
        x => x.name === this.selectedTemplate.getName()
      );
    }
  },
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard
    }),
    selectedTemplate: {
      get: function() {
        return this.datacard.getTemplate();
      },
      set: function(newValue) {
        this.datacard.setTemplate(newValue);
      }
    }
  }
};
</script>

<style lang="scss">
#template_helper_container {
  display: grid;
  grid-template-rows: 40px 460px;
}

#template_helper_container_header {
  grid-row: 1 / 2;
}

#template_helper_container_content {
  grid-row: 2 / 3;
  display: grid;
  grid-template-columns: 30% 70%;
}

#template_helper_container_content_template_sample {
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
}

#sample_image {
  height: 450px;
}

#sample_image_text {
  //height: 12px;
  font-size: 12px;
}

#template_helper_container_content_select {
  grid-column: 1 / 2;
}
</style>
