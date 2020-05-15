<template>
  <div id="show_datacard_content_container">
    <div id="show_datacard_component_title">
      <p
        class="component_title_return"
        @click="returnToCollections()"
        v-if="selectedCatalogue"
      >{{returnToCollectionTitle}}</p>
      <img class="component_title_separator" v-if="selectedCatalogue" src="../assets/bar.png" />
      <p class="component_title_return" @click="returnToCatalogues()">{{returnToCataloguesTitle}}</p>
      <img class="component_title_separator" v-if="selectedCatalogue" src="../assets/bar.png" />
      <p class="component_title_return" @click="returnToDatacards()">{{returnToDatacardsTitle}}</p>
      <img class="component_title_separator" v-if="selectedCatalogue" src="../assets/bar.png" />
      <p class="component_title">{{datacardTitle}}</p>
    </div>

    <div id="show_datacard_validated_message">
      <!-- <p class="is-size-5">Validada</p> -->
      <span id="show_datacard_validated_tag" class="tag is-medium">Validada</span>
    </div>

    <div id="show_datacard_options_component">
      <export-button :datacards="[datacard]" :disabled="false"></export-button>
    </div>

    <div id="show_datacard_component">
      <b-tabs v-model="activeTab" position="is-centered">
        <b-tab-item label="Imagen">
          <div>
            <show-image v-bind:imagePath="datacard.getDatacardPath() + '/datacard.png'"></show-image>
          </div>
        </b-tab-item>

        <b-tab-item label="Información">
          <div>
            <show-datacard-info v-bind:datacard="datacard"></show-datacard-info>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import Datacard from "../models/datacard.js";
import Catalogue from "../models/catalogue.js";
import exportButton from "../components/exportButton";
import showImage from "../components/showImage";
import showDatacardInfo from "../components/showDatacardInfo";
export default {
  name: "UIShowDatacard",
  props: { datacard: Datacard, selectedCatalogue: Catalogue },
  components: {
    "export-button": exportButton,
    "show-image": showImage,
    "show-datacard-info": showDatacardInfo
  },
  data() {
    return {
      showImage: true,
      activeTab: 0,
      returnToCollectionTitle: "",
      returnToCataloguesTitle: "",
      returnToDatacardsTitle: "",
      datacardTitle: ""
    };
  },
  mounted() {
    // Mover el scroll al principio
    window.scrollTo(0, 0);
    if (this.selectedCatalogue) {
      this.returnToCollectionTitle = "Colección";
      this.returnToCataloguesTitle = "Catálogos";
      this.returnToDatacardsTitle = this.selectedCatalogue.getName();
    }
    if (this.datacard){
      this.datacardTitle = this.datacard.getCode();
    }
  },
  methods: {
    setShowImage(show) {
      this.showImage = show;
    },
    showDatacards() {
      this.$router.push({
        name: "UIShowDataCards",
        params: { reloadDatacards: false }
      });
    },

    returnToCollections() {
      this.$router.push({
        name: "UIShowCollections"
      });
    },
    returnToCatalogues() {
      this.$router.push({
        name: "UIShowCatalogues",
        params: {
          selectedCollection: this.selectedCatalogue.getCollection()
        }
      });
    },
    returnToDatacards() {
      this.$router.push({
        name: "UIShowDataCards",
        params: { selectedCatalogue: this.selectedCatalogue }
      });
    },
    truncate(value, length) {
      return value.length > length ? value.substr(0, length) + "..." : value;
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";
.component_title_return {
  font-size: 10px;
}
.component_title {
  font-size: 10px;
}

#show_datacard_content_container {
  display: grid;
  grid-template-rows: 10% 10% 10% 70%;
  height: 100%;
}

#show_datacard_component_title {
  grid-row: 1 / 2;
  display: flex;
  justify-self: center;
  align-self: center;
}

#show_datacard_validated_message {
  grid-row: 2 / 3;
  justify-self: center;
  align-self: center;
  //   background-color: $primary;
}

#show_datacard_validated_tag {
  background-color: $primary;
  color: $white;
  width: 1000px;
  opacity: 0.6;
  margin-bottom: 20px;
  // align-self: t;
}

#show_datacard_options_component {
  grid-row: 3 / 4;
  width: 1000px;
  justify-self: center;
}

#show_datacard_component {
  grid-row: 4 / 5;
  width: 1000px;
  justify-self: center;
}
</style>