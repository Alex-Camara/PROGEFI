<template>
  <div id="validateData_component" class="box" @click="closeAutocompletes()">
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
          <!-- <b-tooltip label="Nombre del curador" position="is-top" animated> -->
          <input
            id="validate_input"
            placeholder="Nombre del curador..."
            class="input"
            v-model="selectedCurator"
            @focus="autocompleteCuratorStatus =true"
            @click.stop="autocompleteCuratorStatus =true"
          />
          <div
            id="autocomplete_box"
            v-if="autocompleteCuratorStatus && curatorState.curators.length > 0"
          >
            <ul id="autocomplete_list">
              <li
                v-for="curator in curatorState.curators"
                :key="curator.name"
                :value="curator"
                @click="setCurator($event, curator)"
              >{{curator.name}}</li>
            </ul>
          </div>
        </b-field>
        <b-button id="validate_button" @click="addCurator()" :disabled="!isCuratorValid">Agregar</b-button>
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
        :preview="showPreview"
        v-if="showPreview"
      ></datacardFormat-helper>

      <datacardFormat-helper
        id="datatardFormat_helper"
        ref="datacard_helper"
        :colorsEnabled="false"
        :preview="showPreview"
        v-if="!showPreview"
      ></datacardFormat-helper>
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
      isSwitched: "Inhabilitar edición",
      autocompleteCuratorStatus: false,
      showPreview: true,
      textInButton: 'Guardar borrador de ficha'
    };
  },
  computed: {
    // ...mapState("addDatacard", {
      // photoCollect: state => state.photoCollect
    // }),
    ...mapState("template", {
      template: state => state.template
    }),
    ...mapState("curator", {
      curatorState: state => state,
      selectedCuratorsNameString: state => state.selectedCuratorsName,
      isCuratorValid: state => state.curator.valid.isValid
    }),
    ...mapGetters("curator", ["curatorsName"]),
    ...mapGetters("curator", ["selectedCuratorsName"]),
    selectedCurator: {
      get: function() {
        let curator = this.curatorState.curator;
        if (
          !curator.valid.isValid ||
          curator.valid.message == "temporary error"
        ) {
          this.addShakeEffect("validate_input");
        }
        return curator.name;
      },
      set: function(newValue) {
        store.dispatch("curator/setCurator", newValue);
      }
    }
  },
  watch: {
    selectedCuratorsNameString(newValue, oldValue) {
      if (newValue == '') {
        this.$refs.datacard_helper.setValues();
        this.textInButton = 'Guardar borrador de ficha'
      } else{
        this.$refs.datacard_helper.setValues();
        this.textInButton = 'Generar ficha'
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
    addCurator() {
      store.dispatch("curator/addCurator");
      this.selectedCurator = "";
    },
    deleteCurator(curator) {
      store.commit("curator/deleteCurator", curator);
    },
    setCurator(event, curator) {
      this.selectedCurator = curator;
      this.autocompleteCuratorStatus = false;
    },
    addShakeEffect(elemenId) {
      let element = document.getElementById(elemenId);
      if (element != null) {
        element.classList.remove("shake_field");
        void element.offsetWidth; // trigger a DOM reflow
        element.classList.add("shake_field");
      }
    },
    closeAutocompletes() {
      this.autocompleteCuratorStatus = false;
    },
    onDatacardCreated() {
      this.$emit("datacardCreated");
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
  margin-top: 20px;
  align-self: center;
  display: flex;
  flex-direction: column;
}

#validate_input {
  margin-top: 4px;
  height: 40px;
  width: 450px;
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