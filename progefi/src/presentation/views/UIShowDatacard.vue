<template>
  <div id="show_datacard_content_container">
    <div id="show_datacard_component_title">
      <p
        class="component_title_return_small"
        @click="returnToCollections()"
        v-if="selectedCatalogue"
      >Colecciones</p>
      <img class="component_title_separator" v-if="selectedCatalogue" src="../assets/bar.png" />
      <p class="component_title_return_small" @click="returnToCatalogues()">{{collectionTitle}}</p>
      <img class="component_title_separator" v-if="selectedCatalogue" src="../assets/bar.png" />
      <p class="component_title_return_small" @click="returnToDatacards()">{{catalogueTitle}}</p>
      <img class="component_title_separator" v-if="selectedCatalogue" src="../assets/bar.png" />
      <p class="component_title_small">{{datacardTitle}}</p>
    </div>

    <div id="show_datacard_validated_message">
      <!-- <p class="is-size-5">Validada</p> -->
      <span id="show_datacard_validated_tag" class="tag is-medium">Validada</span>
    </div>

    <div id="show_datacard_options_component">
      <show-datacard-options @showImage="setShowImage($event)" @showDatacards="showDatacards()"></show-datacard-options>
    </div>

    <div id="show_datacard_component">
      <b-tabs v-model="activeTab" position="is-centered">
        <b-tab-item label="Imagen">
          <div>
            <show-datacard-image v-bind:datacardPath="datacard.getDatacardPath()"></show-datacard-image>
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
import showDatacardOptions from "../components/showDatacardOptions";
import showDatacardImage from "../components/showDatacardImage";
import showDatacardInfo from "../components/showDatacardInfo";
export default {
  name: "UIShowDatacard",
  props: { datacard: Datacard, selectedCatalogue: Catalogue },
  components: {
    "show-datacard-options": showDatacardOptions,
    "show-datacard-image": showDatacardImage,
    "show-datacard-info": showDatacardInfo
  },
  data() {
    return {
      showImage: true,
      activeTab: 0,
      collectionTitle: "",
      catalogueTitle: "",
      datacardTitle: ""
    };
  },
  mounted() {
    // Mover el scroll al principio
    window.scrollTo(0, 0);
    if (this.selectedCatalogue) {
      this.collectionTitle = this.truncate(
        this.selectedCatalogue.getCollection().getName(),
        45
      );
      this.catalogueTitle = this.selectedCatalogue.getName();
    }
    this.datacardTitle = this.datacard.getCode();
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