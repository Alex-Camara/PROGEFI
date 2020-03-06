<template>
  <!-- --------AddDataCard Component----- -->
  <div id="create_datacard_component">
    <!-- --------AddDataCard Component Header----- -->
    <div id="create_datacard_component_header">
      <!-- <div id="create_datacard_return_button"> -->
      <!-- <button id="add_datacard_return_button" class="button is-accent" @click="showDatacards()"> -->
      <!-- <img id="add_datacard_return_icon" :src="require('../assets/back.png')" /> -->
      <!-- Regresar -->
      <!-- </button> -->
      <!-- </div> -->

      <div id="create_datacard_component_title">
        <p class="is-size-4">{{title}}</p>
      </div>
    </div>

    <!-- --------AddDataCard Component Content----- -->
    <div id="create_datacard_component_content">
      <div>
        <b-steps size="is-small" type="is-secondary" :has-navigation="false" v-model="activeStep">
          <b-step-item label="Subir fotografía" :clickable="true">
            <UIUploadImage></UIUploadImage>
          </b-step-item>
          <b-step-item label="Datos generales" :clickable="true">
            <UIGeneralData :catalogue="catalogue" :disableFields="disableGeneralDataFields"></UIGeneralData>
          </b-step-item>
          <b-step-item label="Datos geográficos" :clickable="true">
            <UIGeographicalData></UIGeographicalData>
          </b-step-item>
          <b-step-item label="Datos taxonómicos" :clickable="true">
            <UITaxonomicalData></UITaxonomicalData>
          </b-step-item>
          <b-step-item label="Validación" :clickable="true">
            <UIValidateData></UIValidateData>
          </b-step-item>
        </b-steps>
      </div>
    </div>
  </div>
</template>

<script>
import UIUploadImage from "./UICreateDataCard/UIUploadImage.vue";
import UIGeneralData from "./UICreateDataCard/UIGeneralData.vue";
import UIGeographicalData from "./UICreateDataCard/UIGeographicalData.vue";
import UITaxonomicalData from "./UICreateDataCard/UITaxonomicalData.vue";
import UIValidateData from "./UICreateDataCard/UIValidateData.vue";
import { mapState } from "vuex";
import store from "../store/store.js";
import router from "../router/router.js";

export default {
  name: "UICreateDataCard",
  props: ["datacardDraft", "catalogue"],
  components: {
    UIUploadImage,
    UIGeneralData,
    UIGeographicalData,
    UITaxonomicalData,
    UIValidateData
  },
  data() {
    return {
      disableGeneralDataFields: false
    };
  },
  created() {
    store.dispatch("addDatacard/resetAddDatacard");
    store.commit("metadata/resetMetadata");
    window.addEventListener("online", () => {
      this.showNotification("Hay conexión a Internet", "is-primary");
    });
    window.addEventListener("offline", () => {
      this.showNotification("No hay conexión a Internet", "is-warning");
    });
  },
  mounted() {
    console.info(this.catalogue);
    this.showInternetStatus();
    if (this.datacardDraft) {
      this.setDatacard(this.datacardDraft);
    } else if (this.catalogue) {
      // this.setCatalogue(this.catalogue);
    }
  },
  beforeDestroy() {
    this.resetStore(this.datacard);
  },
  beforeRouteLeave(to, from, next) {
    // Si la ruta destino tiene el parametro 'askToLeave',
    // esta especificando si se quiere preguntar antes de abandonar la ruta actual
    if (to.params.askToLeave || to.params.askToLeave == undefined) {
      this.showDialog().then(answer => {
        if (answer) {
          next();
        } else {
          next(false);
        }
      });
    } else {
      next();
    }
  },
  computed: {
    title: function() {
      if (!this.datacardDraft) {
        return "Agregar ficha";
      } else {
        return "Continuar borrador de ficha";
      }
    },
    ...mapState("addDatacard", {
      addDatacardState: state => state
    }),
    activeStep: {
      get: function() {
        return this.addDatacardState.activeStep;
      },
      set: function(newValue) {
        store.commit("addDatacard/setActiveStep", newValue);
        return newValue;
      }
    }
  },
  methods: {
    setCatalogue(catalogue) {
      this.$store.dispatch(
        "collection/setCollection",
        catalogue.getCollection()
      );
      this.$store.dispatch(
        "catalogue/getCatalogues",
        catalogue.getCollection().getId()
      );
      this.$store.dispatch("catalogue/setCatalogue", catalogue);
      // debugger;
    },
    // Sí se va a continuar un borrador de ficha, se cargan sus datos
    async setDatacard(datacardDraft) {
      this.disableGeneralDataFields = true;
      this.$store.commit("datacard/setDatacard", datacardDraft);
      let photocollectPath = datacardDraft.getDatacardPath() + "/original.png";
      await this.$store.dispatch(
        "addDatacard/setPhotocollectFilePath",
        photocollectPath
      );
      this.$store.dispatch(
        "catalogue/getCatalogues",
        datacardDraft
          .getCatalogue()
          .getCollection()
          .getId()
      );
      this.$store.dispatch(
        "catalogue/setCatalogue",
        datacardDraft.getCatalogue()
      );
      this.$store.dispatch(
        "collection/setCollection",
        datacardDraft.getCatalogue().getCollection()
      );
      this.$store.dispatch(
        "datacard/setCollectDate",
        datacardDraft.getCollectDate()
      );
      this.$store.dispatch("project/setProject", datacardDraft.getProject());
      this.$store.dispatch(
        "collector/setCollector",
        datacardDraft.getCollector()
      );
      this.$store.dispatch("device/setModel", datacardDraft.getModel());
      this.$store.dispatch(
        "device/setDevice",
        datacardDraft.getModel().getDevice()
      );

      this.$store.dispatch(
        "coordinate/setAltitude",
        datacardDraft.getAltitude()
      );
      this.$store.dispatch(
        "coordinate/setLatitude",
        datacardDraft.getLatitude()
      );
      this.$store.dispatch(
        "coordinate/setLongitude",
        datacardDraft.getLongitude()
      );
      this.$store.dispatch("location/setCountry", datacardDraft.getCountry());
      this.$store.dispatch(
        "location/setCountryState",
        datacardDraft.getCountryState()
      );
      this.$store.dispatch(
        "location/setMunicipality",
        datacardDraft.getMunicipality()
      );
      this.$store.dispatch("location/setLocality", datacardDraft.getLocality());
      this.$store.dispatch(
        "climateType/setClimateType",
        datacardDraft.getClimateType()
      );
      this.$store.dispatch(
        "vegetationType/setVegetationType",
        datacardDraft.getVegetationType()
      );

      this.$store.dispatch(
        "speciesData/setScientificName",
        datacardDraft.getScientificName()
      );
      this.$store.dispatch("speciesData/setGenus", datacardDraft.getGenus());
      this.$store.dispatch(
        "speciesData/setCommonName",
        datacardDraft.getCommonName()
      );
      this.$store.dispatch("speciesData/setOrder", datacardDraft.getOrder());
      this.$store.dispatch("speciesData/setFamily", datacardDraft.getFamily());
      this.$store.dispatch(
        "speciesData/setSpeciesClass",
        datacardDraft.getSpeciesClass()
      );
      this.$store.dispatch("speciesData/setPhylum", datacardDraft.getPhylum());
      this.$store.dispatch(
        "speciesData/setKingdom",
        datacardDraft.getKingdom()
      );
      this.$store.dispatch("speciesData/setSex", datacardDraft.getSex());
      this.$store.dispatch(
        "speciesData/setLifeStage",
        datacardDraft.getLifeStage()
      );
    },
    resetStore() {
      store.dispatch("resetStore");
    },
    showDatacards() {
      router.push({ name: "UIShowDataCards" });
    },
    showInternetStatus() {
      if (!navigator.onLine) {
        this.showNotification("No hay conexión a Internet", "is-warning");
      }
    },
    showNotification(message, type) {
      this.$buefy.notification.open({
        duration: 5000,
        message: message,
        position: "is-top-right",
        type: type,
        hasIcon: true
      });
    },
    showDialog() {
      return new Promise((resolve, reject) => {
        let f = this.$buefy.dialog.confirm({
          message: "¿Deseas salir de esta ventana? Tu trabajo no se guardará",
          confirmText: "Cancelar",
          cancelText: "Salir",
          onConfirm: () => {
            resolve(false);
          },
          onCancel: () => {
            resolve(true);
          }
        });
        console.info(f);
      });
    },
    openToast(message) {
      this.$buefy.toast.open(message);
    }
  }
};
</script>

<style lang="scss">
#create_datacard_component {
  display: grid;
  grid-template-rows: 70px 400px;
  height: 100%;
}

#create_datacard_component_header {
  grid-row: 1 / 2;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  // justify-items: center;
  // align-content: center;
}

#create_datacard_component_content {
  grid-row: 2 / 3;
  margin-top: 40px;
}

#create_datacard_return_button {
  grid-column: 1 / 2;
  justify-self: start;
  align-self: center;
  margin-left: 20px;
}

#create_datacard_component_title {
  // margin-top: 20px;
  grid-column: 2 / 3;
  justify-self: center;
  align-self: center;
}

#add_datacard_return_button {
  color: black;
}
#add_datacard_return_icon {
  height: 15px;
  width: 15px;
  margin-right: 10px;
}
</style> 