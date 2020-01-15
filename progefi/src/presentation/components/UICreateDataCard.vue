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
        <p class="is-size-4">Agregar ficha</p>
      </div>
    </div>

    <!-- --------AddDataCard Component Content----- -->
    <div id="addDataCard-component-content">
      <div>
        <b-steps size="is-small" type="is-secondary" :has-navigation="false" v-model="activeStep">
          <b-step-item label="Subir fotografía" icon="image" :clickable="true">
            <UIUploadImage></UIUploadImage>
          </b-step-item>
          <b-step-item label="Datos generales" icon="file-document-edit" :clickable="true">
            <UIGeneralData></UIGeneralData>
          </b-step-item>
          <b-step-item label="Datos geográficos" icon="earth" :clickable="true">
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
    this.showInternetStatus();
  },
  beforeDestroy() {
    this.resetStore();
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
  methods: {
    resetStore() {
      store.dispatch("resetStore");
    },
    showDataCards() {
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
  },
  computed: {
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