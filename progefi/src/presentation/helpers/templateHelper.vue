<template>
  <div>
    <div id="template_helper_container" class="box">
      <div id="template_helper_container_header">
        <div id="template_helper_container_header_title">
          <b class="is-size-6">Plantilla a utilizar:</b>
        </div>

        <div id="template_helper_container_content">
          <div id="template_helper_container_content_select">
            <b-field id="template-select" custom-class="is-small is-centered" label="Plantilla:">
              <b-select placeholder="Selecciona una plantilla" v-model="selectedTemplate"></b-select>
            </b-field>
          </div>
          <div id="template_helper_container_content_template_sample"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTemplate: null
    };
  }
};
</script>

<style lang="scss">
#template_helper_container {
  display: grid;
  grid-template-rows: 40px 400px;
}

#template_helper_container_header {
  grid-row: 1 / 2;
}

#template_helper_container_content {
  grid-row: 2 / 3;
  display: grid;
  grid-template-rows: 20px 380px;
}
</style>