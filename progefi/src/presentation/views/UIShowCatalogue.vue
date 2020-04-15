<template>
  <div id="ui_show_catalogue_container">
    <div id="ui_show_catalogue_component_title">
      <p
        class="component_title_return"
        v-if="catalogue"
        @click="returnToCollections()"
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
      @click="deleteCatalogue()"
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
      @click="editCatalogue()"
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
      editMode: false
    };
  },
  mounted() {
    if (this.catalogue != null) {
      this.title = this.catalogue.getName();
    } else {
      this.title = "Agregar catálogo";
    }
  },
  methods: {
    returnToCollection() {
      this.$router.push({
        name: "UIShowCollections"
      });
    },
    returnToCatalogues() {
      this.$router.push({
        name: "UIShowCatalogues",
        params: {
          selectedCollection: this.catalogue.getCollection()
        }
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
    editCatalogue() {
      this.editMode = !this.editMode;
      this.modifyButton();
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
        deleteButton.classList.add(
          "float_button",
          "ui_show_catalogue_cancel_button"
        );
      } else {
        this.helpTextEdit = "Editar...";
        this.helpTextDelete = "Eliminar...";
        editButton.classList.remove("float_button_lateral");
        editButton.classList.add("float_button");
        deleteButton.classList.remove(
          "float_button",
          "ui_show_catalogue_cancel_button"
        );
        deleteButton.classList.add("float_button_delete");
      }
    }
  }
};
</script>

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

.ui_show_catalogue_cancel_button {
  background-color: $danger-light !important;
}
.ui_show_catalogue_cancel_button:hover {
  background-color: $danger !important;
}
</style>
