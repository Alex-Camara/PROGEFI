<template>
  <!-- --------showDataCards Component----- -->
  <div id="show_datacards_content_container">
    <!-- --------showDataCards Component Header----- -->
    <div id="show_datacards_component_title">
      <p class="is-size-4">Fichas de fotocolecta</p>
    </div>

    <!-- --------showDataCards Component Top Controls----- -->
    <div id="show_datacards_component_top_controls">
      <search-datacards @searchDatacards="searchDatacards($event)"></search-datacards>
    </div>

    <!-- --------showDataCards Component Content----- -->
    <div id="show_datacards_component_content">
      <a href="#" class="float" v-on:click="createDataCard">
        <b-icon class="my-float" icon="plus" size="is-medium"></b-icon>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import searchDatacards from "../components/searchDatacards.vue";
export default {
  name: "UIShowDataCards",
  components: {
    "search-datacards": searchDatacards
  },
  data() {
    return {
      searchString: null
    };
  },
  mounted() {
    if (this.catalogueState.selectedCatalogue == null) {
      console.log("no se ha seleccionado ningún catálogo");
      
    }
  },
  computed: {
    ...mapState("catalogue", {
      catalogueState: state => state
    })
  },
  methods: {
    createDataCard() {
      this.$router.push({ name: "UICreateDataCard" });
    },
    searchDatacards(searchString) {
      console.log("EL TEXTO ES: " + searchString);
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";

#show_datacards_content_container {
  display: grid;
  grid-template-rows: 10% 10% 5% 75%;
  height: 100%;
}

#show_datacards_component_title {
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
  grid-row: 4 / 5;
  margin-top: 10px;
}

.float {
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
}

.my-float {
  margin-top: 15px;
}
</style>
