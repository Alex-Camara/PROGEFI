<template>
  <div id="ui_create_collection_container">
    <div id="ui_create_collection_component_title">
      <p class="component_title">{{ title }}</p>
    </div>

    <div id="ui_create_collection_component_content">
      <create-collection :collection="collection"></create-collection>
    </div>

    <div
      id="ui_create_collection_create_button"
      class="float_button float_button_disabled"
      @click="createCollection()"
      @mouseleave="setHelpText('', false)"
      @mouseenter="setHelpText(helpTextCreate, true)"

    >
      <img class="float_button_icon" :src="require('../assets/correct.png')" />
    </div>
  </div>
</template>

<script>
import createCollection from "../components/createCollection";
import Collection from "../models/collection";
export default {
  name: "UICreateCollection",
  components: { "create-collection": createCollection },
  data() {
    return {
      title: "Crear colección",
      collection: new Collection(),
      helpTextCreate: "Crear colección..."
    };
  },
  computed: {
    isCollectionValid: function() {
      return (
        this.collection.getNameValid().isValid &&
        this.collection.getCodeValid().isValid &&
        this.collection.getDescriptionValid().isValid &&
        this.collection.getEntityNameValid().isValid &&
        this.collection.getInstituteLogoPathValid().isValid &&
        this.collection.getEntityAcronymValid().isValid &&
        this.collection.getInstituteAcronymValid().isValid &&
        this.collection.getCataloguesFolderPathValid().isValid &&
        this.collection.getInstituteNameValid().isValid
      );
    }
  },
  watch: {
    isCollectionValid(newValue) {
      let createButtonElement = document.getElementById(
        "ui_create_collection_create_button"
      );
      if (newValue) {
        createButtonElement.classList.remove("float_button_disabled");
      } else {
        createButtonElement.classList.add("float_button_disabled");
      }
    }
  },
  methods: {
    async createCollection() {
      await this.$store.dispatch("loading/setActive", {
        active: true,
        message: "Creando colección..."
      });

      this.collection
        .save()
        .then(async () => {
          await this.$store.dispatch("loading/setActive", {
            active: false,
            message: null
          });

          this.openToast("¡Colección creada!");
          this.$store.commit("menu/enableAll");
          await this.$router.push({
            name: "UIShowCollections"
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

<style lang="scss" scoped>
@import "../style/style.scss";
.float_button {
  background-color: $secondary !important;
}

.float_button_disabled {
  pointer-events: none !important;
  opacity: 0.7 !important;
}
</style>

<style lang="scss">
@import "../style/style.scss";
#ui_create_collection_container {
  display: grid;
  grid-template-rows: 10% 10% 80%;
  height: 100%;
}
#ui_create_collection_component_title {
  display: flex;
  grid-row: 1 / 2;
  justify-self: center;
  align-self: center;
}
#ui_create_collection_component_content {
  grid-row: 3 / 4;
  width: 1000px;
  // background-color: red;
  justify-self: center;
}
</style>
