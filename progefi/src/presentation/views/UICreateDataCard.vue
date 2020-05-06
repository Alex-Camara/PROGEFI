<template>
  <!-- --------AddDataCard Component----- -->
  <div id="create_datacard_component">
    <!-- --------AddDataCard Component Header----- -->
    <div id="create_datacard_component_header">
      <div id="create_datacard_component_title">
        <p class="component_title">{{title}}</p>
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
            <UIValidateData v-on:exitComponent="exitComponent()"></UIValidateData>
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
    // Sí se va a continuar un borrador de ficha, se cargan sus datos
    async setDatacard(datacardDraft) {
      this.disableGeneralDataFields = true;
      this.$store.commit("datacard/setDatacard", datacardDraft);
      let photocollectPath = datacardDraft.getDatacardPath() + "/original.png";
      await this.$store.dispatch(
        "addDatacard/setPhotocollectFilePath",
        photocollectPath
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
    async exitComponent(){
      if (this.catalogue){
        await this.$router.push({
          name: "UIShowCatalogues",
          params: { askToLeave: false }
        });
      } else{
        await this.$router.push({
          name: "UIShowDataCards",
          params: { askToLeave: false, selectedCatalogue: this.catalogue, reload: true }
        });
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
      return new Promise((resolve) => {
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