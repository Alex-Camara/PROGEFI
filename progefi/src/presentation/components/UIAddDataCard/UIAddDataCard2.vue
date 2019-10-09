<template>
  <!-- --------AddDataCard2 Component----- -->

  <!-- --------AddDataCard2 Right Side----- -->
  <div id="addDataCard2-right-side" class="box">
    <!-- --------AddDataCard2 right Side Component Header----- -->
    <div id="addDataCard2-right-side-component-header">
      <p class="subtitle is-5">Datos generales</p>
    </div>

    <div>
      <br />
      <hr class="separator" />
    </div>

    <!-- --------AddDataCard2 Right Side Component Content----- -->
    <div id="addDataCard2-right-side-component-content">
      <!-- ------- colection select ----- -->
      <b-field id="colection-select" custom-class="is-small is-centered" label="Colección:">
        <b-dropdown aria-role="list" v-model="selectedCollection">
          <button class="button is-secondary" slot="trigger">
            <p>{{ selectedCollection }}</p>
            <b-icon icon="menu-down"></b-icon>
          </button>
          <b-dropdown-item
            aria-role="listitem"
            v-for="collection in collections"
            :key="collection.name"
            :value="collection.name"
          >{{ collection.name }}</b-dropdown-item>
        </b-dropdown>
      </b-field>

      <!-- ------- catalogue select ----- -->
      <b-field id="catalogue-select" custom-class="is-small is-centered" label="Catálogo:">
        <b-dropdown aria-role="list" v-model="selectedCatalogue">
          <button class="button is-secondary" slot="trigger">
            <p>{{ selectedCatalogue }}</p>
            <b-icon icon="menu-down"></b-icon>
          </button>
          <b-dropdown-item
            aria-role="listitem"
            v-for="catalogue in catalogues"
            :key="catalogue.name"
            :value="catalogue.name"
          >{{ catalogue.name }}</b-dropdown-item>
        </b-dropdown>
      </b-field>

      <!-- ------- proyect select ----- -->
      <b-field id="project-select" custom-class="is-small is-centered" label="Proyecto:">
        <b-dropdown aria-role="list" v-model="selectedProject">
          <button class="button is-secondary" slot="trigger">
            <p>{{ selectedProject }}</p>
            <b-icon icon="menu-down"></b-icon>
          </button>
          <b-dropdown-item
            aria-role="listitem"
            v-for="project in projects"
            :key="project.name"
            :value="project.name"
          >{{ project.name }}</b-dropdown-item>
        </b-dropdown>
      </b-field>

      <!-- ------- colector select ----- -->
      <b-field id="colector-select" custom-class="is-small is-centered" label="Colector:">
        <b-dropdown aria-role="list">
          <button class="button is-secondary" slot="trigger">
            <span>Colector</span>
            <b-icon icon="menu-down"></b-icon>
          </button>
        </b-dropdown>
      </b-field>

      <!-- ------- device select ----- -->
      <b-field id="device-select" custom-class="is-small is-centered" label="Dispositivo:">
        <b-dropdown aria-role="list" v-model="selectedDevice">
          <button class="button is-secondary" slot="trigger">
            <p>{{ selectedDevice }}</p>
            <b-icon icon="menu-down"></b-icon>
          </button>
        </b-dropdown>
      </b-field>

      <!-- ------- model select ----- -->
      <b-field id="model-select" custom-class="is-small is-centered" label="Modelo:">
        <b-dropdown aria-role="list" v-model="selectedModel">
          <button class="button is-secondary" slot="trigger">
            <p>{{ selectedModel }}</p>
            <b-icon icon="menu-down"></b-icon>
          </button>
        </b-dropdown>
      </b-field>

      <!-- ------- collect date select ----- -->
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
          hour-format=24
        ></b-timepicker>
      </b-field>
    </div>

    <!-- --------AddDataCard2 Bottom Buttons----- -->
    <div id="addDataCard2-bottom-buttons">
      <b-button type="is-light" v-on:click="backwardStep()">Anterior</b-button>
      <b-button type="is-accent" v-on:click="forwardStep()">Siguiente</b-button>
    </div>
  </div>
</template>

<script>
import store from "../../store/store.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      selectedCollection: "Selecciona una colección",
      selectedCatalogue: "Selecciona un catálogo",
      selectedProject: "Selecciona un proyecto"
    };
  },
  created() {
    store.dispatch("collection/getCollections");
    store.dispatch("catalogue/getCatalogues");
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
    selectedDevice: function() {
      if (this.datacard.device == null) {
        return "Selecciona un dispositivo";
      } else {
        return this.datacard.device;
      }
    },
    selectedModel: function() {
      if (this.datacard.model == null) {
        return "Selecciona un modelo";
      } else {
        return this.datacard.model;
      }
    },
    selectedDate: function() {
      if (this.datacard.collectDate == null) {
        return new Date();
      } else {
        var formatDate = Date.parse(this.datacard.collectDate, "dd-mm-yyyy");
        var date = new Date(formatDate);
        return date;
      }
    },
    selectedHour: function() {
      if (this.datacard.collectHour == null) {
        console.log('la fecha establecida esta vacia: '+this.datacard.hourDate )
        console.log('la fecha establecida esta vacia' )
        return new Date();
      } else {
        var formatDate = Date.parse(this.datacard.collectHour, "HH-mm");
        var date = new Date(formatDate);
        /*var date = new Date()
        date.setHours(17)
        date.setMinutes(14)*/
        console.log('la fecha establecida es: ' + date)
        return date;
      }
    } /*,
    selectedProject: function () { 
      if (this.projects == null) {
        return "Selecciona un proyecto";
      } else {
        return this.projects[0].name;
      }
    }*/
  },
  methods: {
    backwardStep() {
      store.commit("datacard/changeActiveStep", 0);
    },
    forwardStep() {
      store.commit("datacard/changeActiveStep", 1);
    }
  }
};
</script>

<style lang="scss">
#addDataCard2-right-side {
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

#addDataCard2-right-side-component-header {
  grid-row: 1 / 2;
  justify-self: center;
}

#addDataCard2-bottom-buttons {
  grid-row: 4 / 5;
  justify-self: end;
}

#addDataCard2-right-side-component-content {
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

#device-select {
  grid-row: 3 / 4;
  grid-column: 2 / 3;
}

#model-select {
  grid-row: 3 / 4;
  grid-column: 4 / 5;
}

#collect-date-select {
  grid-row: 4 / 5;
  grid-column: 2 / 3;
}

#collect-hour-select {
  grid-row: 4 / 5;
  grid-column: 4 / 5;
}

hr.style1 {
  border-top: 1px solid #8c8b8b;
}
</style>