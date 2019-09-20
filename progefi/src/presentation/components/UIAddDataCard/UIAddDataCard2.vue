<template>
  <!-- --------AddDataCard2 Component----- -->
  <div id="addDataCard2-component">
    <!-- --------AddDataCard2 Left Side----- -->
    <div id="addDataCard2-left-side" class="box has-background-secondary">
      <!-- --------addDataCard2-component-image----- -->
      <div id="addDataCard2-component-image">
        <img id="uploadedImage" :src="photoCollect.url" />
      </div>
    </div>

    <!-- --------AddDataCard2 Right Side----- -->
    <div id="addDataCard2-right-side" class="box has-background-light">
      <!-- --------AddDataCard2 right Side Component Header----- -->
      <div id="addDataCard2-right-side-component-header">
        <p class="subtitle is-5">Datos generales</p>
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
        <b-field id="collect-date-select" custom-class="is-small is-centered" label="Fecha de colecta:">
          <b-datepicker
                placeholder="Elige una fecha..."
                icon="calendar-today">
            </b-datepicker>
        </b-field>

        <!-- ------- collect hour select ----- -->
        <b-field id="collect-hour-select" custom-class="is-small is-centered" label="Hora de colecta:">
          <b-timepicker
                rounded
                placeholder="Elige una hora..."
                icon="clock">
            </b-timepicker>
        </b-field>

      </div>

      <!-- --------AddDataCard2 Bottom Buttons----- -->
      <div id="addDataCard2-bottom-buttons">
        <b-button type="is-light" v-on:click="backwardStep()">Anterior</b-button>
        <b-button type="is-accent" v-on:click="forwardStep()">Siguiente</b-button>
      </div>
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
#addDataCard2-component {
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100%;
  width: 100%;
  align-items: start;
  margin-top: 10px;
}

#addDataCard2-left-side {
  grid-column: 1 / 2;
  //height: 100%;
  align-items: center;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

#addDataCard2-right-side {
  grid-column: 2 / 3;
  display: grid;
  grid-template-rows: 5% 90% 5%;
  //height: 100%;
  align-items: center;
  margin-left: 10px;
}

#addDataCard2-right-side-component-header {
  grid-row: 1 / 2;
  justify-self: center;
}

#content-image {
  grid-column: 2 / 3;
  justify-self: end;
}

#addDataCard2-bottom-buttons {
  grid-row: 3 / 4;
  justify-self: end;
}

#addDataCard2-right-side-component-content {
  grid-row: 2 / 3;
  display: grid;
  height: 400px;
  grid-template-columns: 16.6% 16.6% 16.6% 16.6% 16.6% 16.6%;
  grid-template-rows: 25% 25% 25% 25%;
  grid-gap: 5px;
  justify-items: center;
  margin-bottom: 20px;
}

#colection-select {
  grid-row: 1 / 2;
  grid-column: 1 / 4;
}

#catalogue-select {
  grid-row: 1 / 2;
  grid-column: 4 / 7;
}

#project-select {
  grid-row: 2 / 3;
  grid-column: 1 / 4;
}

#colector-select {
  grid-row: 2 / 3;
  grid-column: 4 / 7;
}

#device-select {
  grid-row: 3 / 4;
  grid-column: 1 / 4;
}

#model-select{
  grid-row: 3 / 4;
  grid-column: 4 / 7;
}

#collect-date-select{
  grid-row: 4 / 5;
  grid-column: 1 / 4;
}

#collect-hour-select{
  grid-row: 4 / 5;
  grid-column: 4 / 7;
}
</style>