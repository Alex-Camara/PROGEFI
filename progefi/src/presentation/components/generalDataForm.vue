<template>
  <div>
    <div id="generalDataForm_content">
      <b-field id="colection_select_field" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper
            :name="'Colección:'"
            :valid="collectionState.collection.getValid()"
          ></required-field-helper>
        </template>
        <div class="select">
          <select
            id="colection_select"
            placeholder="Selecciona una colección"
            v-model="selectedCollection"
            :disabled="disableFields"
          >
            <option
              v-for="collection in collectionState.collections"
              :key="collection.getName()"
              :value="collection"
            >{{ collection.getName() }}</option>
          </select>
        </div>
      </b-field>
      <!-- ------- catalogue select ----- -->
      <b-field id="catalogue_select_field" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper :name="'Catálogo:'" :valid="catalogueState.catalogue.getValid()"></required-field-helper>
        </template>
        <div class="select">
          <select
            id="catalogue_select"
            placeholder="Selecciona un catálogo"
            v-model="selectedCatalogue"
            :disabled="disableFields"
          >
            <option
              v-for="catalogue in catalogueState.catalogues"
              :key="catalogue.getId()"
              :value="catalogue"
            >{{ catalogue.getName() }}</option>
          </select>
        </div>
      </b-field>

      <!-- ------- proyect select ----- -->
      <b-field id="project_select_field" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper :name="'Proyecto:'" :valid="projectState.project.valid"></required-field-helper>
        </template>
        <div class="select">
          <select
            id="project_select"
            placeholder="Selecciona un proyecto"
            v-model="selectedProject"
          >
            <option
              v-for="project in projectState.projects"
              :key="project.name"
              :value="project"
            >{{ project.name }}</option>
          </select>
        </div>
      </b-field>

      <!-- ------- collector select ----- -->
      <b-field id="collector_select_field" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper :name="'Colector:'" :valid="collectorState.collector.getValid()"></required-field-helper>
        </template>
        <input
          id="collector_select"
          placeholder="Selecciona un colector"
          class="input"
          v-model="selectedCollector"
          @focus="autocompleteCollectorStatus =true"
          @click.stop="autocompleteCollectorStatus =true"
          :disabled="catalogueState.catalogue.id == null || disableFields"
        />
        <div
          id="autocomplete_box"
          v-if="autocompleteCollectorStatus && collectorState.collectors.length > 0"
        >
          <ul id="autocomplete_list">
            <li
              v-for="collector in collectorState.collectors"
              :key="collector.getName()"
              :value="collector"
              @click="setCollector($event, collector)"
            >{{collector.getName()}}</li>
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
        v-bind:selectedValue="datacardState.datacard.getFormattedDate()"
        v-bind:attribute="'formattedDate'"
        v-if="metadataState.collectDate"
      ></metadata-helper>

      <b-field id="collect-date-select" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper
            :name="'Fecha de colecta:'"
            :valid="datacardState.datacard.getCollectDateValid()"
          ></required-field-helper>
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
        v-bind:selectedValue="datacardState.datacard.getFormattedHour()"
        v-bind:attribute="'formattedHour'"
        v-if="metadataState.collectHour"
      ></metadata-helper>

      <b-field id="collect-hour-select" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper
            :name="'Hora de colecta:'"
            :valid="datacardState.datacard.getCollectDateValid()"
          ></required-field-helper>
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
  </div>
</template>

<script>
import store from "../store/store.js";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

import metadataHelper from "../helpers/metadataHelper.vue";
import requiredFieldHelper from "../helpers/requiredFieldHelper.vue";
export default {
  props: ["catalogue", "disableFields"],
  components: {
    "metadata-helper": metadataHelper,
    "required-field-helper": requiredFieldHelper
  },
  data() {
    return {
      collectorFieldDisabled: true,
      maxDate: new Date(),
      autocompleteDeviceStatus: false,
      autocompleteCollectorStatus: false,
      autocompleteModelStatus: false
    };
  },
  mounted() {
    this.$store.dispatch("collection/getCollections");
    this.$store.dispatch("project/getProjects");
    if (this.catalogue) {
      this.selectedCollection = this.catalogue.getCollection();
      this.selectedCatalogue = this.catalogue;
    }
    // debugger;
  },
  computed: {
    ...mapState("datacard", {
      datacardState: state => state
    }),
    ...mapState("addDatacard", {
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
      collectorState: state => state
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
        this.$store.commit("catalogue/resetStore");
        this.$store.dispatch("collection/setCollection", newValue);
        // debugger;
        this.$store.dispatch("catalogue/getCatalogues", newValue.id);
      }
    },
    selectedCatalogue: {
      get: function() {
        return this.catalogueState.catalogue;
      },
      set: function(newValue) {
        //Por alguna razón, al asignar el catálogo desde mounted, el valor
        //de catalogue se asigna a undefined
        if (newValue == undefined) {
          newValue = this.selectedCatalogue;
        }
        this.collectorFieldDisabled = false;
        this.$store.dispatch("catalogue/setCatalogue", newValue);
        this.$store.commit("datacard/setCatalogue", newValue);
        this.$store.dispatch("datacard/setDatacardCode", {
          catalogueCode: newValue.getCode(),
          datacardCountInCatalogue: newValue.getDatacardCount()
        });
        this.$store.dispatch("datacard/setCollectorCode");
      }
    },
    selectedProject: {
      get: function() {
        return this.projectState.project;
      },
      set: function(project) {
        this.$store.commit("project/setProject", project);
        this.$store.commit("datacard/setProject", project);
      }
    },
    selectedCollector: {
      get: function() {
        let collector = this.collectorState.collector;
        if (
          !collector.isValid() ||
          collector.getErrorMessage() == "temporary error"
        ) {
          this.addShakeEffect("collector_select");
        }
        return collector.getName();
      },
      set: function(collector) {
        this.$store.dispatch("collector/setCollector", collector);
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
        this.$store.dispatch("device/setDevice", newValue);
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
        this.$store.dispatch("device/setModel", newValue);
      }
    },
    selectedDate: {
      get: function() {
        // if (this.datacardState.datacard.getCollectDate() == null) {
        // this.$store.dispatch("datacard/setCollectDate", new Date());
        // }
        return this.datacardState.datacard.getCollectDate();
      },
      set: function(newValue) {
        this.$store.dispatch("datacard/setCollectDate", newValue);
      }
    },
    selectedHour: {
      get: function() {
        return this.datacardState.datacard.getCollectDate();
      },
      set: function(newValue) {
        this.$store.dispatch("datacard/setCollectDate", newValue);
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
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";

#generalDataForm_content {
  display: grid;
  height: 340px;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 25% 25% 25% 25%;
  grid-gap: 5px;
  justify-items: start;
}

#colection_select_field {
  grid-row: 1 / 2;
  grid-column: 1 / 3;
}

#colection_select {
  width: 400px;
}

#catalogue_select_field {
  grid-row: 1 / 2;
  grid-column: 4 / 5;
}

#project_select_field {
  grid-row: 2 / 3;
  grid-column: 1 / 3;
}

#collector_select_field {
  grid-row: 2 / 3;
  grid-column: 4 / 6;
  display: flex;
  flex-direction: column;
}

#device_helper {
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  justify-self: end;
}

#device_select_field {
  grid-row: 3 / 4;
  grid-column: 2 / 3;
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
}

#collectHour_helper {
  grid-row: 4 / 5;
  grid-column: 3 / 4;
  justify-self: end;
}

#collect-hour-select {
  grid-row: 4 / 5;
  grid-column: 4 / 5;
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
</style>