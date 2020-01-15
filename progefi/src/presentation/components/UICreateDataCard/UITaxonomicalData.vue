<template>
  <div id="taxonomicalData_component" class="box" @click="closeAutocompletes()">
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
      <b-field id="scientific_name_input_field" custom-class="is-small" label="Nombre científico:">
        <template slot="label">
          <required-field-helper :name="'Nombre científico:'" :valid="isScientificNameValid"></required-field-helper>
        </template>
        <input
          id="scientific_name_input"
          placeholder
          class="input"
          v-model="scientificName"
          @focus="autocompleteScientificNameStatus =true"
          @click.stop="autocompleteScientificNameStatus =true"
          @keyup="getSpeciesByScientificName($event)"
        />
        <div
          id="autocomplete_box"
          v-if="autocompleteScientificNameStatus && theCatalogueOfLifeData != undefined && theCatalogueOfLifeData.length > 0"
        >
          <ul id="autocomplete_list">
            <li
              v-for="specie in theCatalogueOfLifeData"
              :key="specie.id"
              :value="specie.name"
              @click="setFields(specie)"
            >{{specie.name}}</li>
          </ul>
        </div>
      </b-field>

      <!-- ------- common name field ----- -->
      <b-field id="common_name_input_field" custom-class="is-small">
        <template slot="label">
          <required-field-helper :name="'Nombre común:'" :valid="isCommonNameValid"></required-field-helper>
        </template>
        <input id="common_name_input" class="input" v-model="commonName" />
      </b-field>

      <!-- ------- genus field ----- -->
      <b-field id="genus_input_field" custom-class="is-small">
        <template slot="label">
          <required-field-helper :name="'Género:'" :valid="isGenusValid"></required-field-helper>
        </template>
        <input id="genus_input" class="input" v-model="genus" />
      </b-field>

      <!-- ------- familiy field ----- -->
      <b-field id="family_input_field" custom-class="is-small">
        <template slot="label">
          <required-field-helper :name="'Familia:'" :valid="isFamilyValid"></required-field-helper>
        </template>
        <input id="family_input" class="input" v-model="family" />
      </b-field>

      <!-- ------- order field ----- -->
      <b-field id="order_input_field" custom-class="is-small">
        <template slot="label">
          <required-field-helper :name="'Orden:'" :valid="isOrderValid"></required-field-helper>
        </template>
        <input id="order_input" class="input" v-model="order" />
      </b-field>

      <!-- ------- class field ----- -->
      <b-field id="class_species_input_field" custom-class="is-small">
        <template slot="label">
          <required-field-helper :name="'Clase:'" :valid="isSpeciesClassValid"></required-field-helper>
        </template>
        <input id="species_class_input" class="input" v-model="speciesClass" />
      </b-field>

      <!-- ------- phylum field ----- -->
      <b-field id="phylum_input_field" custom-class="is-small">
        <template slot="label">
          <required-field-helper :name="'Phylum:'" :valid="isPhylumValid"></required-field-helper>
        </template>
        <input id="phylum_input" class="input" v-model="phylum" />
      </b-field>

      <!-- ------- kingdom field ----- -->
      <b-field id="kingdom_input_field" custom-class="is-small">
        <template slot="label">
          <required-field-helper :name="'Reino:'" :valid="isKingdomValid"></required-field-helper>
        </template>
        <input id="kingdom_input" class="input" v-model="kingdom" />
      </b-field>
    </div>

    <!-- --------TaxonomicalData Component Content Species observation data----- -->
    <div id="taxonomicalData_component_content_species_observationData" class="box">
      <!-- --------TaxonomicalData Component Content species observationData header----- -->

      <div id="taxonomicalData_component_content_observationData_header">
        <b class="is-size-6">Datos de observación:</b>
      </div>

      <sex-helper id="sex_helper"></sex-helper>

      <life-stage-helper id="lifeStage_helper"></life-stage-helper>
    </div>

    <!-- --------TaxonomicalData Bottom Buttons----- -->
    <div id="taxonomicalData_component_bottomButtons">
      <b-button type="is-light" v-on:click="backwardStep()">Anterior</b-button>
      <b-button
        type="is-accent"
        v-on:click="forwardStep()"
        :disabled="disableNextButton()"
      >Siguiente</b-button>
    </div>
  </div>
</template>

<script>
import store from "../../store/store.js";
import { mapState } from "vuex";
import sexHelper from "../../helpers/sexHelper.vue";
import lifeStageHelper from "../../helpers/lifeStageHelper.vue";
import requiredFieldHelper from "../../helpers/requiredFieldHelper.vue";

export default {
  components: {
    "sex-helper": sexHelper,
    "life-stage-helper": lifeStageHelper,
    "required-field-helper": requiredFieldHelper
  },
  data() {
    return {
      theCatalogueOfLifeData: [],
      waiting: false,
      autocompleteScientificNameStatus: false
    };
  },
  computed: {
    ...mapState("speciesData", {
      speciesDataState: state => state,
      speciesData: state => state.speciesData,
      isScientificNameValid: state =>
        state.speciesData.getScientificNameValid(),
      isCommonNameValid: state => state.speciesData.getCommonNameValid(),
      isGenusValid: state => state.speciesData.getGenusValid(),
      isFamilyValid: state => state.speciesData.getFamilyValid(),
      isOrderValid: state => state.speciesData.getOrderValid(),
      isPhylumValid: state => state.speciesData.getPhylumValid(),
      isSpeciesClassValid: state => state.speciesData.getSpeciesClassValid(),
      isKingdomValid: state => state.speciesData.getKingdomValid(),
      isLifeStageValid: state => state.speciesData.getLifeStageValid(),
      isSexValid: state => state.speciesData.getSexValid()
    }),
    scientificNames: {
      get: function() {
        if (this.theCatalogueOfLifeData) {
          return this.theCatalogueOfLifeData.map(({ name }) => name);
        }
      }
    },
    scientificName: {
      get: function() {
        let scientificName = this.speciesData.getScientificName();
        // let scientificNameValid = this.speciesData.getScientificNameValid();
        if (this.isScientificNameValid.message == "temporary error") {
          this.addShakeEffect("scientific_name_input");
        }
        return scientificName;
      },
      set: function(newValue) {
        store.dispatch("speciesData/setScientificName", newValue);
      }
    },
    commonName: {
      get: function() {
        let commonName = this.speciesData.getCommonName();
        if (this.isCommonNameValid.message == "temporary error") {
          this.addShakeEffect("common_name_input");
        }
        return commonName;
      },
      set: function(newValue) {
        store.dispatch("speciesData/setCommonName", newValue);
      }
    },
    genus: {
      get: function() {
        let genus = this.speciesData.getGenus();
        if (this.isGenusValid.message == "temporary error") {
          this.addShakeEffect("genus_input");
        }
        return genus;
      },
      set: function(newValue) {
        store.dispatch("speciesData/setGenus", newValue);
      }
    },
    order: {
      get: function() {
        let order = this.speciesData.getOrder();
        if (this.isOrderValid.message == "temporary error") {
          this.addShakeEffect("order_input");
        }
        return order;
      },
      set: function(newValue) {
        store.dispatch("speciesData/setOrder", newValue);
      }
    },
    family: {
      get: function() {
        let family = this.speciesData.getFamily();
        if (this.isFamilyValid.message == "temporary error") {
          this.addShakeEffect("family_input");
        }
        return family;
      },
      set: function(newValue) {
        store.dispatch("speciesData/setFamily", newValue);
      }
    },
    speciesClass: {
      get: function() {
        let speciesClass = this.speciesData.getSpeciesClass();
        if (this.isSpeciesClassValid.message == "temporary error") {
          this.addShakeEffect("species_class_input");
        }
        return speciesClass;
      },
      set: function(newValue) {
        store.dispatch("speciesData/setSpeciesClass", newValue);
      }
    },
    phylum: {
      get: function() {
        let phylum = this.speciesData.getPhylum();
        if (this.isPhylumValid.message == "temporary error") {
          this.addShakeEffect("phylum_input");
        }
        return phylum;
      },
      set: function(newValue) {
        store.dispatch("speciesData/setPhylum", newValue);
      }
    },
    kingdom: {
      get: function() {
        let kingdom = this.speciesData.getKingdom();
        if (this.isKingdomValid.message == "temporary error") {
          this.addShakeEffect("kingdom_input");
        }
        return kingdom;
      },
      set: function(newValue) {
        store.dispatch("speciesData/setKingdom", newValue);
      }
    }
  },
  methods: {
    addShakeEffect(elemenId) {
      let element = document.getElementById(elemenId);
      if (element != null) {
        element.classList.remove("shake_field");
        void element.offsetWidth; // trigger a DOM reflow
        element.classList.add("shake_field");
      }
    },
    closeAutocompletes() {
      this.autocompleteScientificNameStatus = false;
    },
    backwardStep() {
      store.commit("addDatacard/setActiveStep", 2);
    },
    forwardStep() {
      store.commit("addDatacard/setActiveStep", 4);
    },
    setFields(species) {
      this.scientificName = species.name;
      var classification = null;
      if (species.hasOwnProperty("accepted_name")) {
        classification = species.accepted_name.classification;
        //debugger;
      } else {
        classification = species.classification;
        //debugger;
      }

      this.kingdom = classification.find(x => x.rank == "Kingdom").name;
      this.phylum = classification.find(x => x.rank == "Phylum").name;
      this.speciesClass = classification.find(x => x.rank == "Class").name;
      this.order = classification.find(x => x.rank == "Order").name;
      this.family = classification.find(x => x.rank == "Family").name;
      this.genus = classification.find(x => x.rank == "Genus").name;
      //debugger;
    },
    getSpeciesByScientificName(event) {
      let self = this;
      if (
        event.key != "Enter" &&
        event.key != "Tab" &&
        event.key != "Space" &&
        this.scientificName != null
      ) {
        if (navigator.onLine) {
          let scientificNameRequest = this.scientificName.trim();
          scientificNameRequest = scientificNameRequest.replace(/ /g, "+");
          let gbifAPIRequest =
            "http://webservice.catalogueoflife.org/col/webservice?format=json&response=full&rank=species&name=" +
            scientificNameRequest;
          self.waiting = true;

          self.axios
            .get(gbifAPIRequest)
            .then(response => {
              self.waiting = false;
              self.theCatalogueOfLifeData = response.data.results;
              console.info(self.theCatalogueOfLifeData);
            })
            .catch(error => {
              self.waiting = false;
              self.theCatalogueOfLifeData = "";
            });
        } else {
          self.waiting = false;
          self.theCatalogueOfLifeData = "";
        }
      }
    },
    disableNextButton() {
      //debugger;
      if (
        this.isScientificNameValid.isValid &&
        this.isCommonNameValid.isValid &&
        this.isGenusValid.isValid &&
        this.isFamilyValid.isValid &&
        this.isOrderValid.isValid &&
        this.isPhylumValid.isValid &&
        this.isSpeciesClassValid.isValid &&
        this.isKingdomValid.isValid &&
        this.isLifeStageValid.isValid &&
        this.isSexValid.isValid
      ) {
        return false;
      } else {
        return true;
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

#scientific_name_input_field {
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
}

#common_name_input_field {
  grid-row: 2 / 3;
  grid-column: 3 / 5;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
}

#genus_input_field {
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

#family_input_field {
  grid-row: 3 / 4;
  grid-column: 2 / 4;
  margin-left: 110px;
  margin-right: 110px;
  display: flex;
  flex-direction: column;
}

#order_input_field {
  grid-row: 3 / 4;
  grid-column: 4 / 5;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
}

#class_species_input_field {
  grid-row: 4 / 5;
  grid-column: 1 / 2;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

#phylum_input_field {
  grid-row: 4 / 5;
  grid-column: 2 / 4;
  margin-left: 110px;
  margin-right: 110px;
  display: flex;
  flex-direction: column;
}

#kingdom_input_field {
  grid-row: 4 / 5;
  grid-column: 4 / 5;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
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

.shake_field {
  outline-color: red;
  /* also need animation and -moz-animation */
  animation: shake 0.5s linear;
}
/* also need keyframes and -moz-keyframes */
@keyframes shake {
  8%,
  41% {
    -webkit-transform: translateX(-10px);
  }
  25%,
  58% {
    -webkit-transform: translateX(10px);
  }
  75% {
    -webkit-transform: translateX(-5px);
  }
  92% {
    -webkit-transform: translateX(5px);
  }
  0%,
  100% {
    -webkit-transform: translateX(0);
  }
}
</style>