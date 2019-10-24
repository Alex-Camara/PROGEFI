<template>
  <div id="validateData_component" class="box">
    <!-- --------validateData Component Header----- -->
    <div id="validateData_component_header">
      <p class="subtitle is-5">Validación</p>
    </div>

    <!-- --------TaxonomicalData Component Content----- -->
    <div id="validateData_component_content" class="box">
        <datacardFormat-helper></datacardFormat-helper>
    </div>

    <!-- --------ValidateData Bottom Buttons----- -->
    <div id="validateData_component_bottomButtons">
      <b-button type="is-light" v-on:click="backwardStep()">Anterior</b-button>
      <b-button type="is-accent" v-on:click="forwardStep()">Siguiente</b-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../../store/store.js";
import datacardFormatHelper from "../../helpers/datacardFormatHelper.vue";

export default {
  components: {
    "datacardFormat-helper": datacardFormatHelper
  },
  data() {
    return {};
  },
  methods: {
    backwardStep() {
      store.commit("datacard/setActiveStep", 3);
    },
    forwardStep() {
      store.commit("datacard/setActiveStep", 4);
    }
  },
  computed: {
    ...mapState("datacard", {
      photoCollect: state => state.photoCollect
    })
  }
};
</script>

<style lang="scss">
#validateData_component {
  height: 820px;
  display: grid;
  //grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 50px 700px 20px;
}

#validateData_component_header {
  grid-row: 1 / 2;
  justify-self: center;
  height: 50px;
}

#validateData_component_content {
  grid-row: 2 / 3;
  display: grid;
  grid-template-rows: 100%;
  //justify-self: center;
}

#validateData_component_bottomButtons {
  grid-row: 3 / 4;
  justify-self: end;
}
</style>