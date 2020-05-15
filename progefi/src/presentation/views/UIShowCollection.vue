<template>
  <div id="show_collections_component">
    <div id="show_collections_component_title">
      <p class="component_title">{{ title }}</p>
    </div>
    <div id="show_collections_component_content">
      <show-collection
        :collection="this.collection"
        :thereIsNoCollection="thereIsNoCollection"
        v-if="!editMode"
      ></show-collection>

      <create-collection
        :collection="this.collection"
        :edit-mode="editMode"
        v-if="editMode"
      ></create-collection>

      <div
        id="ui_show_collection_cancel_button"
        class="float_button float_cancel_style"
        v-on:click="cancel"
        @mouseleave="setHelpText('', false)"
        @mouseenter="setHelpText(helpTextCancel, true)"
      >
        <img class="float_button_icon" :src="require('../assets/close.png')" />
      </div>

      <div
        id="ui_show_collection_edit_button"
        class="float_button"
        v-on:click="editCollection()"
        @mouseleave="setHelpText('', false)"
        @mouseenter="setHelpText(helpTextEdit, true)"
      >
        <img
          id="ui_show_collection_edit_icon"
          class="float_button_icon"
          :src="require('../assets/edit.png')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import showCollection from "../components/showCollection.vue";
import Collection from "../models/collection";
import createCollection from "../components/createCollection";
export default {
  components: {
    "show-collection": showCollection,
    "create-collection": createCollection
  },
  data() {
    return {
      title: "Colección",
      collection: new Collection(),
      buttonTransformed: false,
      thereIsNoCollection: false,
      editMode: false,
      addMode: false,
      editButtonAction: "editCollection",
      editIcon: require("../assets/edit.png"),
      cancelIcon: require("../assets/close.png"),
      commitIcon: require("../assets/correct.png"),
      newCollection: new Collection(),
      helpTextEdit: "Editar colección...",
      helpTextCancel: "Cancelar...",
      auxiliarCollection: new Collection()
    };
  },
  async mounted() {
    Collection.getAll()
      .then(result => {
        let receivedCollection = result;
        // let receivedCollection = [];
        if (receivedCollection.length === 0) {
          this.$router.push({
            name: "UICreateCollection"
          });
        } else {
          this.collection = receivedCollection;
        }
      })
      .catch(() => {
        this.openDialog("Ha ocurrido un error con la base de datos");
      });
  },
  computed: {},
  methods: {
    editCollection() {
      if (this.editMode) {
        this.updateCollection();
        this.editMode = !this.editMode;
        this.modifyButton();
      } else {
        this.editMode = !this.editMode;
        this.modifyButton();
        this.auxiliarCollection.setCollection(this.collection);
      }
    },
    cancel() {
      this.editMode = !this.editMode;
      this.modifyButton();
      this.collection.setCollection(this.auxiliarCollection);
    },
    modifyButton() {
      let editButton = document.getElementById(
        "ui_show_collection_edit_button"
      );
      let editIcon = document.getElementById("ui_show_collection_edit_icon");
      if (this.editMode) {
        editButton.classList.remove("float_button");
        editButton.classList.add("float_button_lateral");
        editIcon.src = this.commitIcon;
        this.helpTextEdit = "Guardar cambios..."
      } else {
        editButton.classList.remove("float_button_lateral");
        editButton.classList.add("float_button");
        editIcon.src = this.editIcon;
        this.helpTextEdit = "Editar colección..."
      }
    },
    async updateCollection() {
      await this.$store.dispatch("loading/setActive", {
        active: true,
        message: "Actualizando la colección..."
      });

      this.collection
        .update()
        .then(async () => {
          await this.$store.dispatch("loading/setActive", {
            active: false,
            message: null
          });
          this.openToast("La colección ha sido actualizada");
        })
        .catch(async (error) => {
          console.info(error)
          await this.$store.dispatch("loading/setActive", {
            active: false,
            message: null
          });
          this.openDialog("Ha ocurrido un error con la base de datos");
        });
    },
    setHelpText(message, active) {
      this.$store.dispatch("helpText/setActive", { active, message });
    },
    openToast(message) {
      this.$buefy.toast.open(message);
    },
    openDialog(message) {
      this.$buefy.dialog.alert(message);
    }
  }
};
</script>

<style lang="scss">
#show_collections_component {
  display: grid;
  grid-template-rows: 10% 90%;
  height: 100%;
}
#show_collections_component_title {
  grid-row: 1 / 2;
  justify-self: center;
  align-self: center;
}
#show_collections_component_content {
  grid-row: 2 / 3;
  margin-top: 20px;
}

#shoe_collection_save_changes_text {
  color: black;
  font-weight: bold;
}
</style>
