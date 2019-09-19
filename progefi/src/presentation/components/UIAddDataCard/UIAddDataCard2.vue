<template>
  <!-- --------AddDataCard2 Component----- -->
  <div id="addDataCard2-component">
    <!-- --------AddDataCard2 Left Side----- -->
    <div id="addDataCard1-left-side" class="box has-background-light">
      <!-- --------AddDataCard2 Component Header----- -->
      <div id="addDataCard2-component-header">
        <p class="subtitle is-5">Datos generales</p>
      </div>

      <!-- --------AddDataCard2 Component Content----- -->
      <div id="addDataCard2-component-content">
        <div id="content-form">
          <b-dropdown aria-role="list">
            <button class="button is-secondary" slot="trigger">
              <span>Colección</span>
              <b-icon icon="menu-down"></b-icon>
            </button>
          </b-dropdown>
        </div>
        <div id="content-image">
          <img />
        </div>
      </div>

      <!-- --------AddDataCard2 Bottom Buttons----- -->
      <div id="addDataCard2-bottom-buttons">
        <b-button type="is-light" v-on:click="backwardStep()">Anterior</b-button>
        <b-button type="is-accent" v-on:click="forwardStep()">Siguiente</b-button>
      </div>
    </div>

    <!-- --------AddDataCard2 Right Side----- -->
    <div id="addDataCard1-right-side" class="box has-background-secondary">
      <!-- --------addDataCard1-component-image----- -->
      <div id="addDataCard1-component-image">
        <img id="uploadedImage" />
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/store.js";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  created(){
    this.loadPreviewImage();
  },
  computed: {
    ...mapState("datacard", {
      imageFile: state => state.imageFile
    })
  },
  methods: {
    backwardStep() {
      store.commit("datacard/changeActiveStep", 0);
    },
    forwardStep() {
      store.commit("datacard/changeActiveStep", 1);
    },
    loadPreviewImage() {
      var preview = document.querySelector("img");
      var reader = new FileReader();

      reader.onloadend = function() {
        console.log("src: " + preview.src);
        preview.src = reader.result;
        console.log("imageURL: " + preview);
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
#addDataCard2-component {
  display: grid;
  grid-template-columns: 50% 50%;
  height: 400px;
  width: 100%;
  align-items: start;
  margin-top: 10px;
}

#addDataCard2-left-side {
  grid-column: 1 / 2;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  height: 100%;
  align-items: center;
  margin-right: 10px;
}

#addDataCard2-right-side {
  grid-column: 2 / 3;
  height: 100%;
  align-items: center;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
}

#addDataCard2-component-header {
  grid-row: 1 / 2;
  justify-self: center;
}

#addDataCard2-component-content {
  grid-row: 2 / 3;
  display: grid;
  grid-template-columns: 60% 40%;
}

#content-form {
  grid-column: 1 / 2;
  justify-self: start;
  align-self: start;
}

#content-image {
  grid-column: 2 / 3;
  justify-self: end;
}

#addDataCard2-bottom-buttons {
  grid-row: 3 / 4;
  justify-self: end;
}
</style>