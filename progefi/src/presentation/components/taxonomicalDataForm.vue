<template>
  <div id="taxonomical_data_form_component">
    <!-- --------TaxonomicalData Component Content species data header----- -->
    <div>
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
</template>

<script>
import store from "../store/store.js";
import axios from "axios";
import { mapState } from "vuex";
import requiredFieldHelper from "../helpers/requiredFieldHelper.vue";

export default {
  components: {
    "required-field-helper": requiredFieldHelper
  },
  data() {
    return {
      theCatalogueOfLifeData: [],
      waiting: false,
      autocompleteScientificNameStatus: false
    };
  },
  mounted() {
    this.$store.commit("speciesData/setDatacard", this.datacardState.datacard);
  },
  computed: {
    ...mapState("speciesData", {
      datacardState: state => state
    }),
    ...mapState("speciesData", {
      speciesDataState: state => state,
      datacard: state => state.datacard,
      isScientificNameValid: state => state.datacard.getScientificNameValid(),
      isCommonNameValid: state => state.datacard.getCommonNameValid(),
      isGenusValid: state => state.datacard.getGenusValid(),
      isFamilyValid: state => state.datacard.getFamilyValid(),
      isOrderValid: state => state.datacard.getOrderValid(),
      isPhylumValid: state => state.datacard.getPhylumValid(),
      isSpeciesClassValid: state => state.datacard.getSpeciesClassValid(),
      isKingdomValid: state => state.datacard.getKingdomValid()
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
        let scientificName = this.datacard.getScientificName();
        // let scientificNameValid = this.datacard.getScientificNameValid();
        if (this.isScientificNameValid.message == "temporary error") {
          this.addShakeEffect("scientific_name_input");
        }
        return scientificName;
      },
      set: function(newValue) {
        this.$store.dispatch("speciesData/setScientificName", newValue);
      }
    },
    commonName: {
      get: function() {
        let commonName = this.datacard.getCommonName();
        if (this.isCommonNameValid.message == "temporary error") {
          this.addShakeEffect("common_name_input");
        }
        return commonName;
      },
      set: function(newValue) {
        this.$store.dispatch("speciesData/setCommonName", newValue);
      }
    },
    genus: {
      get: function() {
        let genus = this.datacard.getGenus();
        if (this.isGenusValid.message == "temporary error") {
          this.addShakeEffect("genus_input");
        }
        return genus;
      },
      set: function(newValue) {
        this.$store.dispatch("speciesData/setGenus", newValue);
      }
    },
    order: {
      get: function() {
        let order = this.datacard.getOrder();
        if (this.isOrderValid.message == "temporary error") {
          this.addShakeEffect("order_input");
        }
        return order;
      },
      set: function(newValue) {
        this.$store.dispatch("speciesData/setOrder", newValue);
      }
    },
    family: {
      get: function() {
        let family = this.datacard.getFamily();
        if (this.isFamilyValid.message == "temporary error") {
          this.addShakeEffect("family_input");
        }
        return family;
      },
      set: function(newValue) {
        this.$store.dispatch("speciesData/setFamily", newValue);
      }
    },
    speciesClass: {
      get: function() {
        let speciesClass = this.datacard.getSpeciesClass();
        if (this.isSpeciesClassValid.message == "temporary error") {
          this.addShakeEffect("species_class_input");
        }
        return speciesClass;
      },
      set: function(newValue) {
        this.$store.dispatch("speciesData/setSpeciesClass", newValue);
      }
    },
    phylum: {
      get: function() {
        let phylum = this.datacard.getPhylum();
        if (this.isPhylumValid.message == "temporary error") {
          this.addShakeEffect("phylum_input");
        }
        return phylum;
      },
      set: function(newValue) {
        this.$store.dispatch("speciesData/setPhylum", newValue);
      }
    },
    kingdom: {
      get: function() {
        let kingdom = this.datacard.getKingdom();
        if (this.isKingdomValid.message == "temporary error") {
          this.addShakeEffect("kingdom_input");
        }
        return kingdom;
      },
      set: function(newValue) {
        this.$store.dispatch("speciesData/setKingdom", newValue);
      }
    }
  },
  methods: {
    closeAutocompletes() {
      this.autocompleteScientificNameStatus = false;
    },
    addShakeEffect(elemenId) {
      let element = document.getElementById(elemenId);
      if (element != null) {
        element.classList.remove("shake_field");
        void element.offsetWidth; // trigger a DOM reflow
        element.classList.add("shake_field");
      }
    },
    setFields(species) {
      return new Promise((resolve, reject) => {
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
        resolve();
      });
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

          axios
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
    }
  }
};
</script>

<style lang="scss">
#taxonomical_data_form_component {
  display: grid;
  //width: 100%;
  //height: 100%;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 40px 80px 80px 80px;
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