<template>
  <!-- --------GeneralData Component----- -->

  <!-- --------GeneralData Title----- -->
  <div id="generalData_component" class="box" @click="closeAutocompletes()">
    <!-- --------AddDataCard2 right Side Component Header----- -->
    <div id="generalData_component_header">
      <p class="subtitle_dark_gray is-5">Datos generales</p>
    </div>

    <div>
      <br />
      <hr class="separator" />
      <div v-observe-visibility="visibilityChanged" v-if="photoCollect.changed">
        Extrayendo metadatos de la imagen, espere...
        <progress
          class="progress is-small is-accent"
          max="100"
        ></progress>
      </div>
    </div>

    <div id="generalData_component_template_selection">
      <select-template></select-template>
    </div>

    <!-- --------AddDataCard2 Right Side Component Content----- -->
    <div id="generalData_component_content" class="box">
      <general-data-form
        ref="generalDataForm"
        :catalogue="catalogue"
        :disableFields="disableFields"
      ></general-data-form>
    </div>

    <!-- --------AddDataCard2 Bottom Buttons----- -->
    <div id="generalData_component_bottomButtons">
      <b-button type="is-light" v-on:click="backwardStep()">Anterior</b-button>
      <b-button
        type="is-accent"
        v-on:click="forwardStep()"
        :disabled="disableNextButton()"
      >Siguiente</b-button>
    </div>
  </div>
</template>

<script>
import store from "../../store/store.js";
import { mapState, mapGetters } from "vuex";

import selectTemplate from "../../components/selectTemplate.vue";
import generalDataForm from "../../components/generalDataForm.vue";

export default {
  props: ["catalogue", "disableFields"],
  name: "UIGeneralData",
  components: {
    "select-template": selectTemplate,
    "general-data-form": generalDataForm
  },
  data() {
    return {};
  },
  mounted() {
    // console.info(this.catalogue);
  },
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard
    }),
    ...mapState("addDatacard", {
      photoCollect: state => state.photoCollect
    }),
    ...mapState("metadata", {
      metadataState: state => state
    }),
    hasMetadata: function() {
      return this.metadataState.hasMetadata;
    }
  },
  watch: {
    hasMetadata(newValue) {
      if (!newValue) {
        this.openSnackBar("¡Esta fotocolecta no contiene metadatos!");
      }
    }
  },
  methods: {
    backwardStep() {
      store.commit("addDatacard/setActiveStep", 0);
    },
    forwardStep() {
      store.commit("addDatacard/setActiveStep", 2);
    },
    openSnackBar(message) {
      this.$buefy.snackbar.open({
        message: message,
        type: "is-danger",
        position: "is-bottom",
        duration: 5000
      });
    },
    //para obtener de nuevo los metadatos si la imagen ha cambiado
    visibilityChanged(isVisible, entry) {
      if (this.photoCollect.changed && isVisible) {
        setTimeout(this.getMetaData, 1000);
      }
    },
    getMetaData() {
      store.dispatch("metadata/getImageMetadata");
    },
    closeAutocompletes() {
      this.$refs.generalDataForm.closeAutocompletes();
    },
    disableNextButton() {
      if (
        this.datacard.getCollect().getModel().isValid()&&
        this.datacard.getCollect().getModel().getDevice().isValid()&&
        this.datacard.getCatalogue().isValid()&&
        this.datacard.getCollect().isCollectDateValid()&&
        this.datacard.getCollect().getProject().isValid()&&
        this.datacard.getCollect().getCollector().isValid()
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
@import "../../style/style.scss";
#generalData_component {
  display: grid;
  grid-template-rows: 35px 10px 550px 440px 30px;
  height: 1100px;
  margin-top: 10px;
  align-items: center;
}

#separator {
  grid-row: 2 / 3;
}

#generalData_component_header {
  grid-row: 1 / 2;
  justify-self: center;
}

#generalData_component_template_selection {
  grid-row: 3 / 4;
}

#generalData_component_content {
  grid-row: 4 / 5;
}

#generalData_component_bottomButtons {
  grid-row: 5 / 6;
  justify-self: end;
}
</style>

250