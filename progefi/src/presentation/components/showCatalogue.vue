<template>
  <div id="show_catalogue_container">
    <p class="title">INFORMACIÓN:</p>

    <div class="gray_box show_catalogue_content">
      <div>
        <div class="show_catalogue_attribute_div_title">
          <required-field-helper
            v-if="editMode"
            :valid="isCodeValid"
          ></required-field-helper>
          <p class="attribute_name">Código:</p>
        </div>
        <p class="attribute_value" v-if="!editMode">
          {{ catalogue.getCollection().getCode() + catalogue.getCode() }}
        </p>
        <input
          v-if="editMode"
          id="show_catalogue_code_input"
          class="input show_catalogue_input_elements"
          v-model="code"
        />
      </div>
    </div>

    <div class="gray_box show_catalogue_content">
      <div class="show_catalogue_attribute_div_title">
        <required-field-helper
          v-if="editMode"
          :valid="isNameValid"
        ></required-field-helper>
        <p class="attribute_name">Nombre:</p>
      </div>
      <div>
        <p class="attribute_value" v-if="!editMode">
          {{ catalogue.getName() }}
        </p>
        <input
          v-if="editMode"
          id="show_catalogue_name_input"
          class="input show_catalogue_input_elements"
          v-model="name"
        />
      </div>
    </div>

    <div class="gray_box show_catalogue_content">
      <div class="show_catalogue_attribute_div_title">
        <required-field-helper
          v-if="editMode"
          :valid="isDescriptionValid"
        ></required-field-helper>
        <p class="attribute_name">Descripción:</p>
      </div>
      <div>
        <p class="attribute_value" v-if="!editMode">
          {{ catalogue.getDescription() }}
        </p>
        <textarea
          v-if="editMode"
          rows="4"
          id="show_catalogue_description_input"
          class="textarea"
          v-model="description"
        />
      </div>
    </div>

    <div class="gray_box show_catalogue_content">
      <div>
        <p class="attribute_name">Colección:</p>
        <p class="attribute_value">
          {{ catalogue.getCollection().getName() }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import requiredFieldHelper from "../helpers/requiredFieldHelper";

export default {
  props: ["catalogue", "editMode"],
  components: {
    "required-field-helper": requiredFieldHelper
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
          this.addShakeEffect("show_catalogue_name_input");
        }
        return name;
      },
      set: async function(newValue) {
        await this.catalogue.setName(newValue);
      }
    },
    code: {
      get: function() {
        let code = this.catalogue.getCode();
        if (this.catalogue.getCodeValid().message === "temporary error") {
          this.addShakeEffect("show_catalogue_code_input");
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
          this.addShakeEffect("show_catalogue_description_input");
        }
        return description;
      },
      set: async function(newValue) {
        await this.catalogue.setDescription(newValue);
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
    }
  }
};
</script>

<style lang="scss">
#show_catalogue_container {
  justify-content: center;
  width: 100%;
}
.show_catalogue_content {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
}

.show_catalogue_input_elements {
  width: 100%;
}

.show_catalogue_attribute_div_title {
  display: flex;
  align-items: center;
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
