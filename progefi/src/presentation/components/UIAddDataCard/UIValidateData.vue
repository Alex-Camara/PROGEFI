<template>
  <div id="validateData_component" class="box">
    <!-- --------validateData Component Header----- -->
    <div id="validateData_component_header">
      <p class="subtitle is-5">Validación</p>
    </div>

    <!-- --------TaxonomicalData Component Content----- -->
    <div id="validateData_component_content" class="box">
      <div id="validateData_component_content_options" class="box">
        <b-switch
          id="enable_colors_button"
          v-model="isSwitched"
          true-value="Inhabilitar edición"
          false-value="Habilitar edición"
          @input="enableColors()"
        >{{ isSwitched }}</b-switch>

        <div id="vertical_separator"></div>

        <b-field id="validate_field" custom-class="is-small is-centered">
          <b-tooltip label="Nombre del curador" position="is-top" animated>
            <b-autocomplete
              id="validate_input"
              placeholder="Nombre del curador..."
              v-model="selectedCurator"
              :open-on-focus="true"
              :data="curatorsName"
            ></b-autocomplete>
          </b-tooltip>
          <b-button id="validate_button" @click="addCurator()">Agregar</b-button>
        </b-field>
      </div>

      <div id="curators_tags" class="box">
        <div>
          <b>Curadores:</b>
        </div>

        <div>
          <ul id="curators_tags_list">
            <li
              id="curators_tags_list_item"
              v-for="selectedCurator in selectedCuratorsName"
              :key="selectedCurator"
              :value="selectedCurator"
            >
              <span id="curators_tags_list_item_tag" class="tag is-secondary">
                {{selectedCurator}}
                <button
                  class="delete is-small"
                  @click="deleteCurator(selectedCurator)"
                ></button>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <datacardFormat-helper
        id="datatardFormat_helper"
        ref="datacard_helper"
        :colorsEnabled="colorsEnabled"
      ></datacardFormat-helper>
    </div>

    <!-- --------ValidateData Bottom Buttons----- -->
    <div id="validateData_component_bottomButtons">
      <b-button type="is-light" v-on:click="backwardStep()">Anterior</b-button>
      <b-button type="is-secondary" v-on:click="previsualizeDatacard()">Generar ficha (Sin validar)</b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "../../store/store.js";
import datacardFormatHelper from "../../helpers/datacardFormatHelper.vue";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

export default {
  components: {
    "datacardFormat-helper": datacardFormatHelper
  },
  data() {
    return {
      colorsEnabled: true,
      isDatacardModalActive: true,
      isSwitched: "Inhabilitar edición",
      validate: false,
      selectedCurator: null
    };
  },
  computed: {
    ...mapState("datacard", {
      photoCollect: state => state.photoCollect
    }),
    ...mapState("curator", {
      curatorState: state => state,
      selectedCuratorsNameString: state => state.selectedCuratorsName
    }),
    ...mapGetters("curator", ["curatorsName"]),
    ...mapGetters("curator", ["selectedCuratorsName"])
  },
  watch: {
    selectedCurator(newValue, oldValue) {
      store.dispatch("curator/setSelectedCurator", { name: newValue });
      store.dispatch("curator/getCurators", newValue);
    },
    selectedCuratorsNameString(newValue, oldValue) {
      this.$refs.datacard_helper.setValues();
    }
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
      } else {
        this.colorsEnabled = true;
      }
    },
    previsualizeDatacard() {
      domtoimage
        .toBlob(document.getElementById("datatardFormat_helper"), {
          width: 1250,
          height: 800,
          style: {
            transform: "scale(1.185)",
            "transform-origin": "top left"
          }
        })
        .then(function(blob) {
          window.saveAs(blob, "ficha.png");
        });
    },
    addCurator() {
      store.dispatch("curator/addCurator");
      this.selectedCurator = "";
    },
    deleteCurator(curator) {
      store.commit("curator/deleteCurator", curator);
    }
  }
};
</script>

<style lang="scss">
#validateData_component {
  height: 1060px;
  display: grid;
  //grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 50px 920px 20px;
}

#validateData_component_header {
  grid-row: 1 / 2;
  justify-self: center;
  height: 50px;
}

#validateData_component_content {
  grid-row: 2 / 3;
  display: grid;
  grid-template-rows: 80px 80px 750px;
  //justify-self: center;
}

#validateData_component_content_options {
  grid-row: 1 / 2;
  justify-self: center;
  display: flex;
  justify-content: center;
  width: 800px;
  height: 70px;
  margin-top: 0px;
  padding-top: 0px;
}

#enable_colors_button {
  margin-top: 15px;
  width: 200px;
  justify-content: start;
}

#vertical_separator {
  margin-top: 20px;
  margin-right: 10px;
  align-self: center;
  border-left: 1px solid gray;
  height: 40px;
}

#validate_field {
  width: 500px;
  height: 30px;
  align-self: center;
}

#validate_input {
  margin-top: 4px;
  height: 40px;
  width: 400px;
}

#validate_button {
  margin-top: 17px;
  //margin-right: 10px;
  width: 100px;
  height: 40px;
  align-self: center;
}

#curators_tags {
  margin-top: 0px;
  padding-top: 5px;
  grid-row: 2 / 3;
  width: 800px;
  height: 70px;
  justify-self: center;
}

#curators_tags_list {
  display: flex;
  justify-content: center;
}

#curators_tags_list_item_tag {
  margin-right: 5px;
}

#datatardFormat_helper {
  grid-row: 3 / 4;
}

#validateData_component_bottomButtons {
  grid-row: 3 / 4;
  justify-self: end;
}
</style>