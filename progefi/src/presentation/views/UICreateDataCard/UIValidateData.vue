<template>
  <div id="validateData_component" class="box" @click="closeAutocompletes()">
    <!-- --------validateData Component Header----- -->
    <div id="validateData_component_header">
      <p class="subtitle is-5">Validación</p>
    </div>

    <!-- --------TaxonomicalData Component Content----- -->
    <div id="validateData_component_content" class="box">
      <select-curators id="select_curators" ref="selectCurators"></select-curators>

      <div id="validate_data_switch_button">
        <b-switch
          id="enable_colors_button"
          v-model="isSwitched"
          true-value="Inhabilitar edición"
          false-value="Habilitar edición"
          @input="enableColors()"
        >{{ isSwitched }}</b-switch>
      </div>

      <preview-datacard
        id="preview_datacard"
        ref="preview_datacard"
        :colorsEnabled="colorsEnabled"
        :preview="showPreview"
        v-if="showPreview"
      ></preview-datacard>

      <preview-datacard
        id="preview_datacard"
        ref="preview_datacard"
        :colorsEnabled="false"
        :preview="showPreview"
        v-if="!showPreview"
      ></preview-datacard>
    </div>

    <!-- --------ValidateData Bottom Buttons----- -->
    <div id="validateData_component_bottomButtons">
      <b-button type="is-light" v-on:click="backwardStep()">Anterior</b-button>
      <b-button type="is-secondary" v-text="textInButton" v-on:click="generateDatacard()"></b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "../../store/store.js";
import previewDatacard from "../../components/previewDatacard.vue";
import selectCurators from "../../components/selectCurators.vue";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

export default {
  components: {
    "preview-datacard": previewDatacard,
    "select-curators": selectCurators
  },
  data() {
    return {
      colorsEnabled: true,
      isSwitched: "Inhabilitar edición",
      showPreview: true,
      textInButton: "Guardar borrador de ficha"
    };
  },
  computed: {
    ...mapState("template", {
      template: state => state.template
    }),
    ...mapState("curator", {
      selectedCuratorsNameString: state => state.selectedCuratorsName
    }),
    ...mapGetters("curator", ["curatorsName"])
  },
  watch: {
    selectedCuratorsNameString(newValue, oldValue) {
      if (newValue == "") {
        this.$refs.preview_datacard.setValues();
        this.textInButton = "Guardar borrador de ficha";
      } else {
        this.$refs.preview_datacard.setValues();
        this.textInButton = "Generar ficha";
      }
    }
  },
  methods: {
    backwardStep() {
      store.commit("addDatacard/setActiveStep", 3);
    },
    forwardStep() {
      store.commit("addDatacard/setActiveStep", 4);
    },
    enableColors() {
      if (this.colorsEnabled) {
        this.colorsEnabled = false;
      } else {
        this.colorsEnabled = true;
      }
    },
    generateDatacard() {
      if (this.showPreview) {
        this.showPreview = false;
      } else {
        this.showPreview = true;
      }
    },
    closeAutocompletes() {
      this.$refs.selectCurators.closeAutocompletes();
    },
    onDatacardCreated() {
      this.$emit("datacardCreated");
    }
  }
};
</script>

<style lang="scss">
#validateData_component {
  height: 1120px;
  display: grid;
  //grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 50px 1000px 20px;
}

#validateData_component_header {
  grid-row: 1 / 2;
  justify-self: center;
  height: 50px;
}

#validateData_component_content {
  grid-row: 2 / 3;
  display: grid;
  grid-template-rows: 180px 80px 750px;
  //justify-self: center;
}

#select_curators {
  grid-row: 1/2;
  justify-self: center;
}

#enable_colors_button {
  margin-top: 15px;

  width: 200px;
  justify-content: start;
}

#validate_data_switch_button {
  grid-row: 2 / 3;
}

#preview_datacard {
  grid-row: 3 / 4;
}

#validateData_component_bottomButtons {
  grid-row: 3 /4;
  justify-self: end;
}

.shake_field {
  outline-color: red;
  /* also need animation and -moz-animation */
  animation: shake 0.5s linear;
}
/* also need keyframes and -moz-keyframes */
@keyframes shake {
  8%,
  41% {
    -webkit-transform: translateX(-10px);
  }
  25%,
  58% {
    -webkit-transform: translateX(10px);
  }
  75% {
    -webkit-transform: translateX(-5px);
  }
  92% {
    -webkit-transform: translateX(5px);
  }
  0%,
  100% {
    -webkit-transform: translateX(0);
  }
}
</style>