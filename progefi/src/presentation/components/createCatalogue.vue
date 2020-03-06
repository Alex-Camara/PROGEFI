<template>
  <!-- <div> -->
  <div id="create_catalogue_container">
    <div id="create_catalogue_content" class="gray_box">
      <p class="title">CREAR FICHA:</p>

      <!-- <div> -->
      <b-field id="create_catalogue_name_input_field" custom-class="is-small">
        <template slot="label">
          <required-field-helper :name="'Nombre:'" :valid="isNameValid"></required-field-helper>
        </template>
        <input
          id="create_catalogue_name_input"
          class="input create_catalogue_input_elements"
          v-model="name"
        />
      </b-field>

      <b-field id="create_catalogue_code_input_field" custom-class="is-small">
        <template slot="label">
          <required-field-helper :name="'Código:'" :valid="isCodeValid"></required-field-helper>
        </template>
        <input
          id="create_catalogue_code_input"
          class="input create_catalogue_input_elements"
          v-model="code"
        />
      </b-field>

      <b-field id="create_catalogue_collection_select_field" custom-class="is-small is-centered">
        <template slot="label">
          <required-field-helper :name="'Colección:'" :valid="isCollectionValid"></required-field-helper>
        </template>
        <div class="select create_catalogue_input_elements">
          <select
            id="create_catalogue_collection_select"
            placeholder="Selecciona una colección"
            v-model="collection"
          >
            <option
              v-for="collection in collections"
              :key="collection.getName()"
              :value="collection"
            >{{ collection.getName() }}</option>
          </select>
        </div>
      </b-field>

      <b-field id="create_catalogue_description_input_field" custom-class="is-small">
        <template slot="label">
          <required-field-helper :name="'Descripción:'" :valid="isDescriptionValid"></required-field-helper>
        </template>
        <textarea
          id="create_catalogue_description_input"
          class="textarea create_catalogue_input_elements"
          rows="2"
          maxlength="200"
          v-model="description"
        ></textarea>
      </b-field>
      <!-- </div> -->
    </div>
    <div>
      <button
        id="create_catalogue_create_button"
        class="button is-accent"
        :disabled="disableCreateButton()"
        @click="createCatalogue()"
      >Crear catálogo</button>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { mapState } from "vuex";
import requiredFieldHelper from "../helpers/requiredFieldHelper.vue";
export default {
  // props: ["selectedCollection"],
  components: {
    "required-field-helper": requiredFieldHelper
  },
  mounted() {
    this.$store.dispatch("collection/getCollections");
    // if (this.selectedCollection) {
    // this.setCollection(this.selectedCollection);
    // }
  },
  computed: {
    ...mapState("catalogue", {
      catalogue: state => state.catalogue,
      isNameValid: state => state.catalogue.getNameValid(),
      isCodeValid: state => state.catalogue.getCodeValid(),
      isDescriptionValid: state => state.catalogue.getDescriptionValid(),
      isCollectionValid: state => state.catalogue.getCollectionValid()
    }),
    ...mapState("collection", {
      collections: state => state.collections
    }),
    name: {
      get: function() {
        let name = this.catalogue.getName();
        if (this.catalogue.getNameValid().message == "temporary error") {
          this.addShakeEffect("create_catalogue_name_input");
        }
        return name;
      },
      set: function(newValue) {
        this.$store.dispatch("catalogue/setName", newValue);
      }
    },
    code: {
      get: function() {
        let code = this.catalogue.getCode();
        if (this.catalogue.getCodeValid().message == "temporary error") {
          this.addShakeEffect("create_catalogue_code_input");
        }
        return code;
      },
      set: function(newValue) {
        this.$store.dispatch("catalogue/setCode", newValue);
      }
    },
    description: {
      get: function() {
        let description = this.catalogue.getDescription();
        if (this.catalogue.getDescriptionValid().message == "temporary error") {
          this.addShakeEffect("create_catalogue_description_input");
        }
        return description;
      },
      set: function(newValue) {
        this.$store.dispatch("catalogue/setDescription", newValue);
      }
    },
    collection: {
      get: function() {
        //ELIMINAR CUANDO SE HAYA IMPLEMENTATO CRUD COLECCIONES
        return this.catalogue.getCollection();
      },
      set: function(newValue) {
        this.$store.dispatch("catalogue/setCollection", newValue);
      }
    }
  },
  methods: {
    // Establecer el valor de la colección seleccionada
    // setCollection(collection) {
    // this.$store.dispatch("catalogue/setCollection", collection);
    // debugger;
    // },
    disableCreateButton() {
      if (
        this.isNameValid.isValid &&
        this.isCodeValid.isValid &&
        this.isDescriptionValid.isValid &&
        this.isCollectionValid.isValid
      ) {
        return false;
      } else {
        return true;
      }
    },
    addShakeEffect(elemenId) {
      let element = document.getElementById(elemenId);
      if (element != null) {
        element.classList.remove("shake_field");
        void element.offsetWidth; // trigger a DOM reflow
        element.classList.add("shake_field");
      }
    },
    async createCatalogue() {
      this.$store.dispatch("loading/setLoadingMessage", "Creando catálogo...");
      this.$store.dispatch("loading/setActive", true, { root: true });
      await this.$store.dispatch("catalogue/createCatalogue");
      this.$store.dispatch("loading/setActive", false, { root: true });
      // console.log("catalogue creado");
      this.openToast("¡Catálogo creado!");
      this.$router.push({
        name: "UIShowCatalogues",
        params: { askToLeave: false }
      });
    },
    openToast(message) {
      this.$buefy.toast.open(message);
    }
  }
};
</script>

<style lang="scss">
#create_catalogue_container {
  // display: flex;
  // flex-direction: column;
  // display: grid;
  // grid-template-rows: 800px 50px;
  // justify-content: center;
  // height: 100%;
}
#create_catalogue_content {
  // grid-row: 1 / 2;
  // background-color: red;
  // width: 1000px;
  // height: 400px;
}
#create_catalogue_description_input {
  width: 600px;
  height: 100px;
}
#create_catalogue_create_button {
  margin-top: 20px;
  display: flex;
  grid-row: 2 / 3;
  justify-self: end;
}
.create_catalogue_input_elements {
  width: 420px;
}

.shake_field {
  outline-color: red !important;
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