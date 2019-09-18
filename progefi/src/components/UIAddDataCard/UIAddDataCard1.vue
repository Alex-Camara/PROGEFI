<template>
  <!-- --------AddDataCard1 Component----- -->
  <div id="addDataCard1-component">
    <!-- --------AddDataCard1 Left Side----- -->
    <div id="addDataCard1-left-side" class="box has-background-light">
      <!-- --------AddDataCard1 Component Header----- -->
      <div id="addDataCard1-component-header">
        <p class="subtitle is-5">Sube un archivo</p>
      </div>

      <!-- --------AddDataCard1 Component Content----- -->
      <div id="addDataCard1-component-content" @change="saveFile()">
        <b-field class="file">
          <b-upload v-model="file" accept="image/*">
            <a class="button is-secondary">
              <b-icon icon="upload"></b-icon>
              <span>Selecciona para subir un archivo</span>
            </a>
          </b-upload>
          <span class="file-name" v-if="imageFile">{{ imageFile.name }}</span>
        </b-field>
      </div>

      <!-- --------AddDataCard1 Bottom Buttons----- -->
      <div id="addDataCard1-next-button" v-on:click="changeStep()">
        <b-button type="is-accent" :disabled="!imageFile">Siguiente</b-button>
      </div>
    </div>

    <!-- --------AddDataCard1 Right Side----- -->
    <div id="addDataCard1-right-side" class="box has-background-secondary">
      <!-- --------addDataCard1-component-image----- -->
      <div id="addDataCard1-component-image">
        <img id="uploadedImage" />
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store.js";

import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      file: null,
      src: "vacio"
    };
  },
  computed: {
    ...mapState("datacard", {
      imageFile: state => state.imageFile
    })
  },
  methods: {
    changeStep() {
      store.commit("datacard/changeActiveStep", 1);
    },
    saveFile() {
      console.log("Guardando la imagen...");
      store.commit("datacard/addImageFile", this.file);
      this.loadPreviewImage();
    },
    loadPreviewImage() {
      var preview = document.querySelector("img");
      var reader = new FileReader();

      reader.onloadend = function() {
        preview.src = reader.result;
      };

      if (this.imageFile) {
        reader.readAsDataURL(this.imageFile);
      } else {
        this.imageURL = "";
      }
    }
  }
};
</script>

<style lang="scss">
#addDataCard1-component {
  display: grid;
  grid-template-columns: 50% 50%;
  height: 400px;
  width: 100%;
  align-items: start;
  margin-top: 10px;
}

#addDataCard1-left-side {
  grid-column: 1 / 2;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  height: 100%;
  align-items: center;
  margin-right: 10px;
}

#addDataCard1-right-side {
  grid-column: 2 / 3;
  height: 100%;
  align-items: center;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
}

#addDataCard1-component-header {
  grid-row: 1 / 2;
  justify-self: center;
}

#addDataCard1-component-content {
  grid-row: 2 / 3;
  justify-self: center;
}

#addDataCard1-component-image {
  justify-content: center;
  max-height: 100%;
  max-width: 100%;
}

#uploadedImage {
  max-height: 100%;
  max-width: 100%;
}

#addDataCard1-next-button {
  grid-row: 3 / 4;
  justify-self: end;
}
</style>