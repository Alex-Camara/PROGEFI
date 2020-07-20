<template>
  <div id="track_datacard_container">
    <div class="container_flex">
      <div id="track_datacard_left_side" class="container_flex_column gray_box">
        <div
          id="track_datacard_left_side_controls"
          class="container_flex_column"
        >
          <div id="track_datacard_left_side_title" class="container_flex">
            <information-helper
              id="track_datacard_information_message"
              :message="informationMessage"
            ></information-helper>
            <p class="subtitle_dark_gray is-5">{{ leftSideTitle }}</p>
          </div>

          <b-field id="track_datacard_file_upload" class="file">
            <b-upload v-model="file" accept="image/*" @input="loadFile()">
              <a class="button is-secondary">
                <b-icon icon="upload"></b-icon>
                <span>{{ uploadMessage }}</span>
              </a>
            </b-upload>
            <span class="file-name" v-if="file">{{ file.name }}</span>
          </b-field>

          <div id="track_datacard_image" v-if="file">
            <img :src="getImage(file.path)" />
          </div>
        </div>
      </div>

      <div
        id="track_datacard_right_side"
        class="container_flex_column white_box"
      >
        <div id="track_datacard_right_side_title" class="container_flex">
          <p class="title">{{ rigthSideTitle }}</p>
        </div>

        <progress
          id="trac_datacard_progress"
          class="progress is-accent"
          v-if="loading"
        ></progress>
        <div v-if="trackData">
          <div v-for="(title, index) in trackDataTitles" :key="index">
            <div class="container_flex">
              <p class="attribute_name">{{ title }}:</p>
              <p class="attribute_value">{{ trackData[index] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import informationHelper from "../helpers/informationHelper";
import Datacard from "../models/datacard";

export default {
  name: "uploadImage",
  components: {
    "information-helper": informationHelper
  },
  data() {
    return {
      leftSideTitle: "Carga una ficha de fotocolecta",
      informationMessage: "Solo se permiten imágenes con formato PNG",
      uploadMessage: "Selecciona para subir un archivo",
      file: null,
      trackData: null,
      rigthSideTitle: "Datos recuperados:",
      trackDataTitles: [
        "Código",
        "Colector",
        "Creador de la ficha",
        "Curador",
        "Instituto",
        "Fecha de creación",
        "Fecha de captura"
      ],
      loading: false,
      notSupportedFormatMessage: "Formato no soportado",
      notTrackingDataMessage:
        "El archivo no contiene información de rastreo compatible"
    };
  },
  methods: {
    getImage(path) {
      if (path !== ""){
        let src = "file://" + path;
        return src
      } else{
        return ""
      }
    },
    async loadFile() {
      this.loading = true;
      this.rigthSideTitle = "Descifrando información...";
      let isFileExtensionCorrect = this.checkFileExtension(this.file);
      if (isFileExtensionCorrect) {
        let base64 = await this.convertToBase64(this.file);
        try {
          this.trackData = await Datacard.decode(base64);
        } catch (e) {
          this.openDialog(this.notTrackingDataMessage);
          this.file = null;
          this.trackData = null;
        } finally {
          this.loading = false;
          this.rigthSideTitle = "Datos recuperados:";
        }
      } else {
        this.openDialog(this.notSupportedFormatMessage);
        this.loading = false;
        this.file = null;
        this.trackData = null;
        this.rigthSideTitle = "Datos recuperados:";
      }
    },
    checkFileExtension(file) {
      let fileName = file.name;
      let fileExtension =
        fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
        fileName;
      return fileExtension === "png";
    },
    convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    openDialog(message) {
      this.$buefy.dialog.alert(message);
    }
  }
};
</script>

<style scoped>
.container_flex {
  margin-bottom: 5px;
}
</style>

<style lang="scss">
#track_datacard_container {
  margin-top: 50px;
  height: 100%;
  width: 100%;
}

#track_datacard_left_side {
  min-height: 200px;
  width: 50%;
  margin-right: 10px;
}

#track_datacard_right_side {
  min-height: 200px;
  width: 50%;
  margin-left: 10px;
  justify-items: center;
  align-items: center;
}

#track_datacard_left_side_controls {
  display: flex;
  align-content: center;
  align-self: center;
  justify-content: center;
  height: 100%;
}

#track_datacard_left_side_title {
  align-items: center;
  margin-bottom: 20px;
}

#track_datacard_right_side_title {
  align-items: center;
  margin-bottom: 20px;
}

#track_datacard_image {
  margin-top: 20px;
}

#trac_datacard_progress {
  width: 100%;
}

#track_datacard_file_upload {
  align-self: center;
  justify-content: center;
}
</style>
