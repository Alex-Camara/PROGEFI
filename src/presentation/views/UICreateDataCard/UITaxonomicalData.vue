<template>
  <div id="taxonomicalData_component" class="box" @click="closeAutocompletes()">
    <div id="taxonomicalData_component_header">
      <p class="subtitle_dark_gray is-5">Datos taxonómicos</p>
    </div>

    <div id="taxonomicalData_component_content_speciesData" class="box">
      <taxonomical-data-form ref="taxonomicalDataForm"></taxonomical-data-form>
    </div>
    <!-- --------TaxonomicalData Component Content Species observation data----- -->
    <div id="taxonomicalData_component_content_species_observationData" class="box">
      <!-- --------TaxonomicalData Component Content species observationData header----- -->

      <div id="taxonomicalData_component_content_observationData_header">
        <b class="is-size-6">Datos de observación:</b>
      </div>

      <select-sex id="select_sex"></select-sex>

      <select-life-stage id="select_life_stage"></select-life-stage>

      <!-- <observation-input id="observation_input"></observation-input> -->
      <observation-input id="observation_input"></observation-input>
    </div>

    <!-- --------TaxonomicalData Bottom Buttons----- -->
    <div id="taxonomicalData_component_bottomButtons">
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
import axios from "axios";
import { mapState } from "vuex";
import selectSex from "../../components/selectSex.vue";
import selectlifeStage from "../../components/selectLifeStage.vue";
import taxonomicalDataForm from "../../components/taxonomicalDataForm.vue";
import observationInput from "../../components/observationInput.vue";

export default {
  components: {
    "select-sex": selectSex,
    "select-life-stage": selectlifeStage,
    "taxonomical-data-form": taxonomicalDataForm,
    "observation-input": observationInput
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard,
      scientificNameValid: state =>
        state.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .getScientificNameValid(),
      isLifeStageValid: state =>
        state.datacard
          .getCollect()
          .getSpecimen()
          .getLifeStageValid(),
      isSexValid: state =>
        state.datacard
          .getCollect()
          .getSpecimen()
          .getSexValid()
    })
  },
  methods: {
    closeAutocompletes() {
      this.$refs.taxonomicalDataForm.closeAutocompletes();
    },
    backwardStep() {
      store.commit("addDatacard/setActiveStep", 2);
    },
    forwardStep() {
      store.commit("addDatacard/setActiveStep", 4);
    },
    disableNextButton() {
      //debugger;
      if (
        this.scientificNameValid.isValid &&
        this.isLifeStageValid.isValid &&
        this.isSexValid.isValid
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
#taxonomicalData_component {
  height: 900px;
  display: grid;
  grid-template-rows: 50px 330px 440px 20px;
}

#taxonomicalData_component_header {
  grid-row: 1 / 2;
  justify-self: center;
  height: 50px;
}

#taxonomicalData_component_content_speciesData {
  grid-row: 2 / 3;
}

#taxonomicalData_component_content_species_observationData {
  grid-row: 3 / 4;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 40px 180px 150px;
}

#taxonomicalData_component_bottomButtons {
  grid-row: 4 / 5;
  justify-self: end;
}

#taxonomicalData_component_content_species_data_header {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}
#taxonomicalData_component_content_observationData_header {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

#select_sex {
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  margin-right: 10px;
}

#select_life_stage {
  grid-row: 2 / 3;
  grid-column: 3 / 6;
  margin-left: 10px;
}

#observation_input {
  grid-row: 3 / 4;
  grid-column: 1 / 6;
}
</style>