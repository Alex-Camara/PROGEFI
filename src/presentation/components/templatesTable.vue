<template>
  <div id="templates_table_container">
    <div id="templates_table_null_templates_message" v-if="templates.length == 0">
      <p class="is-size-5">{{nullTemplatesMessage}}</p>
    </div>

    <div id="templates_table_table_container">
      <div
        id="templates_table_container_elements"
        v-for="(template, index) in templates"
        :key="template.getId()"
        @click="showTemplate(template)"
      >
        <div>
          <img id="templates_table_container_sample_image" :src="getImage(index)"/>
        </div>
        <div id="templates_table_element_title">{{template.getName()}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Template from "../models/template";
import path from 'path';
export default {
  data() {
    return {
      templates: [],
      loading: false,
      nullTemplatesMessage: "Aún no hay plantillas..."
    };
  },
  async mounted() {
    this.templates = await Template.getAll();
    this.$emit("templateCount", this.templates.length);
  },
  methods: {
    showTemplate(template) {
      this.$emit("showTemplate", template);
    },
    getImage(index){
      if (process.env.NODE_ENV !== 'production'){
        let relativePath = path.join(__dirname, '..', '..', '..', '..', '..', '..') + '/src/persistence/resources/template_samples/' + this.templates[index].getSamplePath();
        let src = "file://" + relativePath;
        return src;
      } else{
        let relativePath = path.join(__dirname, '..', '..') + '/src/persistence/resources/template_samples/' + this.templates[index].getSamplePath();
        let src = "file://" + relativePath;
        return src;
      }
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";
#templates_table_container {
  display: flex;
  margin: auto;
  justify-content: center;
  flex-direction: column;
  width: 1000px;
  margin-bottom: 100px;
}

#templates_table_null_templates_message {
  text-align: center;
}

#templates_table_table_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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

#templates_table_container_sample_image{
  transition: 0.2s;
  opacity: 1;
}

#templates_table_container_elements:hover #templates_table_container_sample_image{
  transition: 0.2s;
  opacity: 0.2;
}

#templates_table_container_elements:hover #templates_table_element_title{
  transition: 0.2s;
  /*padding-bottom: 100px;*/
  /*font-size: 20px;*/
  transform: scale(1.5);
}

#templates_table_element_title {
  transition: 0.2s;
  font-size: 18px;
  justify-self: end;
  align-self: center;
  font-weight: bold;
}
</style>