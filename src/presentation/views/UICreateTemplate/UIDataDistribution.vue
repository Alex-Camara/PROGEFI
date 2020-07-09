<template>
  <div id="ui_create_template_data_distribution_container" class="white_box">
    <p class="title">DISTRIBUCIÓN DE DATOS:</p>

    <create-tag></create-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
import createTag from "../../components/createTag.vue";

export default {
  components: {
    "create-tag": createTag
  },
  computed: {
    ...mapState("template", {})
  },
  methods: {}
};
</script>

<style lang="scss">
@import "../../style/style.scss";
#ui_create_template_data_distribution_container {
}
</style>