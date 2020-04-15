<template>
  <div id="ui_create_template_general_data_container">
    <p class="title">DATOS DE LA PLANTILLA:</p>

    <create-template-general-data></create-template-general-data>

    <div id="ui_create_template_general_data_next_button_div">
      <button class="button is-accent" :disabled="disableNextButton()">Siguiente</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import createTemplateGeneralData from "../../components/createTemplateGeneralData.vue";

export default {
  components: {
    "create-template-general-data": createTemplateGeneralData
  },
  computed: {
    ...mapState("template", {
      isNameValid: state => state.template.getNameValid(),
      isBackgroundColorValid: state => state.template.getBackgroundColorValid(),
      isFontColorValid: state => state.template.getFontColorValid(),
      isFontFamilyValid: state => state.template.getFontFamilyValid()
    })
  },
  methods: {
    disableNextButton() {
      if (
        this.isNameValid.isValid &&
        this.isBackgroundColorValid.isValid &&
        this.isFontFamilyValid.isValid &&
        this.isFontColorValid.isValid
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss">

#ui_create_template_general_data_next_button_div {
  margin-top: 20px;
  justify-content: end;
  align-self: flex-end;
}

</style>