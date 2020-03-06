<template>
  <!-- --------showDataCards Component----- -->
  <div id="show_datacards_component">
    <!-- --------showDataCards Component Header----- -->
    <div id="show_datacards_component_title">
      <p
        class="component_title_return"
        @click="returnToCollections()"
        v-if="selectedCatalogue"
      >Colecciones</p>
      <img class="component_title_separator" v-if="selectedCatalogue" src="../assets/bar.png" />
      <p class="component_title_return" @click="returnToCatalogues()">{{collectionTitle}}</p>
      <img class="component_title_separator" v-if="selectedCatalogue" src="../assets/bar.png" />
      <p class="component_title">{{catalogueTitle}}</p>
      <!-- <img class="component_title_separator" v-if="selectedCatalogue" src="../assets/bar.png" /> -->
      <p class="component_title" v-if="!selectedCatalogue">{{title}}</p>
    </div>

    <div id="show_datacards_component_top_controls">
      <search-datacards @searchDatacards="searchDatacards($event)"></search-datacards>
    </div>

    <!-- --------showDataCards Component Content----- -->
    <div id="show_datacards_component_content">
      <datacards-table :selectedCatalogue="selectedCatalogue" @showDatacard="showDatacard($event)"></datacards-table>
      <div class="float_button" v-on:click="createDataCard">
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
      catalogueTitle: "",
      collectionTitle: "",
      searchString: null
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
      this.catalogueTitle = this.selectedCatalogue.getName();
      this.collectionTitle = this.truncate(
        this.selectedCatalogue.getCollection().getName(),
        45
      );
    }
  },
  computed: {
    ...mapState("catalogue", {
      catalogueState: state => state
    })
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
    returnToCatalogues() {
      this.$router.push({
        name: "UIShowCatalogues",
        params: {
          selectedCollection: this.selectedCatalogue.getCollection()
        }
      });
    },
    returnToCollections() {
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

#show_datacards_float_button_icon {
  width: 20px;
  height: 20px;
  // margin-top: 20px;
}

#show_datacards_float_button {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: $accent;
  color: $white;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  align-items: center;
  justify-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
  padding-top: 20px;
}

#show_datacards_float_button:hover {
  transition: 0.2s;
  background-color: $secondary;
  width: 70px;
  height: 70px;
  bottom: 35px;
  right: 35px;
  padding-top: 23.3px;
}

#show_datacards_float_button:active {
  transition: 0.2s;
  background-color: $primary;
  width: 70px;
  height: 70px;
  bottom: 35px;
  right: 35px;
  padding-top: 23.3px;
}

#show_datacards_float_button:hover + #show_datacards_float_button_icon {
  transition: 0.2s;
  width: 80px;
  height: 80px;
  margin-top: 90px;
}
</style>
