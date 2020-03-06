<template>
  <div id="show_collections_component">
    <div id="show_collections_component_title">
      <p class="is-size-4">Colecciones</p>
    </div>

    <div id="show_collections_component_content">
      <collections-table></collections-table>
      
      <div class="float_button" v-on:click="createCollection()">
        <img class="float_button_icon" :src="require('../assets/plus.png')" />
      </div>
    </div>
  </div>
</template>

<script>
import collectionsTable from "../components/collectionsTable.vue";
export default {
  components: {
    "collections-table": collectionsTable
  },
  methods: {
    createCollection() {},
    showCatalogues(collection){

    }
  }
};
</script>

<style lang="scss">
#show_collections_component {
  display: grid;
  grid-template-rows: 10% 90%;
  height: 100%;
}
#show_collections_component_title {
  grid-row: 1 / 2;
  justify-self: center;
  align-self: center;
}
#show_collections_component_content {
  grid-row: 2 / 3;
  margin-top: 20px;
}
</style>