<template>
  <div id="show_collection_container">
    <div id="show_collection_null_message" v-if="collection.length === 0">
      <p class="is-size-5">Aún no tienes colecciones...</p>
    </div>

    <p class="title">DATOS DE LA COLECCIÓN:</p>
    <div id="show_collection_content" class="gray_box">

      <div class="show_datacard_info_attributes_div">
        <p class="attribute_name">Nombre:</p>
        <p class="attribute_value">{{ collection.getName() }}</p>
      </div>

      <span class="show_collection_space"></span>

      <div class="show_datacard_info_attributes_div">
        <p class="attribute_name">Instituto:</p>
        <p class="attribute_value">{{ collection.getInstituteName() }}</p>
      </div>

      <span class="show_collection_space"></span>

      <div class="show_datacard_info_attributes_div">
        <p class="attribute_name">Acrónimo:</p>
        <p class="attribute_value">{{ collection.getAcronym() }}</p>
      </div>

      <span class="show_collection_space"></span>

      <div class="show_datacard_info_attributes_div">
        <p class="attribute_name">Área:</p>
        <p class="attribute_value">{{ collection.getResearchArea() }}</p>
      </div>

      <span class="show_collection_space"></span>

      <div class="show_datacard_info_attributes_div show_collection_info_attributes_div">
        <p class="attribute_name">Logo de la institución:</p>
        <img id="show_collection_institute_logo" :src="collection.getInstituteLogoPath()" />
      </div>

      <span class="show_collection_space"></span>

      <div class="show_datacard_info_attributes_div">
        <p class="attribute_name">Número de catálogos:</p>
        <p class="attribute_value">{{ collection.getCataloguesNumber() }}</p>
      </div>


      <span class="show_collection_space"></span>

      <div class="show_datacard_info_attributes_div">
        <p class="attribute_name">Descripción:</p>
        <p class="attribute_value">{{ collection.getDescription() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Collection from "../models/collection";
export default {
  data() {
    return {
      collection: new Collection(),
      loading: false
    };
  },
  async mounted() {
    this.collection = await Collection.getAll();
  },
  methods: {
    showCatalogues(collection) {
      this.$router.push({
        name: "UIShowCatalogues",
        params: { selectedCollection: collection }
      });
    }
  }
};
</script>

<style lang="scss">
#show_collection_container {
  height: 600px;
  display: flex;
  align-self: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-left: 100px;
  margin-right: 100px;
}

#show_collection_null_message {
  text-align: center;
}

#show_collection_content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  //   width: 2000px;
}
.show_collection_space {
  height: 20px;
}

.show_collection_info_attributes_div{
  flex-direction: column;
}

#show_collection_institute_logo {
  /*height: 100px;*/
  width: 200px;
}
</style>
