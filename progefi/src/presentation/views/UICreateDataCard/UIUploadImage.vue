<template>
  <!-- --------AddDataCard1 Component----- -->
  <div id="add_datacard_component">
    <!-- --------AddDataCard1 Left Side----- -->
    <div id="add_datacard_left_side" class="box">
      <!-- --------AddDataCard1 Component Header----- -->
      <div id="add_datacard_component_header">
        <information_helper :message="informationMessage"></information_helper>
        <p class="subtitle_dark_gray is-5">Sube el archivo de la fotocolecta</p>
      </div>

      <!-- --------AddDataCard1 Component Content----- -->
      <div id="add_datacard_component_content">
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
      <div id="add_datacard_next_button" @click="forwardStep()">
        <button class="button" type="is-accent" :disabled="disableNextButton()">Siguiente</button>
      </div>
    </div>

    <!-- --------AddDataCard1 Right Side----- -->
    <div id="add_datacard_right_side" class="box has-background-light">
      <!-- --------add_datacard_component_image----- -->
      <div id="add_datacard_component_image">
        <img
          id="uploaded_image"
          v-if="photoCollect.photoCollectPath != 'not-supported-format'"
          :src="photoCollect.photoCollectPath"
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
import informationHelper from "../../helpers/informationHelper";

export default {
  components: {
    "information_helper": informationHelper,
  },
  data() {
    return {
      // file: null,
      icon: require("../../assets/question.png"),
      informationMessage: "Los formatos permitidos son: jpeg, png, bmp y tiff..."
    };
  },
  computed: {
    ...mapState("addDatacard", {
      photoCollect: state => state.photoCollect,
      photoCollectPath: state => state.photoCollect.photoCollectPath,
      file: state => state.photoCollect.filePath
    }),
    file: {
      get: function() {
        return this.photoCollect.fileObject;
      },
      set: function(newValue) {
        store.dispatch("addDatacard/setPhotoCollect", newValue);
      }
    }
  },
  watch: {
    photoCollectPath(newValue, oldValue) {
      if (newValue == "not-supported-format") {
        this.file = null;
        this.openSnackBar("¡Formato no soportado!");
      }
    }
  },
  methods: {
    disableNextButton() {
      if (
        this.photoCollectPath != null &&
        this.photoCollectPath != "not-supported-format"
      ) {
        return false;
      } else {
        return true;
      }
      return false;
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
      store.commit("addDatacard/setActiveStep", 1);
    },
    setPhotoCollect() {
      store.dispatch("addDatacard/setPhotoCollect", this.file);
    }
  }
};
</script>

<style lang="scss">
@import "../../style/style.scss";
#add_datacard_component {
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100%;
  width: 100%;
  align-items: start;
  margin-top: 10px;
  //background-color: brown
}

#add_datacard_left_side {
  grid-column: 1 / 2;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  height: 100%;
  align-items: center;
  margin-right: 10px;
}

#add_datacard_right_side {
  grid-column: 2 / 3;
  height: 100%;
  max-height: 100%;
  align-items: center;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  //background-color:crimson;
}

#add_datacard_component_header {
  grid-row: 1 / 2;
  justify-self: center;
  text-align: center;
  height: 20px;
  display: flex;
  align-items: center;
}

#add_datacard_component_content {
  grid-row: 2 / 3;
  justify-self: center;
}

#add_datacard_component_image {
  justify-items: center;
  //margin-left: 60px;
  max-height: 100%;
  max-width: 100%;
}

#uploaded_image {
  max-height: 100%;
  max-width: 100%;
}

#add_datacard_next_button {
  grid-row: 3 / 4;
  justify-self: end;
}

#icon_info {
  align-self: center;
  transition: 0.2s;
  height: 15px;
  width: 15px;
  margin-right: 5px;
}

#icon_info:hover {
  transform: scale(1.5);
  transition: 0.2s;
  cursor: pointer;
}
</style>