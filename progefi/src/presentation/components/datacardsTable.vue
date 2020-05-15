<template>
  <div id="datacards_table_container">
    <div
      id="datacards_table_null_datacards_message"
      v-if="datacards.length === 0 && !loading"
    >
      <p class="is-size-5">{{ datacardsNullMessage }}</p>
    </div>
    <progress
      id="datacards_table_progress"
      class="progress is-accent"
      v-if="loading"
    ></progress>

    <div id="datacards_table_table_container">
      <b-loading
        :is-full-page="false"
        :active.sync="loadingTable"
        :can-cancel="true"
      ></b-loading>
      <b-table
        id="datacards_table_table"
        class="borderless"
        :data="datacards"
        :selected="selectedDatacard"
        hoverable
        v-if="datacards.length > 0"
        :row-class="getRowClass"
        @dblclick="showDatacard"
        @click="setSelected"
        backend-sorting
        default-sort-direction="desc"
        :default-sort="[sortField, sortOrder]"
        @sort="orderTable"
      >
        <template slot-scope="props">
          <b-table-column field label="Imagen" width="20">
            <div class="datacards_table_cells">
              <img
                id="datacards_table_photocollect_thumbnail"
                :src="props.row.getPhotocollectPath()"
              />
            </div>
          </b-table-column>
          <b-table-column field="code" label="Código" width="30" sortable>
            <div class="datacards_table_cells">{{ props.row.code }}</div>
          </b-table-column>
          <b-table-column
            field="creationDate"
            label="Fecha de creación"
            width="20"
            sortable
          >
            <div class="datacards_table_cells">
              {{ getFormattedDate(props.row.creationDate) }}
            </div>
          </b-table-column>
          <b-table-column
            field="scientificName"
            label="Nombre científico"
            width="20"
            sortable
          >
            <div class="datacards_table_cells">
              {{ props.row.collect.specimen.species.scientificName }}
            </div>
          </b-table-column>
          <b-table-column field="project" label="Proyecto" width="20" sortable>
            <div class="datacards_table_cells">
              {{ props.row.collect.project.getName() }}
            </div>
          </b-table-column>
          <b-table-column
            field="collector"
            label="Colector"
            width="20"
            sortable
          >
            <div class="datacards_table_cells">
              {{ props.row.collect.collector.getName() }}
            </div>
          </b-table-column>
          <b-table-column field="curator" label="Curador" width="20">
            <div class="datacards_table_cells">
              {{ props.row.getFormattedCurators() }}
            </div>
          </b-table-column>
          <b-table-column
            field="validated"
            label="Validada"
            width="20"
            centered
            sortable
          >
            <div class="datacards_table_cells">
              <img
                v-if="props.row.isValidated()"
                id="datacards_table_valid_icon"
                :src="require('../assets/valid.png')"
              />
              <img
                v-else
                id="datacards_table_valid_icon"
                :src="require('../assets/invalid.png')"
              />
            </div>
          </b-table-column>
          <b-table-column
            field="catalogue"
            label="Detalles"
            width="50"
            centered
          >
            <div
              class="datacards_table_cells"
              @click="showDatacard(props.row)"
              @mouseleave="setHelpText('', false)"
              @mouseenter="setHelpText(helpTextDetails, true)"
            >
              <!-- <b-tooltip label="aber"> -->
              <img
                id="datacards_table_row_options_icon"
                src="../assets/right.png"
              />
              <!-- </b-tooltip> -->
            </div>
          </b-table-column>
        </template>
      </b-table>
    </div>
    <button
      id="datacards_table_load_button"
      v-if="datacards.length > 0"
      class="button"
      :disabled="disableLoadMoreButton"
      @click="loadMoreDatacards"
    >
      {{ loadMoreButton }}
    </button>
  </div>
</template>

<script>
import moment from "moment";
import Datacard from "../models/datacard";
export default {
  props: [
    "selectedCatalogue",
    "reload",
    "advancedSearchCriteria",
    "simpleSearchCriteria"
  ],
  data() {
    return {
      selectedDatacard: null,
      datacards: [],
      allDatacards: [],
      loading: false,
      loadingTable: false,
      datacardsNullMessage: "Aún no hay fichas en este catálogo...",
      helpTextDetails: "Selecciona para ver la información de la ficha...",
      sortField: "Code",
      sortOrder: "asc",
      loadMoreButton: "Cargar más fichas",
      offset: 0,
      currentLength: 10
    };
  },
  async mounted() {
    if (this.selectedCatalogue) {
      this.datacardsNullMessage = "Aún no hay fichas en este catálogo...";
    } else {
      this.datacardsNullMessage =
        "Aún no hay fichas registradas en el sistema...";
    }
    this.orderTable("code", "asc");
    this.offset = 10;
  },
  watch: {
    reload(newValue) {
      if (newValue) {
        this.orderTable("code", "asc");
        this.reload = false;
      }
    },
    async advancedSearchCriteria(newValue) {
      if (newValue !== null) {
        this.$emit("loading", true);
        Datacard.getFiltered(newValue)
          .then(result => {
            this.datacards = result;
            this.$emit("filteredDatacards", this.datacards);
          })
          .catch(() => {
            this.openDialog("Ha ocurrido un error con la base de datos");
          })
          .finally(() => {
            this.$emit("loading", false);
          });
        if (this.datacards.length === 0) {
          this.datacardsNullMessage = "No se encontraron resultados...";
          this.openToast("No se encontraron resultados...");
          this.$emit("loading", false);
        }
      } else {
        this.datacards = [];
        for (let i = 0; i < this.allDatacards.length; i++) {
          this.datacards.push(this.allDatacards[i]);
        }
        this.$emit("filteredDatacards", []);
      }
    },
    async simpleSearchCriteria(newValue) {
      if (newValue !== null || newValue !== "") {
        this.$emit("loading", true);
        if (this.selectedCatalogue) {
          Datacard.getByCode(this.selectedCatalogue.getId(), newValue)
            .then(result => {
              this.datacards = result;
            })
            .catch(() => {
              this.openDialog("Ha ocurrido un error con la base de datos");
            })
            .finally(() => {
              this.$emit("loading", false);
            });
        } else {
          Datacard.getByCode(null, newValue)
            .then(result => {
              this.datacards = result;
            })
            .catch(() => {
              this.openDialog("Ha ocurrido un error con la base de datos");
            })
            .finally(() => {
              this.$emit("loading", false);
            });
        }
        if (this.datacards.length === 0) {
          this.datacardsNullMessage = "No se encontraron resultados...";
          this.$emit("loading", false);
        }
      } else {
        this.datacards = [];
        for (let i = 0; i < this.allDatacards.length; i++) {
          this.datacards.push(this.allDatacards[i]);
        }
      }
    }
  },
  computed: {
    disableLoadMoreButton: function() {
      if (this.datacards.length >= this.offset) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    async orderTable(field, order) {
      let offset = 0;
      this.datacards = await this.getSortedDatacards(field, order, offset);
      for (let i = 0; i < this.datacards.length; i++) {
        this.allDatacards.push(this.datacards[i]);
      }
    },
    getSortedDatacards(field, order, offset) {
      return new Promise((resolve, reject) => {
        this.sortField = field;
        this.sortOrder = order;
        this.loadingTable = true;
        if (this.selectedCatalogue) {
          Datacard.getSorted(
            this.selectedCatalogue.getId(),
            field,
            order,
            this.currentLength,
            offset
          )
            .then(result => {
              this.loadingTable = false;
              resolve(result);
            })
            .catch(() => {
              this.openDialog("Ha ocurrido un error con la base de datos");
              this.loadingTable = false;
              reject();
            });
        } else {
          Datacard.getSorted(null, field, order, this.currentLength, offset)
            .then(result => {
              this.loadingTable = false;
              resolve(result);
            })
            .catch(() => {
              this.openDialog("Ha ocurrido un error con la base de datos");
              this.loadingTable = false;
              reject();
            });
        }
      });
    },
    showDatacard(selectedDatacard) {
      this.$emit("showDatacard", selectedDatacard);
      this.setHelpText("", false);
    },
    async loadMoreDatacards() {
      let newDatacards = [];
      newDatacards = await this.getSortedDatacards(
        this.sortField,
        this.sortOrder,
        this.offset
      );
      await this.datacards.push(newDatacards[0]);
      this.offset += 10;
      this.currentLength = this.datacards.length;
    },
    setSelected(selectedDatacard) {
      this.selectedDatacard = selectedDatacard;
    },
    openDialog(message) {
      this.$buefy.dialog.alert(message);
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
    setHelpText(message, active) {
      this.$store.dispatch("helpText/setActive", { active, message });
    },
    openToast(message) {
      this.$buefy.toast.open(message);
    },
    // Usado para obtener la clase css de la fila que invoca al método
    getRowClass(row) {
      if (this.selectedDatacard != null) {
        if (this.selectedDatacard.getCode() === row.getCode()) {
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
  margin-bottom: 50px;
}

#datacards_table_load_button {
  margin: auto;
  width: 800px;
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

#datacards_table_photocollect_thumbnail {
  height: 50px;
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
