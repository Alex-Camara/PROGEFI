<template>
  <div>
    <div id="show_datacard_options_container">
      <div id="show_datacard_options_export_button_div">
        <b-dropdown aria-role="list">
          <button
            id="show_datacard_export_button"
            class="button"
            slot="trigger"
            :disabled="disabled"
          >
            <img
              id="show_datacard_options_export_icon"
              :src="require('../assets/export.png')"
            />
            {{ exportText }}
          </button>
          <p class="export_button_option_information">Imagen</p>

          <b-dropdown-item
            id="export_button_export_options"
            aria-role="listitem"
            v-for="option in imageExportOptions"
            :key="option.format"
            @click="setDirectory(option.format)"
          >
            <label>
              {{ option.format }}
            </label>
          </b-dropdown-item>

          <p class="export_button_option_information">Información</p>
          <b-dropdown-item
            id="export_button_export_options"
            aria-role="listitem"
            v-for="option in dataExportOptions"
            :key="option.format"
            @click="setDirectory(option.format)"
          >
            <label>
              {{ option.format }}
            </label>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Datacard from "../models/datacard";
export default {
  props: ["datacards", "disabled"],
  data() {
    return {
      exportText: "Exportar",
      returnText: "Regresar",
      selectedExportationFormat: "",
      imageExportOptions: [
        { format: "JPEG" },
        { format: "PNG" },
        { format: "TIFF" },
        { format: "BMP" },
        { format: "PDF" }
      ],
      dataExportOptions: [{ format: "CSV" }],
      activeFileExplorer: false,
      file: "",
      loadingExportationFinished: "Exportación completa"
    };
  },
  methods: {
    showDatacards() {
      this.$router.go(-1);
    },
    async setDirectory(format) {
      this.selectedExportationFormat = format;
      const { dialog } = require("electron").remote;
      var path = await dialog.showOpenDialog({
        properties: ["openDirectory"]
      });
      if (!path.canceled) {
        let destinationDirectory = path.filePaths[0];
        // let destinationDirectory = event.path[0].files[0].path;
        try {
          await this.$store.dispatch(
            "loading/setActive",
            { active: true, message: "Exportando..." },
            { root: true }
          );
          await Datacard.export(
            this.datacards,
            this.selectedExportationFormat,
            destinationDirectory
          );
          this.openToast(this.loadingExportationFinished);
        } catch (e) {
          this.openDialog(e);
        } finally {
          this.activeFileExplorer = false;
          await this.$store.dispatch(
            "loading/setActive",
            { active: false, message: null },
            { root: true }
          );
        }
      }
    },
    openToast(message) {
      this.$buefy.toast.open(message);
    },
    openDialog(message) {
      this.$buefy.dialog.alert(message);
    }
  }
};
</script>

<style scoped>
label {
  display: inline-block;
  width: 5em;
  padding: 0 1em;
  text-align: right;
}

/* Hide the file input using
  opacity */
[type="file"] {
  position: absolute;
  filter: alpha(opacity=0);
  opacity: 0;
}
input,
[type="file"] + label {
  border: 1px solid #ccc;
  border-radius: 3px;
  text-align: left;
  padding: 10px;
  width: 100%;
  height: 100%;
  margin: 0;
  left: 0;
  position: relative;
  cursor: pointer;
}
[type="file"] + label {
  text-align: center;
  left: 7.35em;
  top: 0.5em;
  /* Decorative */
  background: #333;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>

<style lang="scss">
@import "../style/style.scss";
#show_datacard_options_container {
  display: flex;
  /*grid-template-columns: 20% 60% 20%;*/
  width: 100%;
  //   background-color: aquamarine;
}

#show_datacard_options_return_button_div {
  grid-column: 1 / 2;
}
#show_datacard_options_tab_buttons_div {
  grid-column: 2 / 3;
  justify-self: center;
}
#show_datacard_options_export_button_div {
  //grid-column: 3 / 4;
  justify-self: end;
}

#show_datacard_options_return_button {
  color: black;
}
#show_datacard_options_image_button {
  border-radius: 30px 0px 0px 30px;
  justify-self: end;
  width: 140px;
  background-color: $secondary;
  border-color: $secondary;
}

#show_datacard_options_information_button {
  border-radius: 0px 30px 30px 0px;
  width: 140px;
  background-color: $secondary;
  border-color: $secondary;
}

#show_datacard_export_button {
  background-color: $secondary;
}

.export_button_option_information {
  margin-left: 15px;
  color: darkgray;
}

#show_datacard_options_export_option {
  cursor: pointer;
  display: inline;
}

#show_datacard_options_export_icon {
  height: 15px;
  width: 15px;
  margin-right: 10px;
}
#show_datacard_options_return_icon {
  height: 15px;
  width: 15px;
  margin-right: 10px;
}
</style>
