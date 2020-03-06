<template>
  <div id="collections_table_container">
    <div
      id="collections_table_null_catalogues_message"
      v-if="collectionState.collections.length == 0"
    >
      <p class="is-size-5">Aún no tienes colecciones...</p>
    </div>
    <div id="collections_table_table_container">
      <b-table
        class="borderless"
        id="collections_table_table"
        :data="collectionState.collections"
        :selected="selectedCollection"
        :loading="loading"
        hoverable
        :row-class="getRowClass"
        @click="setSelected($event)"
        @dblclick="showCatalogues($event)"
      >
        <template slot-scope="props">
          <b-table-column field="logo" width="50" centered>
            <div id="collections_table_collection_logo">
              <img id="collections_table_collection_logo_image" :src="props.row.getImagePath()" />
            </div>
          </b-table-column>
          <b-table-column field="name" width="20" centered>
            <div>
              <p id="collections_table_table_collection_name">{{ props.row.getName() }}</p>
            </div>
          </b-table-column>
          <b-table-column field="researchArea" width="20" centered>
            <div>
              <p id="collections_table_table_collection_research">{{ props.row.getResearchArea() }}</p>
            </div>
          </b-table-column>
          <b-table-column field="institute" width="20" centered>
            <div>
              <p
                id="collections_table_table_collection_institute"
              >{{ props.row.getInstituteName() }}</p>
            </div>
          </b-table-column>
          <b-table-column field="options" width="20" centered>
            <div id="collections_table_row_options">
              <b-tooltip label="Cátalogos">
                <img
                  id="collections_table_row_options_icon"
                  src="../assets/catalog.png"
                  @click="showCatalogues(props.row)"
                />
              </b-tooltip>
              <b-tooltip label="Detalles">
                <img id="collections_table_row_options_icon" src="../assets/right.png" />
              </b-tooltip>
            </div>
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      selectedCollection: null,
      loading: false
    };
  },
  async mounted() {
    await this.$store.dispatch("collection/getCollections");
  },
  computed: {
    ...mapState("collection", {
      collectionState: state => state
    })
  },
  methods: {
    showCatalogues(collection) {
      this.$router.push({
        name: "UIShowCatalogues",
        params: { selectedCollection: collection }
      });
    },
    setSelected(selectedCollection) {
      this.selectedCollection = selectedCollection;
    },
    // Usado para obtener la clase css de la fila que invoca al método
    getRowClass(row, index) {
      // debugger;
      if (this.selectedCollection != null) {
        if (this.selectedCollection.getId() == row.getId()) {
          return "selected";
        }
        return "not-selected";
      }
      return "not-selected";
    }
  }
};
</script>

<style lang="scss">
#collections_table_container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

#collections_table_null_catalogues_message {
  text-align: center;
}

#collections_table_table_container {
  display: flex;
  justify-content: center;
  //   width: 2000px;
}

#collections_table_collection_logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 160px;
  width: 160px;
}

#collections_table_table_collection_name {
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 160px;
  word-wrap: break-word;
  width: 400px;
}

#collections_table_table_collection_research {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 160px;
  width: 200px;
}

#collections_table_table_collection_institute {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 160px;
  margin-left: 20px;
  width: 200px;
}

#collections_table_row_options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 160px;
  width: 40px;
}

#collections_table_row_options_icon {
  margin-top: 20px;
  margin-bottom: 20px;
  height: 30px;
  width: 30px;
  // filter: invert(0.2);
  // background-color: black;
  transition: 0.2s;
}
#collections_table_row_options_icon:hover {
  height: 35px;
  width: 35px;
  // background-color: white;
  filter: invert(1);
  transition: 0.2s;
}
</style>