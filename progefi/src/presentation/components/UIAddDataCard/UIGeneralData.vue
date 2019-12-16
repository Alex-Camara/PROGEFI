<template>
  <!-- --------GeneralData Component----- -->

  <!-- --------GeneralData Title----- -->
  <div id="generalData_component" class="box" @click="closeAutocompletes()">
    <!-- --------AddDataCard2 right Side Component Header----- -->
    <div id="generalData_component_header">
      <p class="subtitle is-5">Datos generales</p>
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
      <template-helper></template-helper>
    </div>

    <!-- --------AddDataCard2 Right Side Component Content----- -->
    <div id="generalData_component_content" class="box">
      <!-- ------- colection select ----- -->
      <b-field id="colection-select" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper :name="'Colección:'" :valid="collectionState.collection.valid"></required-field-helper>
        </template>
        <b-select placeholder="Selecciona una colección" v-model="selectedCollection">
          <option
            v-for="collection in collectionState.collections"
            :key="collection.name"
            :value="collection"
          >{{ collection.name }}</option>
        </b-select>
      </b-field>

      <!-- ------- catalogue select ----- -->
      <b-field id="catalogue-select" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper :name="'Catálogo:'" :valid="catalogueState.catalogue.valid"></required-field-helper>
        </template>
        <b-select placeholder="Selecciona un catálogo" v-model="selectedCatalogue">
          <option
            v-for="catalogue in catalogueState.catalogues"
            :key="catalogue.name"
            :value="catalogue"
          >{{ catalogue.name }}</option>
        </b-select>
      </b-field>

      <!-- ------- proyect select ----- -->
      <b-field id="project-select" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper :name="'Proyecto:'" :valid="projectState.project.valid"></required-field-helper>
        </template>
        <b-select placeholder="Selecciona un proyecto" v-model="selectedProject">
          <option
            v-for="project in projectState.projects"
            :key="project.name"
            :value="project"
          >{{ project.name }}</option>
        </b-select>
      </b-field>

      <!-- ------- collector select ----- -->
      <b-field id="collector_select_field" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper :name="'Colector:'" :valid="collectorState.collector.valid"></required-field-helper>
        </template>
        <input
          id="collector_select"
          placeholder="Selecciona un colector"
          class="input"
          v-model="selectedCollector"
          @focus="autocompleteCollectorStatus =true"
          @click.stop="autocompleteCollectorStatus =true"
        />
        <div
          id="autocomplete_box"
          v-if="autocompleteCollectorStatus && collectorState.collectors.length > 0"
        >
          <ul id="autocomplete_list">
            <li
              v-for="collector in collectorState.collectors"
              :key="collector.name"
              :value="collector"
              @click="setCollector($event, collector)"
            >{{collector.name}}</li>
          </ul>
        </div>
      </b-field>

      <!-- ------- device select ----- -->
      <metadata-helper
        id="device_helper"
        v-bind:selectedValue="selectedDevice"
        v-bind:attribute="'device'"
        v-if="metadataState.device"
      ></metadata-helper>

      <b-field id="device_select_field" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper :name="'Dispositivo:'" :valid="deviceState.device.valid"></required-field-helper>
        </template>
        <input
          id="device_select"
          placeholder="Selecciona un dispositivo"
          class="input"
          v-model="selectedDevice"
          @focus="autocompleteDeviceStatus =true"
          @click.stop="autocompleteDeviceStatus =true"
        />
        <div
          id="autocomplete_box"
          v-if="autocompleteDeviceStatus && deviceState.devices.length > 0"
        >
          <ul id="autocomplete_list">
            <li
              v-for="device in deviceState.devices"
              :key="device.name"
              :value="device"
              @click="setDevice($event, device)"
            >{{device.name}}</li>
          </ul>
        </div>
      </b-field>

      <!-- ------- model select ----- -->
      <metadata-helper
        id="model_helper"
        v-bind:selectedValue="selectedModel"
        v-bind:attribute="'model'"
        v-if="metadataState.model"
      ></metadata-helper>

      <b-field id="model_select_field" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper :name="'Modelo:'" :valid="deviceState.model.valid"></required-field-helper>
        </template>
        <input
          id="model_select"
          placeholder="Selecciona un modelo"
          class="input"
          v-model="selectedModel"
          @focus="autocompleteModelStatus =true"
          @click.stop="autocompleteModelStatus =true"
        />
        <div id="autocomplete_box" v-if="autocompleteModelStatus && deviceState.models.length > 0">
          <ul id="autocomplete_list">
            <li
              v-for="model in deviceState.models"
              :key="model.name"
              :value="model"
              @click="setModel($event, model)"
            >{{model.name}}</li>
          </ul>
        </div>
      </b-field>

      <!-- ------- collect date select ----- -->
      <metadata-helper
        id="collectDate_helper"
        v-bind:selectedValue="datacard.collectDate.formattedDate"
        v-bind:attribute="'formattedDate'"
        v-if="metadataState.collectDate"
      ></metadata-helper>

      <b-field id="collect-date-select" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper :name="'Fecha de colecta:'" :valid="datacard.collectDate.valid"></required-field-helper>
        </template>
        <b-datepicker
          v-model="selectedDate"
          rounded
          placeholder="Elige una fecha..."
          icon="calendar-today"
          :max-date="maxDate"
        ></b-datepicker>
      </b-field>

      <!-- ------- collect hour select ----- -->
      <metadata-helper
        id="collectHour_helper"
        v-bind:selectedValue="datacard.collectDate.formattedHour"
        v-bind:attribute="'formattedHour'"
        v-if="metadataState.collectHour"
      ></metadata-helper>

      <b-field id="collect-hour-select" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper :name="'Hora de colecta:'" :valid="datacard.collectDate.valid"></required-field-helper>
        </template>
        <b-timepicker
          v-model="selectedHour"
          rounded
          editable
          placeholder="Elige una hora..."
          icon="clock"
          hour-format="24"
        ></b-timepicker>
      </b-field>
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
import styleColors from "../../style/style.scss";

import metadataHelper from "../../helpers/metadataHelper.vue";
import templateHelper from "../../helpers/templateHelper.vue";
import requiredFieldHelper from "../../helpers/requiredFieldHelper.vue";

export default {
  name: "UIGeneralData",
  components: {
    "metadata-helper": metadataHelper,
    "template-helper": templateHelper,
    "required-field-helper": requiredFieldHelper
  },
  data() {
    return {
      photoCollectHasChanged: false,
      maxDate: new Date(),
      autocompleteDeviceStatus: false,
      autocompleteCollectorStatus: false,
      autocompleteModelStatus: false
    };
  },
  mounted() {
    store.dispatch("collection/getCollections");
    store.dispatch("project/getProjects");
    //store.dispatch("device/getDevices");
    store.dispatch("template/getTemplates");
  },
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard,
      photoCollect: state => state.photoCollect
    }),
    ...mapState("metadata", {
      metadataState: state => state
    }),
    ...mapState("catalogue", {
      catalogueState: state => state
    }),
    ...mapState("collection", {
      collectionState: state => state
    }),
    ...mapState("project", {
      projectState: state => state
    }),
    ...mapState("collector", {
      collectorState: state => state,
      isCollectorValid: state => state.collector.valid
    }),
    ...mapState("device", {
      deviceState: state => state,
      isDeviceValid: state => state.device.valid,
      isModelValid: state => state.model.valid
    }),
    hasMetadata: function() {
      return this.metadataState.hasMetadata;
    },
    ...mapGetters("collector", ["collectorsName"]),
    ...mapGetters("collection", ["collectionIsRequired"]),
    selectedCollection: {
      get: function() {
        return this.collectionState.collection;
      },
      set: function(newValue) {
        store.dispatch("collection/setCollection", newValue);
        store.dispatch("catalogue/getCatalogues", newValue.id);
      }
    },
    selectedCatalogue: {
      get: function() {
        return this.catalogueState.catalogue;
      },
      set: function(newValue) {
        store.commit("catalogue/setCatalogue", newValue);
      }
    },
    selectedProject: {
      get: function() {
        return this.projectState.project;
      },
      set: function(newValue) {
        store.commit("project/setProject", newValue);
      }
    },
    selectedCollector: {
      get: function() {
        let collector = this.collectorState.collector;
        if (
          !collector.valid.isValid ||
          collector.valid.message == "temporary error"
        ) {
          this.addShakeEffect("collector_select");
        }
        return collector.name;
      },
      set: function(newValue) {
        //cuando el valor a establecer sea un objeto
        if (newValue.hasOwnProperty("id")) {
          store.dispatch("collector/setCollector", newValue);
        } else {
          //cuando el valor a establecer sea un primitivo
          store.dispatch("collector/setCollector", { name: newValue });
        }
      }
    },
    selectedDevice: {
      get: function() {
        let device = this.deviceState.device;
        if (
          !device.valid.isValid ||
          device.valid.message == "temporary error"
        ) {
          this.addShakeEffect("device_select");
        }
        return device.name;
      },
      set: function(newValue) {
        store.dispatch("device/setDevice", newValue);
      }
    },
    selectedModel: {
      get: function() {
        let model = this.deviceState.model;
        if (!model.valid.isValid || model.valid.message == "temporary error") {
          this.addShakeEffect("model_select");
        }
        return model.name;
      },
      set: function(newValue) {
        store.dispatch("device/setModel", newValue);
      }
    },
    selectedDate: {
      get: function() {
        if (this.datacard.collectDate.value == null) {
          store.commit("datacard/setCollectDate", new Date());
        }
        return this.datacard.collectDate.value;
      },
      set: function(newValue) {
        store.commit("datacard/setCollectDate", newValue);
      }
    },
    selectedHour: {
      get: function() {
        return this.datacard.collectDate.value;
      },
      set: function(newValue) {
        store.commit("datacard/setCollectDate", newValue);
      }
    }
  },
  watch: {
    hasMetadata(newValue, oldValue) {
      if (!newValue) {
        this.openSnackBar("¡Esta fotocolecta no contiene metadatos!");
      }
    }
  },
  methods: {
    addShakeEffect(elemenId) {
      let element = document.getElementById(elemenId);
      if (element != null) {
        element.classList.remove("shake_field");
        void element.offsetWidth; // trigger a DOM reflow
        element.classList.add("shake_field");
      }
    },
    closeAutocompletes() {
      this.autocompleteDeviceStatus = false;
      this.autocompleteCollectorStatus = false;
      this.autocompleteModelStatus = false;
    },
    setDevice(event, device) {
      this.selectedDevice = device;
      this.autocompleteDeviceStatus = false;
    },
    setModel(event, model) {
      this.selectedModel = model;
      this.autocompleteModelStatus = false;
    },
    setCollector(event, collector) {
      this.selectedCollector = collector;
      this.autocompleteCollectorStatus = false;
    },
    backwardStep() {
      store.commit("datacard/setActiveStep", 0);
    },
    forwardStep() {
      store.commit("datacard/setActiveStep", 2);
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
    getDevicesName() {
      let devicesName = [];
      for (let i = 0; i < this.deviceState.devices.length; i++) {
        devicesName.push(this.deviceState.devices[i].name);
      }
      return devicesName;
    },
    getModelsName() {
      let modelsName = [];
      for (let i = 0; i < this.deviceState.models.length; i++) {
        modelsName.push(this.deviceState.models[i].name);
      }
      return modelsName;
    },
    getCollectorsName() {
      let collectors = this.collectorState.collectors;
      let collectorsName = [];
      for (let i = 0; i < collectors.length; i++) {
        collectorsName.push(collectors[i].name);
      }
      return collectorsName;
    },
    getModels(selectedDevice) {
      if (foundDevice) {
        store.dispatch("device/getModels", foundDevice.id);
      }
    },
    validateInput(input) {
      let longitude = collector.length;
      let onlyAlphabetAndSpace = /^[a-zA-Z ]*$/.test(collector);
    },
    disableNextButton() {
      if (
        this.deviceState.device.valid.isValid &&
        this.deviceState.model.valid.isValid &&
        this.collectionState.collection.valid.isValid &&
        this.catalogueState.catalogue.valid.isValid &&
        this.datacard.collectDate.valid.isValid &&
        this.projectState.project.valid.isValid &&
        this.collectorState.collector.valid.isValid
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
  //width: 100%;
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
  display: grid;
  height: 380px;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 25% 25% 25% 25%;
  grid-gap: 5px;
  justify-items: start;
  //margin-top: 20px;
  //margin-bottom: 20px;
}

#generalData_component_bottomButtons {
  grid-row: 5 / 6;
  justify-self: end;
}

#colection-select {
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  //max-width: 250px;
}

#catalogue-select {
  grid-row: 1 / 2;
  grid-column: 4 / 5;
  //max-width: 250px;
}

#project-select {
  grid-row: 2 / 3;
  grid-column: 1 / 3;
}

#collector_select_field {
  grid-row: 2 / 3;
  grid-column: 4 / 6;
  display: flex;
  flex-direction: column;
  //max-width: 500px;
}

#device_helper {
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  justify-self: end;
}

#device_select_field {
  grid-row: 3 / 4;
  grid-column: 2 / 3;
  //max-width: 250px;
  display: flex;
  flex-direction: column;
}

#autocomplete_list {
  height: 200px;
  overflow: hidden;
  overflow-y: scroll;
  z-index: 1;
}

#autocomplete_list li {
  padding: 5px;
  padding-left: 10px;
}

#autocomplete_list li:hover {
  background-color: $secondary;
  cursor: pointer;
}

#autocomplete_box {
  position: relative;
  z-index: 10;
  box-shadow: 1px 1px 7px 0px rgba(0, 0, 0, 0.35);
  background-color: white;
}

#model_helper {
  grid-row: 3 / 4;
  grid-column: 3 / 4;
  justify-self: end;
}

#model_select_field {
  grid-row: 3 / 4;
  grid-column: 4 / 5;
  //max-width: 250px;
  display: flex;
  flex-direction: column;
}

#collectDate_helper {
  grid-row: 4 / 5;
  grid-column: 1 / 2;
  justify-self: end;
}

#collect-date-select {
  grid-row: 4 / 5;
  grid-column: 2 / 3;
  //max-width: 250px;
}

#collectHour_helper {
  grid-row: 4 / 5;
  grid-column: 3 / 4;
  justify-self: end;
}

#collect-hour-select {
  grid-row: 4 / 5;
  grid-column: 4 / 5;
  //max-width: 250px;
}

#required_label_field {
  display: flex;
  flex-direction: row;
}

#required_icon {
  height: 8px;
  width: 8px;
  margin-right: 5px;
  align-self: center;
  border-radius: 50%;
  background-color: $accent;
  transition: 0.1s;
}

#required_icon:hover {
  height: 10px;
  width: 10px;
  margin-right: 3px;
  transition: 0.1s;
  cursor: pointer;
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

.slideIn {
  animation: menuSlide 0.5s 1;
  animation-fill-mode: forwards;
}

.slideOut {
  animation: menuSlideOut 0.5s 1;
}

/*Keyframes*/

@keyframes menuSlide {
  from {
    transform: translateX(0px);
    transition-timing-function: ease-in;
  }
  to {
    transform: translateX(300px);
    transition-timing-function: ease-out;
  }
}

@keyframes menuSlideOut {
  from {
    transform: translateX(300px);
    transition-timing-function: ease-in;
  }
  to {
    transform: translateX(0px);
    transition-timing-function: ease-out;
  }
}

/*hr.style1 {
  border-top: 1px solid #8c8b8b;
}*/
</style>

250