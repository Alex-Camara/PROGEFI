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

    <!-- --------AddDataCard2 Right Side Component Content----- -->
    <div id="generalData_component_content">
      <!-- ------- colection select ----- -->
      <b-field id="colection-select" custom-class="is-small is-centered" label="Colección:">
        <b-select placeholder="Selecciona una colección" v-model="selectedCollection">
          <option
            v-for="collection in collections"
            :key="collection.name"
            :value="collection.id"
          >{{ collection.name }}</option>
        </b-select>
      </b-field>

      <!-- ------- catalogue select ----- -->
      <b-field id="catalogue-select" custom-class="is-small is-centered" label="Catálogo:">
        <b-select placeholder="Selecciona un catálogo" v-model="selectedCatalogue">
          <option
            v-for="catalogue in catalogues"
            :key="catalogue.name"
            :value="catalogue.name"
          >{{ catalogue.name }}</option>
        </b-select>
      </b-field>

      <!-- ------- proyect select ----- -->
      <b-field id="project-select" custom-class="is-small is-centered" label="Proyecto:">
        <b-select placeholder="Selecciona un proyecto" v-model="selectedProject">
          <option
            v-for="project in projects"
            :key="project.name"
            :value="project.name"
          >{{ project.name }}</option>
        </b-select>
      </b-field>

      <!-- ------- colector select ----- -->
      <b-field id="colector-select" custom-class="is-small is-centered" label="Colector:">
        <b-select placeholder="selecciona un colector"></b-select>
      </b-field>

      <!-- ------- device select ----- -->
      <metadata-helper
        id="device_helper"
        v-bind:selectedValue="selectedDevice"
        v-bind:originalValue="metadataValues.device"
        v-bind:attribute="'device'"
        v-if="hasMetadata"
      ></metadata-helper>

      <b-field id="device-select" custom-class="is-small is-centered" label="Dispositivo:">
        <b-input type="text" v-model="selectedDevice" placeholder="selecciona un dispositivo"></b-input>
      </b-field>

      <!-- ------- model select ----- -->
      <metadata-helper
        id="model_helper"
        v-bind:selectedValue="selectedModel"
        v-bind:originalValue="metadataValues.model"
        v-bind:attribute="'model'"
        v-if="hasMetadata"
      ></metadata-helper>

      <b-field id="model-select" custom-class="is-small is-centered" label="Modelo:">
        <b-input type="text" v-model="selectedModel" placeholder="selecciona un modelo"></b-input>
      </b-field>

      <!-- ------- collect date select ----- -->
      <metadata-helper
        id="collectDate_helper"
        v-bind:selectedValue="getFormattedDate(selectedDate)"
        v-bind:originalValue="getFormattedDate(metadataValues.collectDate)"
        v-bind:attribute="'collectDate'"
        v-if="hasMetadata"
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
        v-bind:selectedValue="getFormattedHour(selectedHour)"
        v-bind:originalValue="getFormattedHour(metadataValues.collectHour)"
        v-bind:attribute="'collectHour'"
        v-if="hasMetadata"
      ></metadata-helper>

      <b-field
        id="collect-hour-select"
        custom-class="is-small is-centered"
        label="Hora de colecta:"
      >
        <b-timepicker
          v-model="selectedHour"
          rounded
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
import { mapState } from "vuex";
import styleColors from "../../style/style.scss";

import metadataHelper from "./metadataHelper.vue";

export default {
  name: "UIGeneralData",
  components: {
    "metadata-helper": metadataHelper
  },
  data() {
    return {
      photoCollectHasChanged: false,
      selectedCollection: null,
      selectedCatalogue: null,
      selectedProject: null,
      metadataValues: {
        device: "Apple",
        model: "iPhone",
        collectDate: "30/01/17",
        collectHour: "03:43"
      }
    };
  },
  created() {
    store.dispatch("collection/getCollections");
    store.dispatch("project/getProjects");
  },
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard
    }),
    ...mapState("datacard", {
      photoCollect: state => state.photoCollect
    }),
    ...mapState("catalogue", {
      catalogues: state => state.catalogues
    }),
    ...mapState("collection", {
      collections: state => state.collections
    }),
    ...mapState("project", {
      projects: state => state.projects
    }),
    hasMetadata: function() {
      return this.photoCollect.hasMetadata;
    },
    selectedDevice: {
      get: function() {
        return this.datacard.device;
      },
      set: function(newValue) {
        this.datacard.device = newValue;
      }
    },
    selectedModel: {
      get: function() {
        return this.datacard.model;
      },
      set: function(newValue) {
        this.datacard.model = newValue;
      }
    },
    selectedDate: {
      get: function() {
        if (this.datacard.collectDate == null) {
          return new Date();
        } else {
          var formatDate = Date.parse(this.datacard.collectDate, "dd-mm-yyyy");
          var date = new Date(formatDate);
          return date;
        }
      },
      set: function(newValue) {
        this.datacard.collectDate = newValue;
      }
    },
    selectedHour: {
      get: function() {
        if (this.datacard.collectHour == null) {
          return new Date();
        } else {
          return this.getFormattedHour(this.datacard.collectHour);
        }
      },
      set: function(newValue) {
        this.datacard.collectHour = newValue;
      }
    }
  },
  watch: {
    //cuando se seleccione una colección, se recuperarán los catálogos de dicha colección
    selectedCollection(newValue, oldValue) {
      if (newValue != null) {
        store.dispatch("catalogue/getCatalogues", newValue);
      }
    },
    hasMetadata(newValue, oldValue) {
      if (!newValue) {
        this.openSnackBar("¡Esta fotocolecta no contiene metadatos!");
      } else {
        this.metadataValues = {
          device: this.datacard.device,
          model: this.datacard.model,
          collectDate: this.datacard.collectDate,
          collectHour: this.datacard.collectHour
        };
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
      store.dispatch("datacard/getImageMetadata");
    }
  }
};
</script>

<style lang="scss">
@import "../../style/style.scss";
#generalData_component {
  display: grid;
  grid-template-rows: 4% 1% 90% 5%;
  height: 100%;
  width: 100%;
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

#generalData_component_bottomButtons {
  grid-row: 4 / 5;
  justify-self: end;
}

#generalData_component_content {
  grid-row: 3 / 4;
  display: grid;
  height: 400px;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 25% 25% 25% 25%;
  grid-gap: 5px;
  justify-items: start;
  margin-top: 20px;
  margin-bottom: 20px;
}

#colection-select {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}

#catalogue-select {
  grid-row: 1 / 2;
  grid-column: 4 / 5;
}

#project-select {
  grid-row: 2 / 3;
  grid-column: 2 / 3;
}

#colector-select {
  grid-row: 2 / 3;
  grid-column: 4 / 5;
  width: 400px;
}

#device_helper {
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  justify-self: end;
}

#device-select {
  grid-row: 3 / 4;
  grid-column: 2 / 3;
}

#model_helper {
  grid-row: 3 / 4;
  grid-column: 3 / 4;
  justify-self: end;
}

#model-select {
  grid-row: 3 / 4;
  grid-column: 4 / 5;
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

hr.style1 {
  border-top: 1px solid #8c8b8b;
}
</style>