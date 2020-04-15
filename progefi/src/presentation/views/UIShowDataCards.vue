<template>
  <!-- --------showDataCards Component----- -->
  <div id="show_datacards_component">
    <!-- --------showDataCards Component Header----- -->
    <div id="show_datacards_component_title">
      <p
        class="component_title_return"
        @click="returnToCollections()"
        v-if="selectedCatalogue"
      >{{returnToCollectionTitle}}</p>
      <img
        class="component_title_separator"
        v-if="selectedCatalogue"
        src="../assets/bar.png"
      />
      <p class="component_title_return" @click="returnToCatalogues()">{{ returnToCataloguesTitle }}</p>
      <img
        class="component_title_separator"
        v-if="selectedCatalogue"
        src="../assets/bar.png"
      />
      <p class="component_title">{{ title }}</p>
      <!-- <img class="component_title_separator" v-if="selectedCatalogue" src="../assets/bar.png" /> -->
<!--      <p class="component_title" v-if="!selectedCatalogue">{{ title }}</p>-->
    </div>

    <div id="show_datacards_component_top_controls">
      <search-datacards
        @searchDatacards="searchDatacards($event)"
      ></search-datacards>
    </div>

    <!-- --------showDataCards Component Content----- -->
    <div id="show_datacards_component_content">
      <keep-alive>
      <datacards-table
        :selectedCatalogue="selectedCatalogue"
        @showDatacard="showDatacard($event)"
      ></datacards-table>
      </keep-alive>
      <div
        class="float_button"
        v-on:click="createDataCard"
        @mouseleave="setHelpText('', false)"
        @mouseenter="
          setHelpText(helpText, true)">
        <img class="float_button_icon" :src="require('../assets/plus.png')" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import searchDatacards from "../components/searchDatacards.vue";
import datacardsTable from "../components/datacardsTable.vue";
export default {
  name: "UIShowDataCards",
  props: ["selectedCatalogue"],
  components: {
    "search-datacards": searchDatacards,
    "datacards-table": datacardsTable
  },
  data() {
    return {
      title: "Fichas de fotocolecta",
      returnToCataloguesTitle: "",
      returnToCollectionTitle: "",
      searchString: null,
      helpText: "Agregar una ficha..."
    };
  },
  // beforeRouteEnter(to, from, next) {
  // next(vm => {
  // if (to.params.reloadDatacards) {
  // vm.reloadDatacards = true;
  // } else {
  // vm.reloadDatacards = false;
  // }
  // });
  // },
  mounted() {
    if (this.selectedCatalogue != null) {
      // debugger;
      this.title = this.selectedCatalogue.getName();
      this.returnToCataloguesTitle = "Catálogos"
      this.returnToCollectionTitle = "Colección";
    }
  },
  computed: {},
  methods: {
    createDataCard() {
      this.$router.push({
        name: "UICreateDataCard",
        params: {
          catalogue: this.selectedCatalogue
        }
      });
    },
    showDatacard(selectedDatacard) {
      this.setHelpText("", false);
      if (selectedDatacard.isValidated()) {
        this.$router.push({
          name: "UIShowDatacard",
          params: {
            datacard: selectedDatacard,
            selectedCatalogue: this.selectedCatalogue
          }
        });
      } else {
        this.$router.push({
          name: "UICreateDataCard",
          params: {
            datacardDraft: selectedDatacard
          }
        });
      }
    },
    searchDatacards(searchString) {
      console.log("EL TEXTO ES: " + searchString);
    },
    truncate(value, length) {
      return value.length > length ? value.substr(0, length) + "..." : value;
    },
    setHelpText(message, active) {
      this.$store.dispatch("helpText/setActive", { active, message });
    },
    returnToCatalogues() {
      this.setHelpText("", false);
      this.$router.push({
        name: "UIShowCatalogues",
        params: {
          selectedCollection: this.selectedCatalogue.getCollection()
        }
      });
    },
    returnToCollections() {
      this.setHelpText("", false);
      this.$router.push({
        name: "UIShowCollections"
      });
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";

#show_datacards_component {
  display: grid;
  grid-template-rows: 10% 10% 80%;
  height: 100%;
}

#show_datacards_component_title {
  display: flex;
  grid-row: 1 / 2;
  justify-self: center;
  align-self: center;
}

#show_datacards_component_top_controls {
  grid-row: 2 / 3;
  align-self: center;
  display: grid;
  grid-template-columns: 60% 20% 20%;
}

#show_datacards_search_field {
  margin-top: 25px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}

#show_datacards_component_content {
  grid-row: 3 / 4;
  margin-top: 10px;
}
</style>
