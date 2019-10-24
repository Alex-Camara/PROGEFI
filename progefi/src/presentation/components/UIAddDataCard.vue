<template>
  <!-- --------AddDataCard Component----- -->
  <div id="addDataCard-component">
    <!-- --------AddDataCard Component Header----- -->
    <div id="addDataCard-component-header">
      <div id="addDataCard-return-button">
        <b-button type="is-text" v-on:click="showDataCards">
          <b-icon icon="arrow-left-thick"></b-icon>
        </b-button>
      </div>

      <div id="addDataCard-component-title">
        <!--<nav class="breadcrumb has-bullet-separator is-medium">
          <ul>
            <li>
              <b-button rounded class="is-primary" v-on:click="showDataCards">Fichas de fotocolecta</b-button>
            </li>
            <li>
              <b-button rounded class="is-secondary">Agregar ficha</b-button>
            </li>
          </ul>
        </nav>-->
        <p class="is-size-4">Agregar ficha</p>
      </div>
    </div>

    <!-- --------AddDataCard Component Content----- -->
    <div id="addDataCard-component-content">
      <div>
        <b-steps
          size="is-small"
          type="is-secondary"
          :has-navigation="false"
          v-model="activeStep"
        >
          <b-step-item label="Subir fotografía" icon="image" :clickable="false">
            <UIUploadImage></UIUploadImage>
          </b-step-item>
          <b-step-item label="Datos generales" icon="file-document-edit" :clickable="false">
            <UIGeneralData></UIGeneralData>
          </b-step-item>
          <b-step-item label="Datos geográficos" icon="earth" :clickable="false">
            <UIGeographicalData></UIGeographicalData>
            </b-step-item>
          <b-step-item label="Datos taxonómicos" :clickable="false">
            <UITaxonomicalData></UITaxonomicalData>
          </b-step-item>
          <b-step-item label="Validación" :clickable="false">
            <UIValidateData></UIValidateData>
          </b-step-item>
        </b-steps>
      </div>
    </div>
  </div>
</template>

<script>
import UIUploadImage from "./UIAddDataCard/UIUploadImage.vue";
import UIGeneralData from "./UIAddDataCard/UIGeneralData.vue";
import UIGeographicalData from "./UIAddDataCard/UIGeographicalData.vue";
import UITaxonomicalData from "./UIAddDataCard/UITaxonomicalData.vue";
import UIValidateData from "./UIAddDataCard/UIValidateData.vue";
import { mapState } from "vuex";
import store from "../store/store.js";
import router from "../router/router.js";

export default {
  name: "UIAddDataCard",
  components: {
    UIUploadImage,
    UIGeneralData,
    UIGeographicalData,
    UITaxonomicalData,
    UIValidateData
  },
  data() {
    return {};
  },
  created() {
    store.dispatch("datacard/resetPhotoCollect")
  },
  methods: {
    showDataCards() {
      router.push({ name: "UIShowDataCards" });
    }
  },
  computed: {
    ...mapState("datacard", {
      activeStep: state => state.activeStep
    })
  }
};
</script>

<style lang="scss">
#addDataCard-component {
  display: grid;
  grid-template-rows: 50px 400px;
  height: 100%;
}

#addDataCard-component-header {
  grid-row: 1 / 2;
  display: grid;
  grid-template-columns: 5% 95%;
  justify-items: center;
  align-content: center;
}

#addDataCard-component-content {
  grid-row: 2 / 3;
  margin-top: 40px;
}

#addDataCard-return-button {
  grid-column: 1 / 2;
}

#addDataCard-component-title {
  grid-column: 2 / 3;
}
</style> 