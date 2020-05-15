<template>
  <!-- --------showDataCards Component----- -->
  <div id="ui_show_datacards_component">
    <b-loading
            :is-full-page="true"
            :active.sync="loading"
            :can-cancel="false"
    ></b-loading>
    <!-- --------showDataCards Component Header----- -->
    <div id="ui_show_datacards_component_title">
      <p
        class="component_title_return"
        @click="returnToCollections()"
        v-if="selectedCatalogue"
      >
        {{ returnToCollectionTitle }}
      </p>
      <img
        class="component_title_separator"
        v-if="selectedCatalogue"
        src="../assets/bar.png"
      />
      <p class="component_title_return" @click="returnToCatalogues()">
        {{ returnToCataloguesTitle }}
      </p>
      <img
        class="component_title_separator"
        v-if="selectedCatalogue"
        src="../assets/bar.png"
      />
      <p class="component_title">{{ title }}</p>
    </div>

    <simple-search
      id="ui_show_datacards_component_top_controls"
      @showAdvancedSearch="setShowAdvancedSearch($event)"
      @search="simpleSearchDatacards($event)"
    ></simple-search>

    <advanced-search
      id="ui_show_datacards_advanced_search"
      :filtered-datacards="filteredDatacards"
      :show="showAdvancedSearch"
      :catalogue="selectedCatalogue"
      @search="advanceSearchDatacards($event)"
    ></advanced-search>

    <!-- --------showDataCards Component Content----- -->
    <div id="ui_show_datacards_component_content">
      <keep-alive>
        <datacards-table
          :selected-catalogue="selectedCatalogue"
          :reload="reload"
          :advanced-search-criteria="advancedSearchCriteria"
          :simple-search-criteria="simpleSearchCriteria"
          @filteredDatacards="setFilteredDatacards($event)"
          @showDatacard="showDatacard($event)"
          @loading="setLoading"
        ></datacards-table>
      </keep-alive>
      <div
        class="float_button"
        v-on:click="createDataCard"
        @mouseleave="setHelpText('', false)"
        @mouseenter="setHelpText(helpText, true)"
      >
        <img class="float_button_icon" :src="require('../assets/plus.png')" />
      </div>
    </div>
  </div>
</template>

<script>
import simpleSearch from "../components/simpleSearch.vue";
import datacardsTable from "../components/datacardsTable.vue";
import advancedSearch from "../components/advancedSearch";
export default {
  name: "UIShowDataCards",
  props: ["selectedCatalogue"],
  components: {
    "simple-search": simpleSearch,
    "datacards-table": datacardsTable,
    "advanced-search": advancedSearch
  },
  data() {
    return {
      title: "Fichas de fotocolecta",
      returnToCataloguesTitle: "",
      returnToCollectionTitle: "",
      searchString: null,
      helpText: "Agregar una ficha...",
      reload: true,
      advancedSearchCriteria: null,
      simpleSearchCriteria: null,
      filteredDatacards: [],
      showAdvancedSearch: false,
      loading: false
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (from.params.reload) {
      this.reload = true;
      next();
    } else {
      this.reload = false;
      next();
    }
  },

  mounted() {
    if (this.selectedCatalogue != null) {
      this.title = this.selectedCatalogue.getName();
      this.returnToCataloguesTitle = "Catálogos";
      this.returnToCollectionTitle = "Colección";
    }
  },

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
    advanceSearchDatacards(advancedSearchCriteria) {
      this.advancedSearchCriteria = advancedSearchCriteria;
    },
    simpleSearchDatacards(code){
      this.simpleSearchCriteria = code;
    },
    setFilteredDatacards(filteredDatacards) {
      this.filteredDatacards = filteredDatacards;
    },
    setShowAdvancedSearch(show){
      this.showAdvancedSearch = show;
    },
    truncate(value, length) {
      return value.length > length ? value.substr(0, length) + "..." : value;
    },
    setHelpText(message, active) {
      this.$store.dispatch("helpText/setActive", { active, message });
    },
    setLoading(boolean){
      this.loading = boolean;
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

#ui_show_datacards_component {
  display: flex;
  flex-direction: column;
  /*grid-template-rows: 10% 10% 80%;*/
  /*height: 100%;*/
}

#ui_show_datacards_component_title {
  display: flex;
  /*grid-row: 1 2;*/
  justify-self: center;
  align-self: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

#ui_show_datacards_component_top_controls {
  /*grid-row: 2  3;*/
  align-self: center;
  justify-content: center;
}

#ui_show_datacards_advanced_search {
  /*width: 1000px;*/
  align-self: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
/*#show_datacards_search_field {*/
/*  margin-top: 25px;*/
/*  margin-left: 10px;*/
/*  margin-right: 10px;*/
/*  margin-bottom: 10px;*/
/*}*/

#ui_show_datacards_component_content {
  /*grid-row: 3 4;*/
  margin-top: 10px;
}
</style>
