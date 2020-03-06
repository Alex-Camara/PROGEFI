<template>
  <div id="datacards_table_container" v-observe-visibility="visibilityChanged">
    <div id="datacards_table_null_datacards_message" v-if="!areThereDatacards">
      <p class="is-size-5">Aún no hay fichas en este catálogo...</p>
    </div>
    <progress id="datacards_table_progress" class="progress is-accent" v-if="loading"></progress>
    <div id="datacards_table_table_container">
      <b-table
        id="datacards_table_table"
        class="borderless"
        :data="datacardState.datacards"
        :selected="selectedDatacard"
        :loading="loading"
        hoverable
        v-if="datacardState.datacards.length > 0"
        :row-class="getRowClass"
        @dblclick="showDatacard($event)"
        @click="setSelected($event)"
      >
        <template slot-scope="props">
          <b-table-column field label="Imagen" width="10">
            <div class="datacards_table_cells">
              <img :src="getBase64Image(props.row.thumbnail)" />
            </div>
          </b-table-column>
          <b-table-column field="code" label="Código" width="20">
            <div class="datacards_table_cells">{{ props.row.code }}</div>
          </b-table-column>
          <b-table-column field="creationDate" label="Fecha de creación" width="20">
            <div class="datacards_table_cells">{{ getFormattedDate(props.row.creationDate) }}</div>
          </b-table-column>
          <b-table-column field="scientificName" label="Nombre científico" width="20">
            <div class="datacards_table_cells">{{ props.row.scientificName }}</div>
          </b-table-column>
          <b-table-column field="project" label="Proyecto" width="20">
            <div class="datacards_table_cells">{{ props.row.project.getName() }}</div>
          </b-table-column>
          <b-table-column field="collector" label="Colector" width="20">
            <div class="datacards_table_cells">{{ props.row.collector.getName() }}</div>
          </b-table-column>
          <b-table-column field="curator" label="Curador" width="20">
            <div
              class="datacards_table_cells"
              v-for="curator in props.row.curators"
              :key="curator.getId()"
            >{{curator.getName()}}</div>
          </b-table-column>
          <b-table-column field="validated" label="Validada" width="20" centered>
            <div class="datacards_table_cells">
              <img
                v-if="props.row.isValidated()"
                id="datacards_table_valid_icon"
                :src="require('../assets/valid.png')"
              />
              <img v-else id="datacards_table_valid_icon" :src="require('../assets/invalid.png')" />
            </div>
          </b-table-column>
          <b-table-column field="catalogue" label="Detalles" width="50" centered>
            <div class="datacards_table_cells" @click="showDatacard(props.row)">
              <!-- <b-tooltip label="aber"> -->
              <img id="datacards_table_row_options_icon" src="../assets/right.png" />
              <!-- </b-tooltip> -->
            </div>
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  props: ["selectedCatalogue"],
  data() {
    return {
      areThereDatacards: true,
      selectedDatacard: null,
      loading: false
    };
  },
  async mounted() {
    // this.loading = true;
    // debugger;
    // if (this.selectedCatalogue != null) {
    // this.areThereDatacards = this.getDatacards(
    // this.selectedCatalogue.getId()
    // );
    // this.loading = false;
    // } else {
    // this.areThereDatacards = this.getDatacards(null);
    // this.loading = false;
    // }
    // this.loading = false;
    this.getDatacards();
  },
  computed: {
    ...mapState("datacard", {
      datacardState: state => state
    })
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      // if (this.reloadDatacards) {
      // this.loading = true;
      // if (this.selectedCatalogue != null) {
      // this.areThereDatacards = this.getDatacards(
      // this.selectedCatalogue.getId()
      // );
      // this.loading = false;
      // } else {
      // this.areThereDatacards = this.getDatacards(null);
      // this.loading = false;
      // }
      this.getDatacards();

      this.isVisible = isVisible;
    },
    async getDatacards() {
      this.loading = true;
      if (this.selectedCatalogue != null) {
        this.areThereDatacards = await this.$store.dispatch(
          "datacard/getDatacards",
          this.selectedCatalogue.getId()
        );
        this.loading = false;
      } else {
        this.areThereDatacards = await this.$store.dispatch(
          "datacard/getDatacards",
          null
        );
        this.loading = false;
      }
    },
    showDatacard(selectedDatacard) {
      this.$emit("showDatacard", selectedDatacard);
    },
    setSelected(selectedDatacard) {
      this.selectedDatacard = selectedDatacard;
    },
    getBase64Image(arrayBuffer) {
      var base64 = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return "data:image/png;base64," + base64;
    },
    getFormattedDate(date) {
      return moment(date).format("DD/MM/YYYY HH:mm");
    },
    // Usado para obtener la clase css de la fila que invoca al método
    getRowClass(row, index) {
      if (this.selectedDatacard != null) {
        if (this.selectedDatacard.getCode() == row.getCode()) {
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
#datacards_table_progress {
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  margin: auto;
  margin-top: 200px;
  width: 800px;
}
#datacards_table_container {
  display: flex;
  justify-content: center;
  // align-self: center;
  flex-direction: column;
}

#datacards_table_null_datacards_message {
  text-align: center;
  // justify-self: center;
}

#datacards_table_table_container {
  display: flex;
  justify-content: center;
}

#datacards_table_table {
  width: 1000px;
  font-size: 13px;
  justify-content: center;
  align-content: center;
  text-align: center;
}

#datacards_table_valid_icon {
  height: 30px;
  width: 30px;
  align-self: center;
}

.datacards_table_cells {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;
  text-align: center;
  margin: auto;
}

#datacards_table_validated {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40px;
}

#datacards_table_row_options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40px;
  margin: auto;
  // width: 50px;
}

#datacards_table_row_options_icon {
  height: 30px;
  width: 30px;
  transition: 0.2s;
  align-self: center;
}

#datacards_table_row_options_icon:hover {
  height: 35px;
  width: 35px;
  filter: invert(1);
  transition: 0.2s;
}
</style>