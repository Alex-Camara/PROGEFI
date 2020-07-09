<template>
  <div id="ui_create_catalogue_container">
    <div id="ui_create_catalogue_component_title">
      <p class="component_title_return" @click="returnToCatalogues()">
        {{ returnToCataloguesTitle }}
      </p>
      <img class="component_title_separator" src="../assets/bar.png" />

      <p class="component_title">{{ title }}</p>
    </div>
    <div id="ui_create_catalogue_component_content">
      <create-catalogue :catalogue="catalogue"></create-catalogue>
    </div>
    <div
      id="ui_create_catalogue_create_button"
      class="float_button_lateral float_button_lateral_disabled"
      @click="createCatalogue()"
      @mouseleave="setHelpText('', false)"
      @mouseenter="setHelpText(helpTextCreate, true)"
    >
      <img class="float_button_icon" :src="require('../assets/correct.png')" />
    </div>
    <div
      id="ui_create_catalogue_cancel_button"
      class="float_button ui_show_catalogue_cancel_button"
      @click="showDialog()"
      @mouseleave="setHelpText('', false)"
      @mouseenter="setHelpText(helpTextCancel, true)"
    >
      <img class="float_button_icon" :src="require('../assets/close.png')" />
    </div>
  </div>
</template>

<script>
import createCatalogue from "../components/createCatalogue";
import Catalogue from "../models/catalogue";
export default {
  components: {
    "create-catalogue": createCatalogue
  },
  data() {
    return {
      title: "Crear catálogo",
      returnToCataloguesTitle: "Catálogos",
      helpTextCancel: "Cancelar...",
      helpTextCreate: "Crear catálogo...",
      catalogue: new Catalogue()
    };
  },
  computed: {
    isCatalogueValid: function() {
      return (
        this.catalogue.getNameValid().isValid &&
        this.catalogue.getCodeValid().isValid &&
        this.catalogue.getDescriptionValid().isValid
      );
    }
  },
  watch: {
    isCatalogueValid(newValue) {
      let createButtonElement = document.getElementById(
        "ui_create_catalogue_create_button"
      );
      if (newValue) {
        createButtonElement.classList.remove("float_button_lateral_disabled");
      } else {
        createButtonElement.classList.add("float_button_lateral_disabled");
      }
    }
  },
  methods: {
    async createCatalogue() {
      await this.$store.dispatch("loading/setActive", {
        active: true,
        message: "Creando catálogo..."
      });

      this.catalogue
        .save()
        .then(async () => {
          await this.$store.dispatch("loading/setActive", {
            active: false,
            message: null
          });

          this.openToast("¡Catálogo creado!");
          await this.$router.push({
            name: "UIShowCatalogues"
          });
        })
        .catch(async () => {
          await this.$store.dispatch("loading/setActive", {
            active: false,
            message: null
          });
          this.openDialog("Ha ocurrido un error con la base de datos");
        });
    },
    showDialog() {
      this.$buefy.dialog.confirm({
        message: "¿Deseas salir de esta ventana? El catálogo no se guardará",
        cancelText: "Continuar con el catálogo",
        focusOn: "cancel",
        confirmText: "Salir",
        onConfirm: () => {
          this.returnToCatalogues();
        }
      });
    },
    openToast(message) {
      this.$buefy.toast.open(message);
    },
    openDialog(message) {
      this.$buefy.dialog.alert(message);
    },
    returnToCatalogues() {
      this.$router.push({
        name: "UIShowCatalogues"
      });
    },

    setHelpText(message, active) {
      this.$store.dispatch("helpText/setActive", { active, message });
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";
#ui_create_catalogue_container {
  display: grid;
  grid-template-rows: 10% 10% 80%;
  height: 100%;
}
#ui_create_catalogue_component_title {
  display: flex;
  grid-row: 1 / 2;
  justify-self: center;
  align-self: center;
}
#ui_create_catalogue_component_content {
  grid-row: 3 / 4;
  width: 1000px;
  // background-color: red;
  justify-self: center;
}
.ui_show_catalogue_cancel_button {
  background-color: $danger-light !important;
}
.ui_show_catalogue_cancel_button:hover {
  background-color: $danger !important;
}

.float_button_lateral_disabled {
  pointer-events: none !important;
  opacity: 0.7 !important;
}
</style>
