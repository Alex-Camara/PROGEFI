<template>
  <div id="ui_show_template_container">
    <div id="ui_show_catalogue_component_title">
      <p class="component_title_return" @click="returnToTemplates()">
        {{ returnToTemplatesTitle }}
      </p>
      <img class="component_title_separator" src="../assets/bar.png" />
      <p class="component_title">{{ title }}</p>
    </div>

    <div id="ui_show_template_component_content" v-if="template">
      <b-tabs v-model="activeTab" position="is-centered">
        <b-tab-item label="Imagen muestra">
          <div>
            <show-image :image-path="getImage()"></show-image>
          </div>
        </b-tab-item>
        <b-tab-item label="Información">
          <div>
            <show-template-info
              :template="template"
              :editMode="editMode"
            ></show-template-info>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>

    <div
      id="ui_show_template_delete_button"
      class="float_button_delete"
      @click="deleteTemplate()"
      @mouseleave="setHelpText('', false)"
      @mouseenter="setHelpText(helpTextDelete, true)"
    >
      <img
        class="float_button_icon"
        v-if="!editMode"
        :src="require('../assets/trash.png')"
      />
      <img
        class="float_button_icon"
        v-if="editMode"
        :src="require('../assets/close.png')"
      />
    </div>

    <div
      class="float_button"
      id="ui_show_template_edit_button"
      @click="editTemplate()"
      @mouseleave="setHelpText('', false)"
      @mouseenter="setHelpText(helpTextEdit, true)"
    >
      <img
        class="float_button_icon"
        v-if="!editMode"
        :src="require('../assets/edit.png')"
      />
      <img
        class="float_button_icon"
        v-if="editMode"
        :src="require('../assets/correct.png')"
      />
    </div>
  </div>
</template>

<script>
import showTemplateInfo from "../components/showTemplateInfo";
import showImage from "../components/showImage";
import Template from "../models/template";
import path from "path";

export default {
  props: ["template"],
  components: {
    "show-template-info": showTemplateInfo,
    "show-image": showImage
  },
  data() {
    return {
      samplePath: "",
      returnToTemplatesTitle: "Plantillas",
      editMode: false,
      activeTab: 0,
      helpTextEdit: "Editar plantilla...",
      helpTextDelete: "Eliminar plantilla...",
      originalTemplate: new Template()
    };
  },
  computed: {
    isTemplateValid: function() {
      if (this.template) {
        if (
          this.template.getNameValid().isValid &&
          this.template.getFontFamilyValid().isValid &&
          this.template.getFontColorValid().isValid &&
          this.template.getBackgroundColorValid().isValid &&
          this.template.getHeightValid().isValid &&
          this.template.getWidthValid().isValid &&
          this.template.getMarginXValid().isValid &&
          this.template.getMarginYValid().isValid
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    title: function() {
      return this.template.getName();
    }
  },
  watch: {
    isTemplateValid(newValue) {
      let saveChangesButton = document.getElementById(
        "ui_show_template_edit_button"
      );
      if (!newValue && this.editMode) {
        saveChangesButton.classList.add("float_button_lateral_disabled");
      } else {
        saveChangesButton.classList.remove("float_button_lateral_disabled");
      }
    }
  },
  mounted() {
    if (this.template) {
      this.samplePath = this.template.getSamplePath();
    }
  },
  methods: {
    returnToTemplates() {
      this.$router.push({
        name: "UIShowTemplates"
      });
    },
    getImage() {
      if (this.template) {
        if (process.env.NODE_ENV !== "production") {
          let relativePath =
            path.join(__dirname, "..", "..", "..", "..", "..", "..") +
            "/src/persistence/resources/template_samples/" +
            this.template.getSamplePath();
          let src = "file://" + relativePath;
          return src;
        } else {
          let relativePath =
            path.join(__dirname, "..", "..") +
            "/src/persistence/resources/template_samples/" +
            this.template.getSamplePath();
          let src = "file://" + relativePath;
          return src;
        }
      }
    },

    editTemplate() {
      if (this.editMode) {
        this.editMode = !this.editMode;
        this.modifyButton();
        this.$store.dispatch("loading/setActive", {
          active: true,
          message: this.loadingMessage
        });
        this.template
          .update()
          .then(() => {
            this.$store.dispatch("loading/setActive", {
              active: false,
              message: null
            });
            this.openToast("La plantilla ha sido actualizada");
          })
          .catch(() => {
            this.openToast("Ha ocurrido un error con la base de datos");
          });
      } else {
        this.originalTemplate.setTemplate(this.template);
        this.template.getFonts();
        this.editMode = !this.editMode;
        this.modifyButton();
      }
    },
    async deleteTemplate() {
      if (this.editMode) {
        this.editMode = false;
        this.template.setTemplate(this.originalTemplate);
        this.modifyButton();
      } else {
        let datacardCount = this.template.getNotValidatedDatacards();
        if (datacardCount > 0) {
          this.openInformationDialog(
            "Esta plantilla tiene: " +
              this.getDatacardCountPhrase(datacardCount) +
              " para poder eliminar esta."
          );
        } else {
          let confirmation = await this.openConfirmDialog(
            "¿Deseas eliminar esta plantilla?"
          );
          if (confirmation) {
            this.template.delete().then(() => {
              this.openToast("La plantilla ha sido eliminada");
              this.returnToTemplates();
            });
          }
        }
      }
    },
    getDatacardCountPhrase(datacardCount) {
      if (datacardCount === 1) {
        return (
          datacardCount +
          " FICHA sin validar asociada, por favor primero valida la ficha o cambia su plantilla asociada"
        );
      } else {
        return (
          datacardCount +
          " FICHAS sin validar asociadas, por favor primero valida las fichas o cambia sus plantillas asociadas"
        );
      }
    },
    openInformationDialog(message) {
      this.$buefy.dialog.alert(message);
    },
    openConfirmDialog(message) {
      return new Promise(resolve => {
        this.$buefy.dialog.confirm({
          message: message,
          type: "is-danger",
          confirmText: "Eliminar plantilla",
          cancelText: "Cancelar",
          onConfirm: () => {
            resolve(true);
          },
          onCancel: () => {
            resolve(false);
          }
        });
      });
    },
    openToast(message) {
      this.$buefy.toast.open(message);
    },
    modifyButton() {
      let deleteButton = document.getElementById(
        "ui_show_template_delete_button"
      );
      let editButton = document.getElementById("ui_show_template_edit_button");
      if (this.editMode) {
        this.helpTextEdit = "Guardar cambios...";
        this.helpTextDelete = "Cancelar edición...";
        editButton.classList.toggle("float_button_lateral");
        deleteButton.classList.remove("float_button_delete");
        deleteButton.classList.add("float_button", "float_cancel_style");
      } else {
        this.helpTextEdit = "Editar...";
        this.helpTextDelete = "Eliminar...";
        editButton.classList.remove("float_button_lateral");
        editButton.classList.remove("float_button_lateral_disabled");
        editButton.classList.add("float_button");
        deleteButton.classList.remove("float_button", "float_cancel_style");
        deleteButton.classList.add("float_button_delete");
      }
    },
    setHelpText(message, active) {
      this.$store.dispatch("helpText/setActive", { active, message });
    }
  }
};
</script>

<style lang="scss">
#ui_show_template_container {
  display: grid;
  grid-template-rows: 10% 5% 85%;
  height: 100%;
  height: 500px;
}
#ui_show_template_component_title {
  grid-row: 1 / 2;
  display: flex;
  justify-self: center;
  align-self: center;
}

#ui_show_template_component_content {
  grid-row: 3 / 4;
  /*display: flex;*/
  /*flex-basis: fit-content;*/
  /*height: 100%;*/
  width: 1000px;
  justify-self: center;
}
</style>
