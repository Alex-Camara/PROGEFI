<template>
  <div id="catalogues_table_container">
    <div
      id="catalogues_table_null_catalogues_message"
      v-if="catalogues.length === 0"
    >
      <p class="is-size-5">{{ nullCataloguesMessage }}</p>
    </div>
    <div id="catalogues_table_table_container">
      <b-table
        class="borderless"
        id="catalogues_table_table"
        :data="catalogues"
        :selected="selectedCatalogue"
        :loading="loading"
        hoverable
        :row-class="getRowClass"
        @click="setSelected($event)"
        @dblclick="showDatacards($event)"
      >
        <template slot-scope="props">
          <b-table-column
            field="name"
            label="Nombre"
            width="20"
            centered
            class="selected"
          >
            <div>
              <p id="catalogues_table_table_catalogue_name">
                {{ props.row.getName() }}
              </p>
            </div>
          </b-table-column>
          <b-table-column field="code" label="Código" width="20" centered>
            <div>
              <p id="catalogues_table_table_catalogue_code">
                {{ props.row.getCollection().getCode() + props.row.getCode() }}
              </p>
            </div>
          </b-table-column>
          <b-table-column
            field="colection"
            label="Colección"
            width="20"
            centered
          >
            <div>
              <p id="catalogues_table_table_catalogue_collection">
                {{ props.row.getCollection().getName() }}
              </p>
            </div>
          </b-table-column>
          <b-table-column
            field="datacardCount"
            label="N° de fichas"
            width="200"
            centered
          >
            <div id="catalogues_table_table_datacard_count">
              <p>{{ props.row.getDatacardCount() }}</p>
            </div>
          </b-table-column>
          <b-table-column field="datacards" label="Fichas" width="50" centered>
            <div
              id="catalogues_table_row_options"
              @click="showDatacards(props.row)"
            >
              <!-- <b-tooltip label="aber"> -->
              <img
                id="catalogues_table_row_options_icon"
                src="../assets/image.png"
              />
              <!-- </b-tooltip> -->
            </div>
          </b-table-column>
          <b-table-column
            field="catalogue"
            label="Detalles"
            width="50"
            centered
          >
            <div
              id="catalogues_table_row_options"
              @click="showCatalogue(props.row)"
            >
              <img
                id="catalogues_table_row_options_icon"
                src="../assets/right.png"
              />
            </div>
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import Catalogue from "../models/catalogue";
export default {
  props: ["selectedCollection"],
  data() {
    return {
      selectedCatalogue: null,
      loading: false,
      catalogues: [],
      nullCataloguesMessage: "Aún no hay catálogos en esta colección..."
    };
  },
  async mounted() {
    Catalogue.getAll()
      .then(result => {
        this.catalogues = result;
      })
      .catch(() => {
        this.openDialog("Ha ocurrido un error con la base de datos");
      });
  },
  filters: {
    truncate(value, length) {
      return value.length > length ? value.substr(0, length) + "..." : value;
    }
  },
  methods: {
    setSelected(selectedCatalogue) {
      this.selectedCatalogue = selectedCatalogue;
    },
    showDatacards(selectedCatalogue) {
      this.$emit("showDatacards", selectedCatalogue);
    },
    showCatalogue(selectedCatalogue) {
      this.$emit("showCatalogue", selectedCatalogue);
    },
    openDialog(message) {
      this.$buefy.dialog.alert(message);
    },
    // Usado para obtener la clase css de la fila que invoca al método
    getRowClass(row, index) {
      // debugger;
      if (this.selectedCatalogue != null) {
        if (this.selectedCatalogue.getId() === row.getId()) {
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
@import "../style/style.scss";
#catalogues_table_container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 50px;
}
#catalogues_table_null_catalogues_message {
  text-align: center;
}
#catalogues_table_table_container {
  display: flex;
  justify-content: center;
}

#catalogues_table_table{
  margin:auto;
  justify-content: center;
  width: 80%;
}

#catalogues_table_table_catalogue_name {
  font-weight: bolder;
  text-transform: uppercase;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
}
#catalogues_table_table_catalogue_code {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 80px;
}
#catalogues_table_table_catalogue_collection {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 80px;
}
#catalogues_table_table_datacard_count {
  font-weight: bold;
  font-size: 38px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  height: 80px;
  width: 200px;
}
#catalogues_table_row_options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  margin: auto;
  width: 50px;
}

#catalogues_table_row_options_icon {
  height: 30px;
  width: 30px;
  // filter: invert(0.2);
  // background-color: black;
  transition: 0.2s;
}
#catalogues_table_row_options_icon:hover {
  height: 35px;
  width: 35px;
  // background-color: white;
  filter: invert(1);
  transition: 0.2s;
}
</style>
