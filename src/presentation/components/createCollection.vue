<template>
  <div id="create_collection_component">
    <p class="title">{{ title }}</p>

    <div class="gray_box create_collection_content">
      <div class="create_collection_attribute_div_title">
        <required-field-helper
          :name="collectionNameTitle"
          :valid="isNameValid"
        ></required-field-helper>
      </div>
      <input
        id="create_collection_name_input"
        class="input create_collection_input_elements"
        v-model="name"
        :disabled="editMode && itHasCatalogues"
      />
    </div>

    <div class="gray_box create_collection_content">
      <div
        class="create_collection_attribute_div_title"
        @mouseleave="setHelpText('', false)"
        @mouseenter="setHelpText(helpTextCode, true)"
      >
        <required-field-helper
          :name="codeTitle"
          :valid="isCodeValid"
        ></required-field-helper>
      </div>
      <input
        id="create_collection_code_input"
        class="input create_collection_input_elements"
        v-model="code"
        :disabled="editMode && itHasCatalogues"
      />
    </div>

    <div class="gray_box create_collection_content">
      <div class="create_collection_attribute_div_title">
        <required-field-helper
          :name="entityTitle"
          :valid="isEntityNameValid"
        ></required-field-helper>
      </div>
      <input
        id="create_collection_research_area_input"
        class="input create_collection_input_elements"
        v-model="entityName"
      />
    </div>

    <div class="gray_box create_collection_content">
      <div class="create_collection_attribute_div_title">
        <required-field-helper
          :name="entityAcronymTitle"
          :valid="isEntityAcronymValid"
        ></required-field-helper>
      </div>
      <input
        id="create_collection_research_area_acronym_input"
        class="input create_collection_input_elements"
        v-model="entityAcronym"
      />
    </div>

    <div class="gray_box create_collection_content">
      <div class="create_collection_attribute_div_title">
        <required-field-helper
          :name="instituteNameTitle"
          :valid="isInstituteNameValid"
        ></required-field-helper>
      </div>
      <input
        id="create_collection_institute_name_input"
        class="input create_collection_input_elements"
        v-model="instituteName"
      />
    </div>

    <div class="gray_box create_collection_content">
      <div class="create_collection_attribute_div_title">
        <required-field-helper
          :name="acronymTitle"
          :valid="isInstituteAcronymValid"
        ></required-field-helper>
      </div>
      <input
        id="create_collection_institute_acronym_input"
        class="input create_collection_input_elements"
        v-model="instituteAcronym"
      />
    </div>

    <div class="gray_box create_collection_content">
      <div class="create_collection_attribute_div_title">
        <required-field-helper
          :name="descriptionTitle"
          :valid="isDescriptionValid"
        ></required-field-helper>
      </div>
      <textarea
        id="create_catalogue_description_input"
        class="textarea create_catalogue_input_elements"
        rows="2"
        maxlength="200"
        v-model="description"
      ></textarea>
    </div>

    <div class="gray_box create_collection_content">
      <div class="create_collection_attribute_div_title">
        <required-field-helper
          :name="instituteLogoTitle"
          :valid="isInstituteLogoValid"
        ></required-field-helper>
      </div>
      <b-field id="" class="file">
        <b-upload v-model="file" accept="image/*">
          <a class="button is-secondary">
            <b-icon icon="upload"></b-icon>
            <span>{{ uploadMessage }}</span>
          </a>
        </b-upload>
        <span class="file-name" v-if="file">{{ file.name }}</span>
      </b-field>

      <div class="space"></div>

      <div v-if="collection.getInstituteLogoPath() !== null">
        <img
          id="create_collection_logo_image"
          :src="'file:///home/alex/Documentos/PROGEFI/src/presistence/resources/institute_logos/1594955842005.webp'"
          alt="jenjkdnjen"
        />
      </div>
      {{__dirname}}
    </div>

    <div class="gray_box create_collection_content">
      <div
        class="create_collection_attribute_div_title"
        @mouseleave="setHelpText('', false)"
        @mouseenter="setHelpText(helpTextDestinationDirectory, true)"
      >
        <required-field-helper
          :name="destinationDirectoryTitle"
          :valid="isCataloguesFolderPathValid"
        ></required-field-helper>
      </div>

      <div>
        <label id="create_collection_directory_input_label">
          <div class="container_flex">
            <a class="button is-secondary" v-on:click="setDirectory">
              <b-icon icon="upload"></b-icon>
              <span>{{ loadDirectoryMessage }}</span>
            </a>
            <span class="file-name" v-if="cataloguesFolderPath">{{
              cataloguesFolderPath
            }}</span>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import requiredFieldHelper from "../helpers/requiredFieldHelper";
import path from "path";

export default {
  name: "createCollection",
  components: { "required-field-helper": requiredFieldHelper },
  props: ["collection", "editMode"],
  data() {
    return {
      title: "Ingresa los datos de la colección:",
      collectionNullMessage:
        "Debes crear una colección para utilizar el sistema...",
      collectionNameTitle: "Nombre: ",
      codeTitle: "Código:",
      instituteNameTitle: "Instituto:",
      acronymTitle: "Acrónimo del instituto:",
      entityTitle: "Nombre de la entidad:",
      entityAcronymTitle: "Acrónimo de la entidad:",
      instituteLogoTitle: "Logo de la institución:",
      catalogueNumberTitle: "Número de catálogos:",
      descriptionTitle: "Descripción: ",
      destinationDirectoryTitle: "Carpeta destino (archivo csv):",
      file: null,
      directoryFile: null,
      uploadMessage: "Carga el archivo con el logo de la institución",
      loadDirectoryMessage: "Selecciona la carpeta destino",
      helpTextCode:
        "Este es el código inicial que tendrá el código de los catálogos.",
      helpTextDestinationDirectory:
        "Directorio donde se guardará el archivo csv generado por catálogo.",
      notSupportedFormatMessage: "Formato no soportado"
    };
  },
  watch: {
    file(newValue) {
      let isFileExtensionCorrect = this.checkFileExtension(this.file);
      if (isFileExtensionCorrect) {
        this.instituteLogoPath = newValue.path;
      } else {
        this.openDialog(this.notSupportedFormatMessage);
        this.file = null;
      }
    }
  },
  computed: {
    itHasCatalogues: function() {
      return this.collection.getCataloguesNumber() > 0;
    },
    isNameValid: function() {
      return this.collection.getNameValid();
    },
    isCodeValid: function() {
      return this.collection.getCodeValid();
    },
    isInstituteAcronymValid: function() {
      return this.collection.getInstituteAcronymValid();
    },
    isInstituteNameValid: function() {
      return this.collection.getInstituteNameValid();
    },
    isEntityNameValid: function() {
      return this.collection.getEntityNameValid();
    },
    isDescriptionValid: function() {
      return this.collection.getDescriptionValid();
    },
    isInstituteLogoValid: function() {
      return this.collection.getInstituteLogoPathValid();
    },
    isCataloguesFolderPathValid: function() {
      return this.collection.getCataloguesFolderPathValid();
    },
    isEntityAcronymValid: function() {
      return this.collection.getEntityAcronymValid();
    },
    name: {
      get: function() {
        let name = this.collection.getName();
        if (this.collection.getNameValid().message === "temporary error") {
          this.addShakeEffect("create_collection_name_input");
        }
        return name;
      },
      set: async function(newValue) {
        let error = "";
        error = await this.collection.setName(newValue);
        if (error === "error") {
          this.openDialog("Ha ocurrido un error con la base de datos");
        }
      }
    },
    code: {
      get: function() {
        let code = this.collection.getCode();
        if (this.collection.getCodeValid().message === "temporary error") {
          this.addShakeEffect("create_collection_code_input");
        }
        return code;
      },
      set: async function(newValue) {
        await this.collection.setCode(newValue);
      }
    },
    instituteName: {
      get: function() {
        let instituteName = this.collection.getInstituteName();
        if (
          this.collection.getInstituteNameValid().message === "temporary error"
        ) {
          this.addShakeEffect("create_collection_institute_name_input");
        }
        return instituteName;
      },
      set: async function(newValue) {
        await this.collection.setInstituteName(newValue);
      }
    },
    instituteAcronym: {
      get: function() {
        let instituteAcronym = this.collection.getInstituteAcronym();
        if (
          this.collection.getInstituteAcronymValid().message ===
          "temporary error"
        ) {
          this.addShakeEffect("create_collection_institute_acronym_input");
        }
        return instituteAcronym;
      },
      set: async function(newValue) {
        await this.collection.setInstituteAcronym(newValue);
      }
    },
    entityAcronym: {
      get: function() {
        let entityAcronym = this.collection.getEntityAcronym();
        if (
          this.collection.getEntityAcronymValid().message === "temporary error"
        ) {
          this.addShakeEffect("create_collection_research_area_acronym_input");
        }
        return entityAcronym;
      },
      set: async function(newValue) {
        await this.collection.setEntityAcronym(newValue);
      }
    },
    entityName: {
      get: function() {
        let entityName = this.collection.getEntityName();
        if (
          this.collection.getEntityNameValid().message === "temporary error"
        ) {
          this.addShakeEffect("create_collection_research_area_input");
        }
        return entityName;
      },
      set: async function(newValue) {
        await this.collection.setEntityName(newValue);
      }
    },
    description: {
      get: function() {
        let description = this.collection.getDescription();
        if (
          this.collection.getDescriptionValid().message === "temporary error"
        ) {
          this.addShakeEffect("create_collection_description_input");
        }
        return description;
      },
      set: async function(newValue) {
        await this.collection.setDescription(newValue);
      }
    },
    instituteLogoPath: {
      get: function() {
        return this.collection.getInstituteLogoPath();
      },
      set: async function(newValue) {
        this.collection.setInstituteLogoPath(newValue);
      }
    },
    cataloguesFolderPath: {
      get: function() {
        return this.collection.getCataloguesFolderPath();
      },
      set: async function(newValue) {
        this.collection.setCataloguesFolderPath(newValue);
      }
    }
  },
  methods: {
    async setDirectory() {
      const { dialog } = require("electron").remote;
      var path = await dialog.showOpenDialog({
        properties: ["openDirectory"]
      });
      this.cataloguesFolderPath = path.filePaths[0];
    },
    checkFileExtension(file) {
      let fileName = file.name;
      let fileExtension =
        fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
        fileName;
      return (
        fileExtension === "png" ||
        fileExtension === "jpeg" ||
        fileExtension === "jpg"
      );
    },
    openDialog(message) {
      this.$buefy.dialog.alert(message);
    },
    setHelpText(message, active) {
      this.$store.dispatch("helpText/setActive", { active, message });
    },
    addShakeEffect(elementId) {
      let element = document.getElementById(elementId);
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

.create_collection_input_elements {
  width: 420px;
}

#create_collection_component {
  display: flex;
  align-self: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 50px;
}

.create_collection_content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10px;
}

.show_collection_info_attributes_div {
  flex-direction: column;
}

.create_collection_attribute_div_title {
  display: flex;
  align-items: center;
}

#show_collection_institute_logo {
  width: 200px;
}

#create_collection_directory_input_label {
  display: inline-block;
  cursor: pointer;
}

#create_collection_logo_image {
  margin-top: 20px;
  height: 200px;
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
