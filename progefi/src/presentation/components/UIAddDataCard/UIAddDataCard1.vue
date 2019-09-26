<template>
  <!-- --------AddDataCard1 Component----- -->
  <div id="addDataCard1-component">
    <!-- --------AddDataCard1 Left Side----- -->
    <div id="addDataCard1-left-side" class="box">
      <!-- --------AddDataCard1 Component Header----- -->
      <div id="addDataCard1-component-header">
        <p class="subtitle is-5">Sube el archivo de la fotocolecta</p>
      </div>

      <!-- --------AddDataCard1 Component Content----- -->
      <div id="addDataCard1-component-content" @change="setPhotoCollect()">
        <b-field class="file">
          <b-upload v-model="file" accept="image/*">
            <a class="button is-secondary">
              <b-icon icon="upload"></b-icon>
              <span>Selecciona para subir un archivo</span>
            </a>
          </b-upload>
          <span class="file-name" v-if="photoCollect">{{ photoCollect.name }}</span>
        </b-field>
      </div>

      <!-- --------AddDataCard1 Bottom Buttons----- -->
      <div id="addDataCard1-next-button" @click="changeStep">
        <button class="button" type="is-accent" :disabled="!photoCollect.url">Siguiente</button>
      </div>
    </div>

    <!-- --------AddDataCard1 Right Side----- -->
    <div id="addDataCard1-right-side" class="box has-background-secondary">
      <!-- --------addDataCard1-component-image----- -->
      <div id="addDataCard1-component-image">
        <img id="uploadedImage" :src="photoCollect.url"/>
      </div>
    </div>
  </div>
</template>

<script>  
import store from "../../store/store.js";

import { mapState } from "vuex";

export default {
  data() {
    return {
      file: null
    };
  },
  computed: {
    ...mapState("datacard", {
      photoCollect: state => state.photoCollect
    })
  },
  methods: {
    changeStep() {
      store.commit("datacard/changeActiveStep", 1);
    },
    setPhotoCollect() {
      store.dispatch("datacard/setPhotoCollect", this.file);
    }
  }
};
</script>

<style lang="scss">
#addDataCard1-component {
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100%;
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
  max-height: 100%;
  align-items: center;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
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
  max-height: 80%;
  max-width: 80%;
}

#addDataCard1-next-button {
  grid-row: 3 / 4;
  justify-self: end;
}
</style>