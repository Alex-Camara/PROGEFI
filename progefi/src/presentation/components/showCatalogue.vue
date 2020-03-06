<template>
  <div id="show_catalogue_container">
    <div id="show_catalogue_content" class="gray_box">
      <p class="title">INFORMACIÓN:</p>

      <div class="show_catalogue_attributes_div">
        <p class="attribute_name">Código:</p>
        <p class="attribute_value">{{catalogue.getCode()}}</p>
      </div>

      <div class="show_catalogue_attributes_div">
        <p class="attribute_name">Nombre:</p>
        <p class="attribute_value">{{catalogue.getName()}}</p>
      </div>

      <div class="show_catalogue_attributes_div">
        <p class="attribute_name">Descripción:</p>
        <p class="attribute_value">{{catalogue.getDescription()}}</p>
      </div>

      <div class="show_catalogue_attributes_div">
        <p class="attribute_name">Colección:</p>
        <p class="attribute_value">{{catalogue.getCollection().getName()}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["catalogue"]
};
</script>

<style lang="scss">
#show_catalogue_container {
  justify-content: center;
}
#show_catalogue_content {
  display: flex;
  flex-direction: column;
  height: 500px;
}
#show_catalogue_attributes_div {
  display: flex;
}
</style>