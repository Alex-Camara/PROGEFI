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
        <b-dropdown aria-role="list">
          <button class="button is-secondary" slot="trigger">
            <span>Colección</span>
            <b-icon icon="menu-down"></b-icon>
          </button>
        </b-dropdown>
      </b-field>

      <!-- ------- catalogue select ----- -->
      <b-field id="catalogue-select" custom-class="is-small is-centered" label="Catálogo:">
        <b-dropdown aria-role="list">
          <button class="button is-secondary" slot="trigger">
            <span>Catálogo</span>
            <b-icon icon="menu-down"></b-icon>
          </button>
        </b-dropdown>
      </b-field>

      <!-- ------- proyect select ----- -->
      <b-field id="project-select" custom-class="is-small is-centered" label="Proyecto:">
        <b-dropdown aria-role="list">
          <button class="button is-secondary" slot="trigger">
            <span>Proyecto</span>
            <b-icon icon="menu-down"></b-icon>
          </button>
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
        <b-dropdown aria-role="list">
          <button class="button is-secondary" slot="trigger">
            <span>Dispositivo</span>
            <b-icon icon="menu-down"></b-icon>
          </button>
        </b-dropdown>
      </b-field>

      <!-- ------- model select ----- -->
      <b-field id="model-select" custom-class="is-small is-centered" label="Modelo:">
        <b-dropdown aria-role="list">
          <button class="button is-secondary" slot="trigger">
            <span>Modelo</span>
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
        <b-datepicker rounded placeholder="Elige una fecha..." icon="calendar-today"></b-datepicker>
      </b-field>

      <!-- ------- collect hour select ----- -->
      <b-field
        id="collect-hour-select"
        custom-class="is-small is-centered"
        label="Hora de colecta:"
      >
        <b-timepicker rounded placeholder="Elige una hora..." icon="clock"></b-timepicker>
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
    return {};
  },
  computed: {
    ...mapState("datacard", {
      photoCollect: state => state.photoCollect
    })
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

#separator{
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

hr.style1{
	border-top: 1px solid #8c8b8b;
}
</style>