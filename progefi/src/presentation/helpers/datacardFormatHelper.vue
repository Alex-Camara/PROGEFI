<template>
  <div>
    <div id="datacard" ref="datacard" v-observe-visibility="visibilityChanged">
      <!--<div id="datacard_header">Colección de vertebrados terrestres "Alvar cristhen"</div>

      <img id="datacard_image" :src="photoCollect.url" />

      <div id="datacard_data"></div>-->
      <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="item in layout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
        >{{item.i}}</grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store/store.js";
import VueGridLayout from "vue-grid-layout";
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data() {
    return {
      datacardFormat: {
        height: 600,
        width: 1050,
        backgroundColor: "#000000",
        fontColor: "#FFFFFF"
      },
      lifeStage: "adulta",
      sex: "Hembra",
      longitude: "-19.38",
      latitude: "190.392",
      altitude: "432msnm",
      vegetationType: "Selva mediana subperenifolia",
      locality: "Xalapa",
      municipality: "Tuxpan",
      state: "Veracruz",
      country: "México",
      collectDate: "29/01/19",
      collectHour: "01:12",
      device: "Nikon",
      model: "Coolpix L820 16Mpixel",
      collection: "Colección de vertebrados terrestres Alvar cristhen",
      catalogue: "Aves",
      layout: [
        { x: 0, y: 0, w: 2, h: 2, i: "0" },
        { x: 2, y: 0, w: 2, h: 4, i: "1" },
        { x: 4, y: 0, w: 2, h: 5, i: "2" },
        { x: 6, y: 0, w: 2, h: 3, i: "3" },
        { x: 8, y: 0, w: 2, h: 3, i: "4" },
        { x: 10, y: 0, w: 2, h: 3, i: "5" },
        { x: 0, y: 5, w: 2, h: 5, i: "6" },
        { x: 2, y: 5, w: 2, h: 5, i: "7" },
        { x: 4, y: 5, w: 2, h: 5, i: "8" },
        { x: 6, y: 3, w: 2, h: 4, i: "9" },
        { x: 8, y: 4, w: 2, h: 4, i: "10" },
        { x: 10, y: 4, w: 2, h: 4, i: "11" },
        { x: 0, y: 10, w: 2, h: 5, i: "12" },
        { x: 2, y: 10, w: 2, h: 5, i: "13" },
        { x: 4, y: 8, w: 2, h: 4, i: "14" },
        { x: 6, y: 8, w: 2, h: 4, i: "15" },
        { x: 8, y: 10, w: 2, h: 5, i: "16" },
        { x: 10, y: 4, w: 2, h: 2, i: "17" },
        { x: 0, y: 9, w: 2, h: 3, i: "18" },
        { x: 2, y: 6, w: 2, h: 2, i: "19" }
      ]
    };
  },
  computed: {
    ...mapState("datacard", {
      photoCollect: state => state.photoCollect
    })
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      this.isVisible = isVisible;
      console.log("validate visible");
      this.setDatacardStyle();
    },
    setDatacardStyle() {
      let columns = ["25%", "25%", "25%", "25%"];
      let datatardDOMElement = this.$refs.datacard;
      console.info(datatardDOMElement);
      //datatardDOMElement.style.backgroundColor = this.datacardFormat.backgroundColor;
      //datatardDOMElement.style.color = this.datacardFormat.fontColor;
      datatardDOMElement.style.height = this.datacardFormat.height;
      datatardDOMElement.style.width = this.datacardFormat.width;
      //datatardDOMElement.style.display = 'grid'
      //datatardDOMElement.style.gridTemplateRows = '"50px" "500px" "20px"';
      //datatardDOMElement.style.gridTemplateColumns = columns;
    }
  }
};
</script>

<style lang="scss">
#datacard {
  grid-row: 1/-1;
  display: grid;
  //grid-template-columns: 25% 25% 25% 25%;
  //grid-template-rows: 50px 500px 20px;
  //background-color: black;
  //height: 600px;
  //width: 1050px;
}

#datacard_header {
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  //color: white;
  justify-self: center;
  text-align: center;
  font-size: 20px;
}

#datacard_image {
  grid-column: 2 / -1;
  grid-row: 2 / -1;
  background-color: brown;
  //width: 30%;
  //height: 50%;
}

#datacard_data {
  grid-column: 1 / 2;
  grid-row: 2 / 4;
  height: 100px;
  background-color: chocolate;
  //color: white;
}
</style>