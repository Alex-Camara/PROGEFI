<template>
  <div id="ui_show_catalogue_container">
    <div id="ui_show_catalogue_component_title">
      <p
        class="component_title_return"
        v-if="catalogue"
        @click="returnToCollection()"
      >
        {{ returnToCollectionTitle }}
      </p>
      <img
        class="component_title_separator"
        v-if="catalogue"
        src="../assets/bar.png"
      />
      <p class="component_title_return" @click="returnToCatalogues()">
        {{ returnToCataloguesTitle }}
      </p>
      <img class="component_title_separator" src="../assets/bar.png" />
      <p class="component_title">{{ title }}</p>
    </div>
    <div id="ui_show_catalogue_component_content">
      <show-catalogue
        :catalogue="catalogue"
        :edit-mode="editMode"
        v-if="catalogue"
      ></show-catalogue>
      <create-catalogue v-if="!catalogue"></create-catalogue>
    </div>
    <div
      id="ui_show_catalogue_delete_button"
      class="float_button_delete"
      v-if="catalogue"
      @click="setCancelAction()"
      @mouseleave="setHelpText('', false)"
      @mouseenter="setHelpText(helpTextDelete, true)"
    >
      <img
        class="float_button_icon"
        v-if="!editMode"
        :src="require('../assets/trash.png')"
      />
      <img
        class="float_button_icon"
        v-if="editMode"
        :src="require('../assets/close.png')"
      />
    </div>
    <div
      class="float_button"
      id="ui_show_catalogue_edit_button"
      v-if="catalogue"
      @click="setEditAction()"
      @mouseleave="setHelpText('', false)"
      @mouseenter="setHelpText(helpTextEdit, true)"
    >
      <img
        class="float_button_icon"
        v-if="!editMode"
        :src="require('../assets/edit.png')"
      />
      <img
        class="float_button_icon"
        v-if="editMode"
        :src="require('../assets/correct.png')"
      />
    </div>
  </div>
</template>

<script>
import Catalogue from "../models/catalogue.js";
import showCatalogue from "../components/showCatalogue";
import createCatalogue from "../components/createCatalogue";
import Datacard from "../models/datacard";

export default {
  props: { catalogue: Catalogue },
  components: {
    "show-catalogue": showCatalogue,
    "create-catalogue": createCatalogue
  },
  data() {
    return {
      returnToCollectionTitle: "Colección",
      returnToCataloguesTitle: "Catálogos",
      title: "",
      helpTextEdit: "Editar...",
      helpTextDelete: "Eliminar...",
      editMode: false,
      auxiliarCatalogue: new Catalogue()
    };
  },
  mounted() {
    if (this.catalogue != null) {
      this.title = this.catalogue.getName();
      this.auxiliarCatalogue.setCatalogue(this.catalogue);
    } else {
      this.title = "Agregar catálogo";
    }
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
      if (this.editMode) {
        let createButtonElement = document.getElementById(
          "ui_show_catalogue_edit_button"
        );
        if (newValue) {
          createButtonElement.classList.remove("float_button_disabled");
        } else {
          createButtonElement.classList.add("float_button_disabled");
        }
      }
    }
  },
  methods: {
    returnToCollection() {
      this.$store.commit("menu/setItemWithParams", {
        name: "UIShowCollections",
        params: null
      });
    },
    returnToCatalogues() {
      this.$store.commit("menu/setItemWithParams", {
        name: "UIShowCatalogues",
        params: {selectedCollection: this.catalogue.getCollection()}
      });
    },
    setCancelAction() {
      if (this.editMode) {
        this.editMode = false;
        this.modifyButton();
        this.catalogue.setCatalogue(this.auxiliarCatalogue);
      } else {
        this.deleteCatalogue();
      }
    },
    setEditAction() {
      if (this.editMode) {
        this.updateCatalogue();
      } else {
        this.editMode = true;

        this.modifyButton();
      }
    },
    editCatalogue() {
      this.editMode = !this.editMode;
      this.modifyButton();
    },
    async updateCatalogue() {
      await this.$store.dispatch("loading/setActive", {
        active: true,
        message: "Actualizando el catálogo..."
      });

      this.catalogue
        .update()
        .then(async () => {
          await this.$store.dispatch("loading/setActive", {
            active: false,
            message: null
          });
          this.openToast("El catálogo ha sido actualizado");
        })
        .catch(async error => {
          console.info(error);
          await this.$store.dispatch("loading/setActive", {
            active: false,
            message: null
          });
          this.openDialog("Ha ocurrido un error con la base de datos");
        })
        .finally(() => {
          this.editMode = false;
          this.modifyButton();
        });
    },
    async deleteCatalogue() {
      let answer = await this.openDialog("¿Deseas eliminar el catálogo?");
      if (answer) {
        if (this.catalogue.getDatacardCount() > 0) {
          let datacardCountPhrase = this.getDatacardCountPhrase(
            this.catalogue.getDatacardCount()
          );
          let confirmation = await this.openDialog(
            "Este catálogo contiene: " +
              datacardCountPhrase +
              " ¿Deseas eliminar el catálogo? Se eliminarán las fichas de fotocolecta que este contenga"
          );
          if (confirmation) {
            let datacardsFromCatalogue = await Datacard.getAll(
              this.catalogue.getId()
            );
            for (let i = 0; i < datacardsFromCatalogue.length; i++) {
              await datacardsFromCatalogue[i].delete();
            }
          } else {
            return;
          }
        }

        this.catalogue
          .delete()
          .then(() => {
            this.openToast("El catálogo ha sido eliminado");
          })
          .catch(() => {
            this.openErrorDialog("Ha ocurrido un error con la base de datos");
          });
        this.$router.push({
          name: "UIShowCatalogues"
        });
      }
    },
    getDatacardCountPhrase(datacardCount) {
      if (datacardCount === 1) {
        return datacardCount + " FICHA ";
      } else {
        return datacardCount + " FICHAS ";
      }
    },
    openToast(message) {
      this.$buefy.toast.open(message);
    },
    openErrorDialog(message) {
      this.$buefy.dialog.alert(message);
    },
    openDialog(message) {
      return new Promise(resolve => {
        this.$buefy.dialog.confirm({
          message: message,
          type: "is-danger",
          confirmText: "Eliminar catálogo",
          cancelText: "Cancelar",
          onConfirm: () => {
            resolve(true);
          },
          onCancel: () => {
            resolve(false);
          }
        });
      });
    },
    setHelpText(message, active) {
      this.$store.dispatch("helpText/setActive", { active, message });
    },
    modifyButton() {
      let deleteButton = document.getElementById(
        "ui_show_catalogue_delete_button"
      );
      let editButton = document.getElementById("ui_show_catalogue_edit_button");
      if (this.editMode) {
        this.helpTextEdit = "Guardar cambios...";
        this.helpTextDelete = "Cancelar edición...";
        editButton.classList.toggle("float_button_lateral");
        deleteButton.classList.remove("float_button_delete");
        deleteButton.classList.add("float_button", "float_cancel_style");
      } else {
        this.helpTextEdit = "Editar...";
        this.helpTextDelete = "Eliminar...";
        editButton.classList.remove("float_button_lateral");
        editButton.classList.remove("float_button_disabled");
        editButton.classList.add("float_button");
        deleteButton.classList.remove("float_button", "float_cancel_style");
        deleteButton.classList.add("float_button_delete");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .float_button_disabled {
    pointer-events: none !important;
    opacity: 0.7 !important;
  }
</style>

<style lang="scss">
@import "../style/style.scss";
#ui_show_catalogue_edit_button {
}
#ui_show_catalogue_container {
  display: grid;
  grid-template-rows: 10% 5% 85%;
  height: 100%;
  height: 500px;
}
#ui_show_catalogue_component_title {
  grid-row: 1 / 2;
  display: flex;
  justify-self: center;
  align-self: center;
}

#ui_show_catalogue_component_content {
  grid-row: 3 / 4;
  display: flex;
  flex-basis: fit-content;
  /*height: 100%;*/
  width: 1000px;
  justify-self: center;
}
</style>
