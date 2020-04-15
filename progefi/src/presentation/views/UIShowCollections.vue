<template>
  <div id="show_collections_component">
    <div id="show_collections_component_title">
      <p class="component_title">{{ title }}</p>
    </div>

    <div id="show_collections_component_content">
      <show-collection></show-collection>

      <div
        id="collection_edit_button"
        class="float_button"
        v-on:click="editCollection()"
      >
        <img
          class="float_button_icon"
          v-if="!buttonTransformed"
          :src="require('../assets/edit.png')"
        />
        <p id="shoe_collection_save_changes_text" v-if="buttonTransformed">
          Guardar cambios
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import showCollection from "../components/showCollection.vue";
export default {
  components: {
    "show-collection": showCollection
  },
  data() {
    return {
      title: "Colección",
      buttonTransformed: false
    };
  },
  methods: {
    editCollection() {
      this.modifyButton();
    },
    modifyButton() {
      let button = document.getElementById("collection_edit_button");
      if (!this.buttonTransformed) {
        button.style.transition = "0.2s";
        button.style.width = "200px";
        this.buttonTransformed = true;
      } else {
        button.style.transition = "0.2s";
        button.style.width = "60px";
        // button.style.height = "60px";
        this.buttonTransformed = false;
      }
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
