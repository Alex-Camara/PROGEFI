<template>
  <div
    id="advanced_search_container"
    ref="advanced_search_container"
    class="gray_box container_flex_column hidden_container"
  >
    <div class="container_flex">
      <div class="container_flex_column">
        <label
          for="advanced_search_catalogue_select"
          class="advanced_search_titles"
          >{{ catalogueLabel }}</label
        >
        <div class="select is-small">
          <select
            id="advanced_search_catalogue_select"
            class="advanced_search_select_width"
            placeholder="Selecciona un catálogo"
            v-model="selectedCatalogue"
          >
            <option
              v-for="catalogue in catalogues"
              :key="catalogue.getId()"
              :value="catalogue.getId()"
              >{{ catalogue.getName() }}</option
            >
          </select>
        </div>
      </div>
      <div class="space"></div>
      <div class="container_flex_column">
        <label
          for="advanced_search_project_select"
          class="advanced_search_titles"
          >{{ projectLabel }}</label
        >
        <div class="select is-small">
          <select
            id="advanced_search_project_select"
            class="advanced_search_select_width"
            placeholder="Selecciona un proyecto"
            v-model="selectedProject"
          >
            <option
              v-for="project in projects"
              :key="project.getName()"
              :value="project.getId()"
              >{{ project.getName() }}</option
            >
          </select>
        </div>
      </div>
    </div>

    <div class="vertical_space"></div>

    <div class="container_flex">
      <div class="container_flex_column">
        <label
          for="advanced_search_project_select"
          class="advanced_search_titles"
          >{{ curatorLabel }}</label
        >
        <div class="select is-small">
          <select
            id="advanced_search_curator_select"
            class="advanced_search_select_width"
            placeholder="Selecciona un curador"
            v-model="selectedCurator"
          >
            <option
              v-for="curator in curators"
              :key="curator.getName()"
              :value="curator.getId()"
              >{{ curator.getName() }}</option
            >
          </select>
        </div>
      </div>
      <div class="space"></div>
      <div class="container_flex_column">
        <label
          for="advanced_search_project_select"
          class="advanced_search_titles"
          >{{ collectorLabel }}</label
        >
        <div class="select is-small">
          <select
            id="advanced_search_collector_select"
            class="advanced_search_select_width"
            placeholder="Selecciona un colector"
            v-model="selectedCollector"
          >
            <option
              v-for="collector in collectors"
              :key="collector.getName()"
              :value="collector.getId()"
              >{{ collector.getName() }}</option
            >
          </select>
        </div>
      </div>
    </div>

    <div>
      <hr class="divider" />
    </div>

    <div class="container_flex">
      <div class="container_flex_column">
        <label
          for="advanced_search_creation_dates"
          class="advanced_search_titles"
          >{{ creationDatesLabel }}</label
        >
        <b-datepicker
          id="advanced_search_creation_dates"
          class="advanced_search_dates"
          placeholder="Selecciona un rango de fechas..."
          v-model="creationDates"
          size="is-small"
          range
        >
        </b-datepicker>
      </div>

      <div class="space"></div>

      <div class="container_flex_column">
        <label
          for="advanced_search_collect_dates"
          class="advanced_search_titles"
          >{{ collectDatesLabel }}</label
        >
        <b-datepicker
          id="advanced_search_collect_dates"
          class="advanced_search_dates"
          placeholder="Selecciona un rango de fechas..."
          v-model="collectDates"
          size="is-small"
          range
        >
        </b-datepicker>
      </div>
    </div>

    <div>
      <hr class="divider" />
    </div>

    <div class="container_flex">
      <div class="container_flex_column">
        <label
          for="advanced_search_country_input"
          class="advanced_search_titles"
          >{{ countryLabel }}</label
        >
        <input
          id="advanced_search_country_input"
          class="input is-small"
          v-model="selectedCountry"
        />
      </div>

      <div class="space"></div>

      <div class="container_flex_column">
        <label
          for="advanced_search_country_state_input"
          class="advanced_search_titles"
          >{{ countryStateLabel }}</label
        >
        <input
          id="advanced_search_country_state_input"
          class="input is-small"
          v-model="selectedCountryState"
        />
      </div>

      <div class="space"></div>

      <div class="container_flex_column">
        <label
          for="advanced_search_municipality_input"
          class="advanced_search_titles"
          >{{ municipalityLabel }}</label
        >
        <input
          id="advanced_search_municipality_input"
          class="input is-small"
          v-model="selectedMunicipality"
        />
      </div>

      <div class="space"></div>

      <div class="container_flex_column">
        <label
          for="advanced_search_locality_input"
          class="advanced_search_titles"
          >{{ localityLabel }}</label
        >
        <input
          id="advanced_search_locality_input"
          class="input is-small"
          v-model="selectedLocality"
        />
      </div>
    </div>

    <div class="vertical_space"></div>

    <div class="container_flex">
      <div class="container_flex_column">
        <label
          for="advanced_search_climate_input"
          class="advanced_search_titles"
          >{{ climateLabel }}</label
        >
        <input
          id="advanced_search_climate_input"
          class="input is-small"
          v-model="selectedClimateType"
        />
      </div>

      <div class="space"></div>

      <div class="container_flex_column">
        <label
          for="advanced_search_vegetation_input"
          class="advanced_search_titles"
          >{{ vegetationLabel }}</label
        >
        <input
          id="advanced_search_vegetation_input"
          class="input is-small"
          v-model="selectedVegetationType"
        />
      </div>
    </div>

    <div>
      <hr class="divider" />
    </div>

    <div class="container_flex">
      <div class="container_flex_column">
        <label
          for="advanced_search_species_input"
          class="advanced_search_titles"
          >{{ speciesLabel }}</label
        >
        <input
          id="advanced_search_species_input"
          class="input is-small"
          v-model="selectedScientificName"
        />
      </div>
    </div>

    <div>
      <hr class="divider" />
    </div>

    <div class="container_flex">
      <button
        id="advanced_search_search_button"
        class="button is-accent"
        @click="cleanFields"
        :disabled="!isAtLeastOneFieldFull"
      >
        {{ cleanFieldsText }}
      </button>
      <div class="space"></div>
      <button
        id="advanced_search_clean_filters_button"
        class="button is-secondary"
        :disabled="!isAtLeastOneFieldFull"
        @click="search"
      >
        {{ searchText }}
      </button>
      <div id="advanced_search_export_button_div">
        <!--        <button class="button is-secondary" :disabled="disableExportButton">-->
        <!--          {{ exportResultsText }}-->
        <!--        </button>-->
        <export-button
          id="advanced_search_export_button"
          :datacards="validFilteredDatacards"
          :disabled="disableExportButton"
        ></export-button>
      </div>
    </div>
  </div>
</template>

<script>
import Catalogue from "../models/catalogue";
import Project from "../models/project";
import Curator from "../models/curator";
import Collector from "../models/collector";
import Datacard from "../models/datacard";
import exportButton from "./exportButton";

export default {
  name: "advancedSearch",
  props: ["catalogue", "filteredDatacards", "show"],
  components: { "export-button": exportButton },
  data() {
    return {
      datacard: new Datacard(),
      catalogues: [],
      projects: [],
      curators: [],
      collectors: [],
      creationDates: null,
      collectDates: null,
      title: "Búsqueda avanzada",
      catalogueLabel: "Catálogo: ",
      collectorLabel: "Colector: ",
      curatorLabel: "Curador:",
      projectLabel: "Proyecto: ",
      creationDatesLabel: "Rango de fechas (Fecha de creación): ",
      collectDatesLabel: "Rango de fechas (Fecha de colecta): ",
      countryLabel: "País: ",
      countryStateLabel: "Estado: ",
      municipalityLabel: "Municipio: ",
      localityLabel: "Localidad: ",
      climateLabel: "Tipo de clima: ",
      vegetationLabel: "Tipo de vegetación: ",
      speciesLabel: "Nombre científico: ",
      cleanFieldsText: "Limpiar campos",
      searchText: "Buscar",
      exportResultsText: "Exportar resultados",
      disableExportButton: true,
      validFilteredDatacards: []
    };
  },
  async mounted() {
    this.catalogues = await Catalogue.getAll();
    this.projects = await Project.getAll();
    this.curators = await Curator.getAll();
    this.collectors = await Collector.getAll();
    if (this.catalogue) {
      for (let i = 0; i < this.catalogues.length; i++) {
        if (this.catalogue.getId() === this.catalogues[i].getId()) {
          this.selectedCatalogue = this.catalogues[i].getId();
        }
      }
    }
  },
  watch: {
    filteredDatacards(newValue) {
      if (newValue.length > 0) {
        this.validFilteredDatacards = [];
        for (let i = 0; i < newValue.length; i++) {
          if (newValue[i].isValidated()) {
            this.validFilteredDatacards.push(newValue[i]);
          }
        }
        this.disableExportButton = this.validFilteredDatacards.length <= 0;
      } else {
        this.disableExportButton = true;
      }
    },
    show(newValue) {
      let element = this.$refs.advanced_search_container;
      if (element !== null) {
        if (newValue) {
          element.classList.remove("hidden_container");
        } else {
          this.cleanFields();
          element.classList.add("hidden_container");
        }
      }
    }
  },
  computed: {
    isAtLeastOneFieldFull: function() {
      return (
        this.selectedClimateType !== "" ||
        this.selectedCollector !== null ||
        this.selectedCatalogue !== null ||
        this.selectedProject !== null ||
        this.selectedCurator !== null ||
        this.creationDates !== null ||
        this.collectDates !== null ||
        this.selectedCountry !== null ||
        this.selectedCountryState !== null ||
        this.selectedMunicipality !== null ||
        this.selectedLocality !== null ||
        this.selectedVegetationType !== "" ||
        this.selectedScientificName !== null
      );
    },
    selectedCatalogue: {
      get: function() {
        return this.datacard.getCatalogue().getId();
      },
      set: async function(newValue) {
        await this.datacard.getCatalogue().setId(newValue);
      }
    },
    selectedProject: {
      get: function() {
        return this.datacard
          .getCollect()
          .getProject()
          .getId();
      },
      set: async function(newValue) {
        await this.datacard
          .getCollect()
          .getProject()
          .setId(newValue);
      }
    },
    selectedCollector: {
      get: function() {
        return this.datacard
          .getCollect()
          .getCollector()
          .getId();
      },
      set: async function(newValue) {
        await this.datacard
          .getCollect()
          .getCollector()
          .setId(newValue);
      }
    },
    selectedCurator: {
      get: function() {
        return this.datacard
        .getCurator()
        .getId()
      },
      set: async function(newValue) {
        await this.datacard.getCurator().setId(newValue);
      }
    },
    selectedClimateType: {
      get: function() {
        return this.datacard
          .getCollect()
          .getClimateType()
          .getCode();
      },
      set: async function(newValue) {
        await this.datacard
          .getCollect()
          .getClimateType()
          .setCode(newValue);
      }
    },
    selectedVegetationType: {
      get: function() {
        return this.datacard
          .getCollect()
          .getVegetationType()
          .getName();
      },
      set: async function(newValue) {
        await this.datacard
          .getCollect()
          .getVegetationType()
          .setName(newValue);
      }
    },
    selectedCountry: {
      get: function() {
        return this.datacard.getCollect().getCountry();
      },
      set: async function(newValue) {
        await this.datacard.getCollect().setCountry(newValue);
      }
    },
    selectedCountryState: {
      get: function() {
        return this.datacard.getCollect().getCountryState();
      },
      set: async function(newValue) {
        await this.datacard.getCollect().setCountryState(newValue);
      }
    },
    selectedMunicipality: {
      get: function() {
        return this.datacard.getCollect().getMunicipality();
      },
      set: async function(newValue) {
        await this.datacard.getCollect().setMunicipality(newValue);
      }
    },
    selectedLocality: {
      get: function() {
        return this.datacard.getCollect().getLocality();
      },
      set: async function(newValue) {
        await this.datacard.getCollect().setLocality(newValue);
      }
    },
    selectedScientificName: {
      get: function() {
        return this.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .getScientificName();
      },
      set: async function(newValue) {
        await this.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .setScientificName(newValue);
      }
    }
  },
  methods: {
    search() {
      this.$emit("search", {
        datacard: this.datacard,
        collectDates: this.collectDates,
        creationDates: this.creationDates
      });
    },
    cleanFields() {
      this.creationDates = null;
      this.collectDates = null;
      this.datacard = new Datacard();
      this.$emit("search", null);
    }
  }
};
</script>

<style scoped lang="scss">
.divider {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
}
.vertical_space {
  height: 20px;
}

.hidden_container {
  display: none;
  transition: 0.2s;
}
</style>

<style lang="scss">
.advanced_search_dates {
  width: 300px;
}

#advanced_search_container {
  display: flex;
  height: auto;
  visibility: visible;
  justify-content: center;
  align-content: center;
  transition: 0.2s;
}

#advanced_search_title {
  display: flex;
  justify-content: center;
  align-content: center;
}

#advanced_search_export_button_div {
  margin-left: auto;
}

.advanced_search_select_width {
  width: 300px;
}
.advanced_search_titles {
  font-weight: bold;
  font-size: 12px;
}
</style>
