<template>
  <div id="show_catalogue_container">
    <div id="show_catalogue_component_title">
      <p class="is-size-4">{{catalogue.getName()}}</p>
    </div>
    <div id="show_catalogue_component_content">
      <show-catalogue :catalogue="catalogue"></show-catalogue>
    </div>
  </div>
</template>

<script>
import Catalogue from "../models/catalogue.js";
import showCatalogue from "../components/showCatalogue";

export default {
  props: { catalogue: Catalogue },
  components: {
    "show-catalogue": showCatalogue
  }
};
</script>

<style lang="scss">
#show_catalogue_container {
  display: grid;
  grid-template-rows: 10% 10% 80%;
  height: 100%;
}
#show_catalogue_component_title {
  grid-row: 1 / 2;
  justify-self: center;
  align-self: center;
}

#show_catalogue_component_content {
  grid-row: 3 / 4;
  width: 1000px;
  justify-self: center;
}
</style>