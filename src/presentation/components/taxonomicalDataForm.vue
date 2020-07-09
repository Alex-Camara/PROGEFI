<template>
  <div id="taxonomical_data_form_component">
    <!-- --------TaxonomicalData Component Content species data header----- -->
    <div id="taxonomical_data_form_title">
      <information_helper :message="informationMessage"></information_helper>
      <b class="is-size-6">Datos científicos:</b>
    </div>

    <!-- ------- scientific name field ----- -->
    <b-field
      id="scientific_name_input_field"
      class="autocomplete_box_field"
      custom-class="is-small"
      label="Nombre científico:"
    >
      <template slot="label">
        <required-field-helper
          :name="'Nombre científico:'"
          :valid="isScientificNameValid"
        ></required-field-helper>
      </template>
      <div id="scientific_name_div">
        <div id="scientific_name_div_results">
          <input
            id="scientific_name_input"
            placeholder
            class="input"
            v-model="scientificName"
            @focus="autocompleteScientificNameStatus = true"
            @click.stop="autocompleteScientificNameStatus = true"
          />
          <div class="autocomplete_box" v-if="showResultBox()">
            <b-loading
              :is-full-page="false"
              :active.sync="waiting"
              :can-cancel="true"
            ></b-loading>
            <ul class="autocomplete_list">
              <li
                     id="scientific_name_input_results"
                v-for="specie in theCatalogueOfLifeData"
                :key="specie.id"
                :value="specie.name"
                @click="setFields(specie)"
              >
                {{ specie.name }}
              </li>
            </ul>
          </div>
        </div>

        <button
          id="scientific_name_search_button"
          class="button is-secondary"
          @click="getSpeciesByScientificName(scientificName)"
          @click.stop="autocompleteScientificNameStatus = true"
          :disabled="disableSearchButton()"
        >
          Buscar especie
        </button>
      </div>
    </b-field>

    <!-- ------- genus field ----- -->
    <b-field id="genus_input_field" custom-class="is-small" label="Género:">
      <!-- <template slot="label"> -->
      <!-- <required-field-helper :name="'Género:'" :valid="isGenusValid"></required-field-helper> -->
      <!-- </template> -->
      <input id="genus_input" class="input" v-model="genus" :disabled="true" />
    </b-field>
    <!-- ------- familiy field ----- -->
    <b-field id="family_input_field" custom-class="is-small" label="Familia:">
      <!-- <template slot="label"> -->
      <!-- <required-field-helper :name="'Familia:'" :valid="isFamilyValid"></required-field-helper> -->
      <!-- </template> -->
      <input
        id="family_input"
        class="input"
        v-model="family"
        :disabled="true"
      />
    </b-field>

    <!-- ------- order field ----- -->
    <b-field id="order_input_field" custom-class="is-small" label="Orden:">
      <!-- <template slot="label"> -->
      <!-- <required-field-helper :name="'Orden:'" :valid="isOrderValid"></required-field-helper> -->
      <!-- </template> -->
      <input id="order_input" class="input" v-model="order" :disabled="true" />
    </b-field>

    <!-- ------- class field ----- -->
    <b-field
      id="class_species_input_field"
      custom-class="is-small"
      label="Clase:"
    >
      <!-- <template slot="label"> -->
      <!-- <required-field-helper :name="'Clase:'" :valid="isSpeciesClassValid"></required-field-helper> -->
      <!-- </template> -->
      <input
        id="species_class_input"
        class="input"
        v-model="speciesClass"
        :disabled="true"
      />
    </b-field>

    <!-- ------- phylum field ----- -->
    <b-field id="phylum_input_field" custom-class="is-small" label="Phylum:">
      <!-- <template slot="label"> -->
      <!-- <required-field-helper :name="'Phylum:'" :valid="isPhylumValid"></required-field-helper> -->
      <!-- </template> -->
      <input
        id="phylum_input"
        class="input"
        v-model="phylum"
        :disabled="true"
      />
    </b-field>

    <!-- ------- kingdom field ----- -->
    <b-field id="kingdom_input_field" custom-class="is-small" label="Reino:">
      <!-- <template slot="label"> -->
      <!-- <required-field-helper :name="'Reino:'" :valid="isKingdomValid"></required-field-helper> -->
      <!-- </template> -->
      <input
        id="kingdom_input"
        class="input"
        v-model="kingdom"
        :disabled="true"
      />
    </b-field>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import informationHelper from "../helpers/informationHelper.vue";
import requiredFieldHelper from "../helpers/requiredFieldHelper.vue";

export default {
  components: {
    "information_helper": informationHelper,
    "required-field-helper": requiredFieldHelper
  },
  data() {
    return {
      theCatalogueOfLifeData: [],
      waiting: false,
      autocompleteScientificNameStatus: false,
      //Campo para verificar que la taxonomia pertenezca a un solo nombre cientifico
      recoveredScientificName: "",
      informationMessage: "Ingresa un nombre científico y selecciona 'Buscar especie', " +
              "el sistema rellenara los datos taxónomicos con el resultado seleccionado (Si hay Internet)..."
    };
  },
  mounted() {},
  watch: {
    async scientificName(newValue) {
      // await this.getSpeciesByScientificName(newValue);
      if (newValue.trim() !== this.recoveredScientificName.trim()) {
        this.setFieldsToNull();
      }
    }
  },
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard,
      species: state =>
        state.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies(),
      isScientificNameValid: state =>
        state.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .getScientificNameValid()
    }),
    scientificNames: {
      get: function() {
        if (this.theCatalogueOfLifeData) {
          return this.theCatalogueOfLifeData.map(({ name }) => name);
        }
        return "";
      }
    },
    scientificName: {
      get: function() {
        if (
          this.species.getScientificNameValidMessage() === "temporary error"
        ) {
          this.addShakeEffect("scientific_name_input");
        }
        return this.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .getScientificName();
      },
      set: async function(newValue) {
        // this.$store.commit("datacard/setScientificName", newValue);
        await this.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .setScientificName(newValue);
      }
    },
    genus: {
      get: function() {
        let genus = this.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .getGenus();
        return genus;
      },
      set: function(newValue) {
        this.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .setGenus(newValue);
        this.$store.commit("datacard/setDatacard", this.datacard);
      }
    },
    order: {
      get: function() {
        return this.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .getOrder();
      },
      set: function(newValue) {
        this.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .setOrder(newValue);
        this.$store.commit("datacard/setDatacard", this.datacard);
      }
    },
    family: {
      get: function() {
        let family = this.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .getFamily();
        return family;
      },
      set: function(newValue) {
        this.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .setFamily(newValue);
        this.$store.commit("datacard/setDatacard", this.datacard);
      }
    },
    speciesClass: {
      get: function() {
        let speciesClass = this.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .getSpeciesClass();
        return speciesClass;
      },
      set: function(newValue) {
        this.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .setSpeciesClass(newValue);
        this.$store.commit("datacard/setDatacard", this.datacard);
      }
    },
    phylum: {
      get: function() {
        let phylum = this.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .getPhylum();
        return phylum;
      },
      set: function(newValue) {
        this.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .setPhylum(newValue);
        this.$store.commit("datacard/setDatacard", this.datacard);
      }
    },
    kingdom: {
      get: function() {
        let kingdom = this.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .getKingdom();
        return kingdom;
      },
      set: function(newValue) {
        this.datacard
          .getCollect()
          .getSpecimen()
          .getSpecies()
          .setKingdom(newValue);
        this.$store.commit("datacard/setDatacard", this.datacard);
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
      return new Promise(resolve => {
        this.recoveredScientificName = species.name;
        this.scientificName = species.name;
        var classification = null;
        if (species.hasOwnProperty("accepted_name")) {
          classification = species.accepted_name.classification;
        } else {
          classification = species.classification;
        }

        this.kingdom = classification.find(x => x.rank === "Kingdom").name;
        this.phylum = classification.find(x => x.rank === "Phylum").name;
        this.speciesClass = classification.find(x => x.rank === "Class").name;
        this.order = classification.find(x => x.rank === "Order").name;
        this.family = classification.find(x => x.rank === "Family").name;
        this.genus = classification.find(x => x.rank === "Genus").name;
        resolve();
      });
    },
    setFieldsToNull() {
      return new Promise(resolve => {
        this.kingdom = "";
        this.phylum = "";
        this.speciesClass = "";
        this.order = "";
        this.family = "";
        this.genus = "";
        resolve();
      });
    },
    async getSpeciesByScientificName(scientificName) {
      if (scientificName != null) {
        if (navigator.onLine) {
          let scientificNameRequest = scientificName.toString().trim();
          scientificNameRequest = scientificNameRequest.replace(/ /g, "+");
          let gbifAPIRequest =
            "http://webservice.catalogueoflife.org/col/webservice?format=json&response=full&rank=species&name=" +
            scientificNameRequest;
          this.autocompleteScientificNameStatus = true;
          this.waiting = true;

          this.theCatalogueOfLifeData = await this.getAPIResults(
            gbifAPIRequest
          );
          // if (theCatalogueOfLifeData)
          this.waiting = false;
        } else {
          this.waiting = false;
          this.theCatalogueOfLifeData = "";
        }
      }
    },
    getAPIResults(gbifAPIRequest) {
      axios.defaults.timeout = 20000;

      return new Promise(resolve => {
        axios
          .get(gbifAPIRequest, {
            headers: {
              "Set-Cookie": "HttpOnly;Secure;SameSite=Strict"
            }
          })
          .then(response => {
            if (response.data["error_message"] !== ""){
              // debugger
              this.$buefy.toast.open("No se encontraron resultados...");
              this.autocompleteScientificNameStatus = false;
              resolve();
            } else{
              resolve(response.data.results);
            }
          })
          .catch(() => {
            this.$buefy.toast.open("No se encontraron resultados...");
            this.autocompleteScientificNameStatus = false;
            resolve("");
          });
      });
    },
    showResultBox() {
      if (
        (this.autocompleteScientificNameStatus &&
          (this.theCatalogueOfLifeData !== "undefined" ||
            this.theCatalogueOfLifeData.length) > 0) ||
        (this.autocompleteScientificNameStatus && this.waiting)
      ) {
        return true;
      } else {
        return false;
      }
    },
    disableSearchButton() {
      if (navigator.onLine && !this.waiting) {
        return false;
      } else {
        return true;
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

#taxonomical_data_form_title{
  display: flex;
  align-items: center;
}

#scientific_name_input_field {
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  margin-left: 20px;
  margin-right: 20px;
  // display: flex;
  // flex-direction: column;
}

#scientific_name_div_results {
  display: flex;
  flex-direction: column;
}

#scientific_name_div {
  display: flex;
}

#scientific_name_search_button {
  margin-left: 20px;
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
