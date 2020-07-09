<template>
  <!-- <div> -->
  <div id="create_catalogue_container">
    <p class="title">{{title}}</p>

    <div class="gray_box create_catalogue_content">
      <!-- <div> -->
      <b-field id="create_catalogue_name_input_field" custom-class="is-small">
        <template slot="label">
          <required-field-helper
            :name="'Nombre:'"
            :valid="isNameValid"
          ></required-field-helper>
        </template>
        <input
          id="create_catalogue_name_input"
          class="input create_catalogue_input_elements"
          v-model="name"
        />
      </b-field>
    </div>

    <div class="gray_box create_catalogue_content">
      <required-field-helper
        :name="'Código:'"
        :valid="isCodeValid"
      ></required-field-helper>
      <div class="input_field_control">
        <span id="create_catalogue_collection_code" class="button is-static">{{catalogue.getCollection().getCode()}}</span>
        <input
                id="create_catalogue_code_input"
                class="input create_catalogue_input_elements"
                v-model="code"
        />
      </div>

    </div>

    <div class="gray_box create_catalogue_content">
      <b-field
        id="create_catalogue_collection_select_field"
        custom-class="is-small is-centered"
        label="Colección:"
      >
        <input
          id="create_catalogue_collection_input"
          class="input"
          :value="collection.getName()"
          :disabled="true"
        />
      </b-field>
    </div>

    <div class="gray_box create_catalogue_content">
      <b-field
        id="create_catalogue_description_input_field"
        custom-class="is-small"
      >
        <template slot="label">
          <required-field-helper
            :name="'Descripción:'"
            :valid="isDescriptionValid"
          ></required-field-helper>
        </template>
        <textarea
          id="create_catalogue_description_input"
          class="textarea create_catalogue_input_elements"
          rows="4"
          maxlength="500"
          v-model="description"
        ></textarea>
      </b-field>
      <!-- </div> -->
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import requiredFieldHelper from "../helpers/requiredFieldHelper.vue";
import Collection from "../models/collection";

export default {
  props: ["catalogue"],
  components: {
    "required-field-helper": requiredFieldHelper
  },
  data() {
    return {
      collection: new Collection(),
      title: "CREAR CATÁLOGO:",
      createButtonText: "Crear catálogo"
    };
  },
  async mounted() {
    this.collection = await Collection.getAll();
    this.catalogue.setCollection(this.collection);
  },
  computed: {
    isNameValid: function() {
      return this.catalogue.getNameValid();
    },
    isCodeValid: function() {
      return this.catalogue.getCodeValid();
    },
    isDescriptionValid: function() {
      return this.catalogue.getDescriptionValid();
    },
    name: {
      get: function() {
        let name = this.catalogue.getName();
        if (this.catalogue.getNameValid().message === "temporary error") {
          this.addShakeEffect("create_catalogue_name_input");
        }
        return name;
      },
      set: async function(newValue) {
        let error = "";
        error = await this.catalogue.setName(newValue);
        if (error === "error") {
          this.openDialog("Ha ocurrido un error con la base de datos");
        }
      }
    },
    code: {
      get: function() {
        let code = this.catalogue.getCode();
        if (this.catalogue.getCodeValid().message === "temporary error") {
          this.addShakeEffect("create_catalogue_code_input");
        }
        return code;
      },
      set: async function(newValue) {
        await this.catalogue.setCode(newValue);
      }
    },
    description: {
      get: function() {
        let description = this.catalogue.getDescription();
        if (
          this.catalogue.getDescriptionValid().message === "temporary error"
        ) {
          this.addShakeEffect("create_catalogue_description_input");
        }
        return description;
      },
      set: async function(newValue) {
        await this.catalogue.setDescription(newValue);
      }
    }
  },
  methods: {
    openDialog(message) {
      this.$buefy.dialog.alert(message);
    },
    addShakeEffect(elemenId) {
      let element = document.getElementById(elemenId);
      if (element != null) {
        element.classList.remove("shake_field");
        void element.offsetWidth; // trigger a DOM reflow
        element.classList.add("shake_field");
      }
    }
  }
};
</script>

<style lang="scss">
  @import "../style/style.scss";
  .input_field_control{
    display: flex;
  }
#create_catalogue_container {
  justify-content: center;
  width: 100%;
  height: 650px;
}

.create_catalogue_content {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
}
#create_catalogue_name_input {
  width: 400px;
}
#create_catalogue_code_input {
  width: 150px;
}
#create_catalogue_collection_input {
  width: 800px;
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
#create_catalogue_collection_code{
  background-color: $secondary;
  font-weight: bold;
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
