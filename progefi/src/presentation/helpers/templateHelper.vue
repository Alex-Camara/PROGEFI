<template>
  <div>
    <div id="template_helper_container" class="box has-background-light">
      <div id="template_helper_container_header">
        <div id="template_helper_container_header_title">
          <b class="is-size-6">Plantilla a utilizar:</b>
        </div>

        <div id="template_helper_container_content">
          <div id="template_helper_container_content_select">
            <b-field id="template-select" custom-class="is-small is-centered" label="Plantilla:">
              <b-dropdown aria-role="list" v-model="selectedTemplate">
                <button class="button is-secondary" slot="trigger">
                  <p>{{ selectedTemplate.name }}</p>
                  <b-icon icon="menu-down"></b-icon>
                </button>
                <b-dropdown-item
                  aria-role="listitem"
                  v-for="template in templateState.templates"
                  :key="template.id"
                  :value="template"
                >{{ template.name }}</b-dropdown-item>
              </b-dropdown>
            </b-field>
          </div>
          <div id="template_helper_container_content_template_sample">
            <b id="sample_image_text">Muestra:</b>
            <img id="sample_image" :src="selectedTemplate.samplePath" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/store.js";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("template", {
      templateState: state => state
    }),
    selectedTemplate: {
      get: function() {
        return this.templateState.template;
      },
      set: function(newValue) {
        //debugger;
        store.dispatch("template/getTemplate", newValue.id);
      }
    }
  },
  methods: {
    setTemplate(template) {
      store.dispatch("template/getTemplate", template.id);
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