<template>
  <div id="show_catalogues_component">
    <div id="show_catalogues_component_title">
      <p
        class="component_title_return"
        @click="returnToCollections()"
        v-if="selectedCollection"
      >Colecciones</p>
      <img class="component_title_separator" v-if="selectedCollection" src="../assets/bar.png" />
      <p class="component_title">{{collectionTitle}}</p>
      <p class="component_title" v-if="!selectedCollection">Catálogos</p>
    </div>

    <div id="show_catalogues_component_content">
      <catalogues-table
        :selectedCollection="selectedCollection"
        @showCatalogue="showCatalogue($event)"
        @showDatacards="showDatacards($event)"
      ></catalogues-table>

      <div class="float_button" v-on:click="createCatalogue">
        <img class="float_button_icon" :src="require('../assets/plus.png')" />
      </div>
    </div>
  </div>
</template>

<script>
import cataloguesTable from "../components/cataloguesTable.vue";
export default {
  props: ["selectedCollection"],
  components: {
    "catalogues-table": cataloguesTable
  },
  data() {
    return {
      collectionTitle: ""
    };
  },
  mounted() {
    if (this.selectedCollection != null) {
      // debugger;
      this.collectionTitle = this.truncate(
        this.selectedCollection.getName(),
        45
      );
    }
  },
  watch: {
    "this.selectedCollection"(newVal, oldVal) {
      debugger;
    }
  },
  methods: {
    createCatalogue() {
      this.$router.push({
        name: "UICreateCatalogue"
      });
    },
    showDatacards(selectedCatalogue) {
      this.$router.push({
        name: "UIShowDataCards",
        params: {
          selectedCatalogue: selectedCatalogue
        }
      });
    },
    showCatalogue(selectedCatalogue) {
      this.$router.push({
        name: "UIShowCatalogue",
        params: { catalogue: selectedCatalogue }
      });
    },
    returnToCollections() {
      this.$router.push({
        name: "UIShowCollections"
      });
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