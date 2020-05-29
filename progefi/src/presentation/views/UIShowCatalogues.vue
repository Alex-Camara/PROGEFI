<template>
  <div id="show_catalogues_component">
    <div id="show_catalogues_component_title">
      <p class="component_title_return" @click="returnToCollections()">
        {{ returnToCollectionTitle }}
      </p>
      <img class="component_title_separator" src="../assets/bar.png" />
      <p class="component_title">{{ title }}</p>
    </div>

    <div id="show_catalogues_component_content">
      <catalogues-table
        :selectedCollection="collection"
        @showCatalogue="showCatalogue($event)"
        @showDatacards="showDatacards($event)"
      ></catalogues-table>

      <div
        class="float_button"
        v-on:click="createCatalogue"
        @mouseleave="setHelpText('', false)"
        @mouseenter="setHelpText(helpText, true)">
        <img class="float_button_icon" :src="require('../assets/plus.png')" />
      </div>
    </div>
  </div>
</template>

<script>
import cataloguesTable from "../components/cataloguesTable.vue";
import Collection from "../models/collection";
export default {
  props: ["selectedCollection"],
  components: {
    "catalogues-table": cataloguesTable
  },
  data() {
    return {
      collection: new Collection(),
      title: "Catálogos",
      returnToCollectionTitle: "Colección",
      helpText: "Agregar catálogo..."
    };
  },
  async mounted() {
    if (this.selectedCollection == null) {
      this.collection = await Collection.getAll();
    } else{
      this.collection = this.selectedCollection;
    }
  },
  methods: {
    createCatalogue() {
      this.setHelpText("", false);
      this.$router.push({
        name: "UICreateCatalogue"
      });
    },
    showDatacards(selectedCatalogue) {
      this.$store.commit("menu/setItemWithParams", {
        name: "UIShowDataCards",
        params: { selectedCatalogue: selectedCatalogue }
      });
    },
    showCatalogue(selectedCatalogue) {
      this.$router.push({
        name: "UIShowCatalogue",
        params: { catalogue: selectedCatalogue }
      });
    },
    returnToCollections() {
      this.$store.commit("menu/setItemWithParams", {
        name: "UIShowCollections",
        params: null
      });
    },
    setHelpText(message, active) {
      this.$store.dispatch("helpText/setActive", { active, message });
    },
    truncate(value, length) {
      return value.length > length ? value.substr(0, length) + "..." : value;
    }
  }
};
</script>

<style lang="scss">
#show_catalogues_component {
  display: grid;
  grid-template-rows: 10% 90%;
  height: 100%;
}
#show_catalogues_component_title {
  grid-row: 1 / 2;
  display: flex;
  justify-self: center;
  align-self: center;
}
#show_catalogues_component_content {
  grid-row: 2 / 3;
  margin-top: 20px;
}
</style>
