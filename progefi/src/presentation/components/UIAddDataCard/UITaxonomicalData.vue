<template>
  <div id="taxonomicalData_component" class="box">
    <!-- --------TaxonomicalData Component Header----- -->
    <div id="taxonomicalData_component_header">
      <p class="subtitle is-5">Datos taxonómicos</p>
    </div>

    <!-- --------TaxonomicalData Component Content----- -->

    <!-- --------TaxonomicalData Component Content Species data----- -->
    <div id="taxonomicalData_component_content_speciesData" class="box">
      <!-- --------TaxonomicalData Component Content species data header----- -->
      <div id="geographicalData_component_content_species_data_header">
        <b class="is-size-6">Datos científicos:</b>
      </div>

      <!-- ------- scientific name field ----- -->
      <b-field id="scientific_name_input" custom-class="is-small" label="Nombre científico:">
        <b-autocomplete
          rounded
          v-model="selectedSpecies.scientificName"
          
          :data="scientificNames"
          v-on:keyup.native="getSpeciesByScientificName($event)"
          @select="option => setFields(option)"
          :loading="waiting"
        ></b-autocomplete>
      </b-field>

      <!-- ------- common name field ----- -->
      <b-field id="common_name_input" custom-class="is-small" label="Nombre común:">
        <b-input rounded  v-model="selectedSpecies.commonName"></b-input>
      </b-field>

      <!-- ------- genus field ----- -->
      <b-field id="genus_input" custom-class="is-small" label="Género:">
        <b-input rounded v-model="selectedSpecies.genus" ></b-input>
      </b-field>

      <!-- ------- familiy field ----- -->
      <b-field id="family_input" custom-class="is-small" label="Familia:">
        <b-input rounded v-model="selectedSpecies.family" ></b-input>
      </b-field>

      <!-- ------- order field ----- -->
      <b-field id="order_input" custom-class="is-small" label="Orden:">
        <b-input rounded v-model="selectedSpecies.order" ></b-input>
      </b-field>

      <!-- ------- class field ----- -->
      <b-field id="class_input" custom-class="is-small" label="Clase:">
        <b-input rounded v-model="selectedSpecies.speciesClass" ></b-input>
      </b-field>

      <!-- ------- phylum field ----- -->
      <b-field id="phylum_input" custom-class="is-small" label="Filo:">
        <b-input rounded v-model="selectedSpecies.phylum" ></b-input>
      </b-field>

      <!-- ------- kingdom field ----- -->
      <b-field id="kingdom_input" custom-class="is-small" label="Reino:">
        <b-input rounded v-model="selectedSpecies.kingdom" ></b-input>
      </b-field>
    </div>

    <!-- --------TaxonomicalData Component Content Species observation data----- -->
    <div id="taxonomicalData_component_content_species_observationData" class="box">
      <!-- --------TaxonomicalData Component Content species observationData header----- -->

      <div id="taxonomicalData_component_content_observationData_header">
        <b class="is-size-6">Datos de observación:</b>
      </div>

        <sex-helper id="sex_helper"></sex-helper>
    
        <lifeStage-helper id="lifeStage_helper"></lifeStage-helper>
      
    </div>

    <!-- --------TaxonomicalData Bottom Buttons----- -->
    <div id="taxonomicalData_component_bottomButtons">
      <b-button type="is-light" v-on:click="backwardStep()">Anterior</b-button>
      <b-button type="is-accent" v-on:click="forwardStep()">Siguiente</b-button>
    </div>
  </div>
</template>

<script>
import store from "../../store/store.js";
import { mapState } from "vuex";
import sexHelper from "../../helpers/sexHelper.vue";
import lifeStageHelper from "../../helpers/lifeStageHelper.vue";

export default {
  components: {
    "sex-helper": sexHelper,
    "lifeStage-helper": lifeStageHelper
  },
  data() {
    return {
      selectedSpecies: {
        scientificName: null,
        commonName: null,
        genus: null,
        order: null,
        family: null,
        speciesClass: null,
        phylum: null,
        kingdom: null
      },
      theCatalogueOfLifeData: null,
      waiting: false
    };
  },
  computed: {
    scientificNames: {
      get: function() {
        if (this.theCatalogueOfLifeData) {
          return this.theCatalogueOfLifeData.map(({ name }) => name);
        }
      }
    }
  },
  methods: {
    backwardStep() {
      store.commit("datacard/setActiveStep", 2);
    },
    forwardStep() {
      store.commit("datacard/setActiveStep", 4);
    },
    setFields(option) {
      this.selectedSpecies.scientificName = option;
      var selectedSpecies = this.theCatalogueOfLifeData.find(
        x => x.name == this.selectedSpecies.scientificName
      );
      console.log(selectedSpecies);
      console.log("no esta vac");
      var classification = null;
      if (
        selectedSpecies.hasOwnProperty("accepted_name") &&
        !(selectedSpecies === "undefined")
      ) {
        classification = selectedSpecies["accepted_name"].classification;
      } else {
        classification = selectedSpecies.classification;
      }

      this.selectedSpecies.kingdom = classification.find(
        x => x.rank == "Kingdom"
      ).name;
      this.selectedSpecies.phylum = classification.find(
        x => x.rank == "Phylum"
      ).name;
      this.selectedSpecies.speciesClass = classification.find(
        x => x.rank == "Class"
      ).name;
      this.selectedSpecies.order = classification.find(
        x => x.rank == "Order"
      ).name;
      this.selectedSpecies.family = classification.find(
        x => x.rank == "Family"
      ).name;
      this.selectedSpecies.genus = classification.find(
        x => x.rank == "Genus"
      ).name;
    },
    getSpeciesByScientificName(event) {
      if (
        event.key != "Enter" &&
        event.key != "Tab" &&
        this.selectedSpecies.scientificName != null
      ) {
        let scientificNameRequest = this.selectedSpecies.scientificName.trim();
        scientificNameRequest = scientificNameRequest.replace(/ /g, "+");
        let gbifAPIRequest =
          "http://webservice.catalogueoflife.org/col/webservice?format=json&response=full&rank=species&name=" +
          scientificNameRequest;
        this.waiting = true;

        this.axios.get(gbifAPIRequest).then(response => {
          this.waiting = false;
          this.theCatalogueOfLifeData = response.data.results;
        });
      }
    }
  }
};
</script>

<style lang="scss">
#taxonomicalData_component {
  height: 730px;
  display: grid;
  grid-template-rows: 50px 330px 270px 20px;
}

#taxonomicalData_component_header {
  grid-row: 1 / 2;
  justify-self: center;
  height: 50px;
}

#taxonomicalData_component_content_speciesData {
  grid-row: 2 / 3;
  display: grid;
  //width: 100%;
  //height: 100%;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 40px 80px 80px 80px;
}

#taxonomicalData_component_content_species_observationData {
  grid-row: 3 / 4;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 40px 40px 80px;
}

#taxonomicalData_component_bottomButtons {
  grid-row: 4 / 5;
  justify-self: end;
}

#taxonomicalData_component_content_species_data_header {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

#scientific_name_input {
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  margin-left: 20px;
  margin-right: 20px;
}

#common_name_input {
  grid-row: 2 / 3;
  grid-column: 3 / 5;
  margin-left: 20px;
  margin-right: 20px;
}

#genus_input {
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  margin-left: 20px;
}

#family_input {
  grid-row: 3 / 4;
  grid-column: 2 / 4;
  margin-left: 110px;
  margin-right: 110px;
}

#order_input {
  grid-row: 3 / 4;
  grid-column: 4 / 5;
  margin-right: 20px;
}

#class_input {
  grid-row: 4 / 5;
  grid-column: 1 / 2;
  margin-left: 20px;
}

#phylum_input {
  grid-row: 4 / 5;
  grid-column: 2 / 4;
  margin-left: 110px;
  margin-right: 110px;
}

#kingdom_input {
  grid-row: 4 / 5;
  grid-column: 4 / 5;
  margin-right: 20px;
}

#taxonomicalData_component_content_observationData_header {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

#sex_helper {
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  margin-right: 10px;
  //width: 350px;
  //grid-column: 1 / -1;
  //background-color: red;
}

#lifeStage_helper {
  grid-row: 2 / 3;
  grid-column: 3 / 5;
  margin-left: 10px;
}
</style>