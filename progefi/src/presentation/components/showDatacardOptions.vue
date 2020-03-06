<template>
  <div>
    <div id="show_datacard_options_container">
      <div id="show_datacard_options_return_button_div">
        <button
          id="show_datacard_options_return_button"
          class="button is-accent"
          @click="showDatacards()"
        >
          <img id="show_datacard_options_return_icon" :src="require('../assets/back.png')" />
          Regresar
        </button>
      </div>
      <!-- <div id="show_datacard_options_tab_buttons_div"> -->
      <!-- <button -->
      <!-- id="show_datacard_options_image_button" -->
      <!-- ref="show_datacard_options_image_button" -->
      <!-- class="button" -->
      <!-- @click="showImage()" -->
      <!-- >Imagen</button> -->
      <!-- <button -->
      <!-- id="show_datacard_options_information_button" -->
      <!-- ref="show_datacard_options_information_button" -->
      <!-- class="button" -->
      <!-- @click="showInformation()" -->
      <!-- >Información</button> -->
      <!-- </div> -->
      <div id="show_datacard_options_export_button_div">
        <button id="show_datacard_options_export_button" class="button is-secondary">
          <img id="show_datacard_options_export_icon" :src="require('../assets/export.png')" />
          Exportar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.showImage();
  },
  methods: {
    // showImage() {
    // let imageButton = this.$refs.show_datacard_options_image_button;
    // let informationButton = this.$refs
    // .show_datacard_options_information_button;
    //
    // imageButton.style.opacity = "0.5";
    // informationButton.style.opacity = "1";
    // this.$emit("showImage", true);
    // },
    // showInformation() {
    // let imageButton = this.$refs.show_datacard_options_image_button;
    // let informationButton = this.$refs
    // .show_datacard_options_information_button;
    //
    // imageButton.style.opacity = "1";
    // informationButton.style.opacity = "0.5";
    // this.$emit("showImage", false);
    // },
    showDatacards() {
      // this.$emit("showDatacards");
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";
#show_datacard_options_container {
  display: grid;
  grid-template-columns: 20% 60% 20%;
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
  grid-column: 3 / 4;
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
// #show_datacard_options_image_button:active {
// outline: none;
// }
#show_datacard_options_information_button {
  border-radius: 0px 30px 30px 0px;
  width: 140px;
  background-color: $secondary;
  border-color: $secondary;
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

