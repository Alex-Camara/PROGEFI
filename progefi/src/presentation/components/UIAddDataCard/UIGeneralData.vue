<template>
  <!-- --------GeneralData Component----- -->

  <!-- --------GeneralData Title----- -->
  <div id="generalData_component" class="box">
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
      <b-field id="colection-select" custom-class="is-small is-centered" label="Colección:">
        <b-select placeholder="Selecciona una colección" v-model="selectedCollection">
          <option
            v-for="collection in collectionState.collections"
            :key="collection.name"
            :value="collection"
          >{{ collection.name }}</option>
        </b-select>
      </b-field>

      <!-- ------- catalogue select ----- -->
      <b-field id="catalogue-select" custom-class="is-small is-centered" label="Catálogo:">
        <b-select placeholder="Selecciona un catálogo" v-model="selectedCatalogue">
          <option
            v-for="catalogue in catalogueState.catalogues"
            :key="catalogue.name"
            :value="catalogue"
          >{{ catalogue.name }}</option>
        </b-select>
      </b-field>

      <!-- ------- proyect select ----- -->
      <b-field id="project-select" custom-class="is-small is-centered" label="Proyecto:">
        <b-select placeholder="Selecciona un proyecto" v-model="selectedProject">
          <option
            v-for="project in projectState.projects"
            :key="project.name"
            :value="project"
          >{{ project.name }}</option>
        </b-select>
      </b-field>

      <!-- ------- collector select ----- -->
      <b-field id="collector-select" custom-class="is-small is-centered" label="Colector:">
        <b-autocomplete
          :expanded="true"
          placeholder="Selecciona un collector"
          v-model="selectedCollector"
          :open-on-focus="true"
          :data="collectorsName"
        ></b-autocomplete>
      </b-field>

      <!-- ------- device select ----- -->
      <metadata-helper
        id="device_helper"
        v-bind:selectedValue="selectedDevice"
        v-bind:attribute="'device'"
        v-if="metadataState.device"
      ></metadata-helper>

      <b-field id="device-select" custom-class="is-small is-centered" label="Dispositivo:">
        <b-autocomplete
          placeholder="Selecciona un dispositivo"
          v-model="selectedDevice"
          :open-on-focus="true"
          :data="getDevicesName()"
          @select="option => getModels(option)"
        ></b-autocomplete>
      </b-field>

      <!-- ------- model select ----- -->
      <metadata-helper
        id="model_helper"
        v-bind:selectedValue="selectedModel"
        v-bind:attribute="'model'"
        v-if="metadataState.model"
      ></metadata-helper>

      <b-field id="model-select" custom-class="is-small is-centered" label="Modelo:">
        <b-autocomplete
          placeholder="Selecciona un modelo"
          v-model="selectedModel"
          :open-on-focus="true"
          :data="getModelsName()"
        ></b-autocomplete>
      </b-field>

      <!-- ------- collect date select ----- -->
      <metadata-helper
        id="collectDate_helper"
        v-bind:selectedValue="datacard.formattedDate"
        v-bind:attribute="'formattedDate'"
        v-if="metadataState.collectDate"
      ></metadata-helper>

      <b-field
        id="collect-date-select"
        custom-class="is-small is-centered"
        label="Fecha de colecta:"
      >
        <b-datepicker
          v-model="selectedDate"
          rounded
          placeholder="Elige una fecha..."
          icon="calendar-today"
        ></b-datepicker>
      </b-field>

      <!-- ------- collect hour select ----- -->
      <metadata-helper
        id="collectHour_helper"
        v-bind:selectedValue="datacard.formattedHour"
        v-bind:attribute="'formattedHour'"
        v-if="metadataState.collectHour"
      ></metadata-helper>

      <b-field
        id="collect-hour-select"
        custom-class="is-small is-centered"
        label="Hora de colecta:"
      >
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
      <b-button type="is-accent" v-on:click="forwardStep()">Siguiente</b-button>
    </div>
  </div>
</template>

<script>
import store from "../../store/store.js";
import { mapState, mapGetters } from "vuex";
import styleColors from "../../style/style.scss";

import metadataHelper from "../../helpers/metadataHelper.vue";
import templateHelper from "../../helpers/templateHelper.vue";

export default {
  name: "UIGeneralData",
  components: {
    "metadata-helper": metadataHelper,
    "template-helper": templateHelper
  },
  data() {
    return {
      photoCollectHasChanged: false
    };
  },
  mounted() {
    store.dispatch("collection/getCollections");
    store.dispatch("project/getProjects");
    store.dispatch("device/getDevices");
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
      collectorState: state => state
    }),
    ...mapState("device", {
      deviceState: state => state
    }),
    hasMetadata: function() {
      return this.metadataState.hasMetadata;
    },
    ...mapGetters("collector", ["collectorsName"]),
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
        return this.collectorState.collector.name;
      },
      set: function(newValue) {
        let collector = this.collectorState.collectors.find(
          x => x.name == newValue
        );
        if (collector) {
          store.dispatch("collector/getCollectors", collector);
        } else {
          store.dispatch("collector/getCollectors", newValue);
        }
      }
    },
    selectedDevice: {
      get: function() {
        return this.deviceState.device.name;
      },
      set: function(newValue) {
        newValue = { id: null, name: newValue };
        let device = this.deviceState.devices.find(
          x => x.name == newValue.name
        );
        if (device) {
          console.log("entró" + newValue);
          store.commit("device/setDevice", device);
        } else {
          console.log("no entró" + newValue);
          store.commit("device/setDevice", newValue);
        }
      }
    },
    selectedModel: {
      get: function() {
        return this.deviceState.model.name;
      },
      set: function(newValue) {
        newValue = { id: null, name: newValue };
        let model = this.deviceState.models.find(x => x.name == newValue);
        if (model) {
          store.commit("device/setModel", model);
        } else {
          store.commit("device/setModel", newValue);
        }
      }
    },
    selectedDate: {
      get: function() {
        if (this.datacard.collectDate == null) {
          store.commit("datacard/setCollectDate", new Date());
        }
        return this.datacard.collectDate;
      },
      set: function(newValue) {
        store.commit("datacard/setCollectDate", newValue);
      }
    },
    selectedHour: {
      get: function() {
        return this.datacard.collectDate;
      },
      set: function(newValue) {
        store.commit("datacard/setCollectHour", newValue);
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
    getFormattedDate(date) {
      var moment = require("moment");
      return moment(date).format("YYYY MM DD");
    },
    getFormattedHour(date) {
      var formatDate = Date.parse(date, "HH-mm");
      return new Date(formatDate);
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
      if (selectedDevice == null) {
        selectedDevice = this.selectedDevice;
      }
      var selectedDevice = this.deviceState.devices.find(
        x => x.name == selectedDevice
      );
      store.dispatch("device/getModels", selectedDevice.id);
    }
  }
};
</script>

<style lang="scss">
@import "../../style/style.scss";
#generalData_component {
  display: grid;
  grid-template-rows: 50px 10px 550px 630px 80px;
  height: 1260px;
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
  //height: 400px;
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

#collector-select {
  grid-row: 2 / 3;
  grid-column: 4 / 6;
  //max-width: 500px;
}

#device_helper {
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  justify-self: end;
}

#device-select {
  grid-row: 3 / 4;
  grid-column: 2 / 3;
  //max-width: 250px;
}

#model_helper {
  grid-row: 3 / 4;
  grid-column: 3 / 4;
  justify-self: end;
}

#model-select {
  grid-row: 3 / 4;
  grid-column: 4 / 5;
  //max-width: 250px;
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

/*hr.style1 {
  border-top: 1px solid #8c8b8b;
}*/
</style>