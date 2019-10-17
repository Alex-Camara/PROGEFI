<template>
  <!-- --------AddDataCard1 Component----- -->
  <div id="addDataCard1-component">
    <!-- --------AddDataCard1 Left Side----- -->
    <div id="addDataCard1-left-side" class="box">
      <!-- --------AddDataCard1 Component Header----- -->
      <div id="addDataCard1-component-header">
        <p class="subtitle is-5">
          <b-tooltip
            label="Los formatos permitidos son: jpeg, png, bmp y tiff."
            type="is-dark"
            position="is-top"
            animated
            multilined
          >
            <font-awesome-icon id="icon_info" icon="info-circle" pull="left" />
          </b-tooltip>Sube el archivo de la fotocolecta
        </p>
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
          <span
            class="file-name"
            v-if="photoCollect && photoCollect.url != 'not-supported-format'"
          >{{ photoCollect.name }}</span>
        </b-field>
      </div>

      <!-- --------AddDataCard1 Bottom Buttons----- -->
      <div id="addDataCard1-next-button" @click="forwardStep()">
        <button class="button" type="is-accent" :disabled="disableNextButton()">Siguiente</button>
      </div>
    </div>

    <!-- --------AddDataCard1 Right Side----- -->
    <div id="addDataCard1-right-side" class="box has-background-light">
      <!-- --------addDataCard1-component-image----- -->
      <div id="addDataCard1-component-image">
        <img
          id="uploadedImage"
          v-if="photoCollect.url != 'not-supported-format'"
          :src="photoCollect.url"
        />
      </div>
      <div v-if="photoCollect.loading">
        Procesando imagen, espere...
        <progress class="progress is-small is-accent" max="100"></progress>
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
  watch: {
    photoCollect(newValue, oldValue) {
      if (newValue.url == "not-supported-format") {
        this.file = null;
        this.openSnackBar("¡Formato no soportado!");
      }
    }
  },
  methods: {
    disableNextButton() {
      if (
        this.photoCollect.url != null &&
        this.photoCollect.url != "not-supported-format"
      ) {
        return false;
      } else {
        return true;
      }
    },
    openSnackBar(message) {
      this.$buefy.snackbar.open({
        message: message,
        type: "is-danger",
        position: "is-bottom",
        duration: 5000
      });
    },
    forwardStep() {
      store.commit("datacard/setActiveStep", 1);
    },
    setPhotoCollect() {
      store.dispatch("datacard/setPhotoCollect", this.file);
    }
  }
};
</script>

<style lang="scss">
@import "../../style/style.scss";
#addDataCard1-component {
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100%;
  width: 100%;
  align-items: start;
  margin-top: 10px;
  //background-color: brown
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
  //background-color:crimson;
}

#addDataCard1-component-header {
  grid-row: 1 / 2;
  justify-self: center;
  text-align: center;
}

#addDataCard1-component-content {
  grid-row: 2 / 3;
  justify-self: center;
}

#addDataCard1-component-image {
  justify-items: center;
  //margin-left: 60px;
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

#icon_info {
  color: $dark;
  padding-top: 5px;
  transition: 0.5s;
  font-size: 25px;
}

#icon_info:hover {
  transform:scale(1.5);
  transition: 0.5s;
}
</style>