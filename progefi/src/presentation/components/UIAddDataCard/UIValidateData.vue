<template>
  <div id="validateData_component" class="box">
    <!-- --------validateData Component Header----- -->
    <div id="validateData_component_header">
      <p class="subtitle is-5">Validación</p>
    </div>

    <!-- --------TaxonomicalData Component Content----- -->
    <div id="validateData_component_content" class="box">
      <b-button
        id="enable_colors_button"
        v-text="enableColorsButtonText"
        :type="enableColorsButtonColor"
        @click="enableColors()"
      ></b-button>
      <b-modal :active.sync="isDatacardModalActive">
        <p class="image is-4by3">
          <img src="/static/img/placeholder-1280x960.png" />
        </p>
      </b-modal>
      <datacardFormat-helper id="datatardFormat_helper" :colorsEnabled="colorsEnabled"></datacardFormat-helper>
    </div>

    <!-- --------ValidateData Bottom Buttons----- -->
    <div id="validateData_component_bottomButtons">
      <b-button type="is-light" v-on:click="backwardStep()">Anterior</b-button>
      <b-button type="is-secondary" v-on:click="previsualizeDatacard()">Generar ficha</b-button>
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
    return {
      colorsEnabled: true,
      enableColorsButtonText: "Deshabilitar colores",
      enableColorsButtonColor: "is-warning",
      isDatacardModalActive: true
    };
  },
  methods: {
    backwardStep() {
      store.commit("datacard/setActiveStep", 3);
    },
    forwardStep() {
      store.commit("datacard/setActiveStep", 4);
    },
    enableColors() {
      if (this.colorsEnabled) {
        this.colorsEnabled = false;
        this.enableColorsButtonText = "Habilitar colores";
        this.enableColorsButtonColor = "is-secondary";
      } else {
        this.colorsEnabled = true;
        this.enableColorsButtonText = "Deshabilitar colores";
        this.enableColorsButtonColor = "is-warning";
      }
    },
    previsualizeDatacard() {}
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
  height: 860px;
  display: grid;
  //grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 50px 760px 20px;
}

#validateData_component_header {
  grid-row: 1 / 2;
  justify-self: center;
  height: 50px;
}

#validateData_component_content {
  grid-row: 2 / 3;
  display: grid;
  grid-template-rows: 50px 700px;
  //justify-self: center;
}

#enable_colors_button {
  grid-row: 1 / 2;
  width: 300px;
}

#datatardFormat_helper {
  grid-row: 2 / 3;
}

#validateData_component_bottomButtons {
  grid-row: 3 / 4;
  justify-self: end;
}
</style>