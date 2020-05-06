<template>
  <div id="show_collection_container">
    <div id="show_collection_null_message" v-if="thereIsNoCollection">
      <p class="is-size-5">{{collectionNullMessage}}</p>
    </div>

    <p class="title">{{title}}</p>

    <div class="gray_box show_collection_content">
      <div class="show_collection_attribute_div_title">
        <p class="attribute_name">{{collectionNameTitle}}</p>
      </div>
      <p class="attribute_value">{{ collection.getName() }}</p>
    </div>

    <div class="gray_box show_collection_content">
      <div class="show_collection_attribute_div_title">
        <p class="attribute_name">{{instituteNameTitle}}</p>
      </div>
      <p class="attribute_value">{{ collection.getInstituteName() }}</p>
    </div>

    <div class="gray_box show_collection_content">
      <div class="show_collection_attribute_div_title">
        <p class="attribute_name">{{acronymTitle}}</p>
      </div>
      <p class="attribute_value">{{ collection.getResearchAreaAcronym() }}</p>
    </div>

    <div class="gray_box show_collection_content">
      <div class="show_collection_attribute_div_title">
        <p class="attribute_name">{{areaTitle}}</p>
      </div>
      <p class="attribute_value">{{ collection.getResearchArea() }}</p>
    </div>

    <div class="gray_box show_collection_content">
      <div class="show_collection_attribute_div_title">
        <p class="attribute_name">{{instituteLogoTitle}}</p>
      </div>
      <img
        id="show_collection_institute_logo"
        :src="collection.getInstituteLogoPath()"
      />
    </div>

    <div class="gray_box show_collection_content">
      <div class="show_collection_attribute_div_title">
        <p class="attribute_name">{{catalogueNumberTitle}}</p>
        <p class="attribute_value">{{ collection.getCataloguesNumber() }}</p>
      </div>
    </div>

    <div class="gray_box show_collection_content">
      <div class="show_collection_attribute_div_title">
        <p class="attribute_name">{{descriptionTitle}}</p>
      </div>
      <p class="attribute_value">{{ collection.getDescription() }}</p>
    </div>

    <div class="gray_box show_collection_content">
      <div class="show_collection_attribute_div_title">
        <p class="attribute_name">{{destinationDirectoryTitle}}</p>
      </div>
      <p class="attribute_value">{{ collection.getCataloguesFolderPath() }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["collection", "thereIsNoCollection"],
  data() {
    return {
      title: "DATOS DE LA COLECCIÓN:",
      collectionNullMessage: "Debes crear una colección para utilizar el sistema...",
      collectionNameTitle: "Nombre: ",
      instituteNameTitle: "Instituto:",
      acronymTitle: "Nombre:",
      areaTitle: "Área:",
      instituteLogoTitle: "Logo de la institución:",
      catalogueNumberTitle: "Número de catálogos:",
      descriptionTitle: "Descripción: ",
      destinationDirectoryTitle: "Carpeta destino (archivo csv):"
    };
  }
};
</script>

<style lang="scss">
  @import "../style/style.scss";
#show_collection_container {
  /*height: 600px;*/
  display: flex;
  align-self: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 50px;
}

#show_collection_null_message {
  text-align: center;
  margin-bottom: 50px;
  background-color: $accent;
}

.show_collection_content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10px;
  //   width: 2000px;
}

.show_collection_info_attributes_div {
  flex-direction: column;
}

.show_collection_attribute_div_title {
  display: flex;
  align-items: center;
}

#show_collection_institute_logo {
  /*height: 100px;*/
  width: 200px;
}
</style>
