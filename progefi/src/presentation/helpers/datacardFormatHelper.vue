<template>
  <div>
    <div id="datacard" ref="datacard" v-observe-visibility="visibilityChanged">

      <grid-layout
        :responsive="false"
        :layout.sync="layout"
        :col-num="90"
        :row-height="25"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="false"
        :margin="[10, 10]"
        :use-css-transforms="true"
        :preventCollision="true"
      >
        <grid-item
          v-for="item in layout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
          :style="item.style"
        ><img :src="photoCollect.url" v-if="item.i == 'photocollect'">{{item.name}}</grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store/store.js";
import VueGridLayout from "vue-grid-layout";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  props: ["colorsEnabled"],
  data() {
    return {
      datacardFormat: {
        height: 800,
        width: 1250,
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
        { x: 25, y: 0, w: 90, h: 2, i: "collection",name: 'Colección de vertebrados terrestres Alvar cristhen', style:{'background-color': 'rgb(0, 172, 193, 0.8)', 'font-size': '20px', 'text-align': 'center'} },
        { x: 0, y: 2, w: 30, h: 2, i: "institute",name: 'Instituto de Investigaciones Biológicas de la UV', style:{'background-color':"rgb(0, 151, 167,0.8)" }},
        { x: 30, y: 2, w: 60, h: 16, i: "photocollect",name: '', style:{'background-color': 'rgb(255, 183, 77,0.8)'} },
        {x: 0,y: 4,w: 5,h: 1,i: "lifeStage",name: "Adulto",style: {'background-color': 'rgb(156, 204, 101, 0.8)'}},
        { x: 5, y: 4, w: 6, h: 1, i: "sex", name: 'Hembra',style: {'background-color': "rgb(124, 179, 66,0.8)" }},
        { x: 0, y: 5, w: 6, h: 1, i: "longitude",name: '-19.38', style:{'background-color': "rgb(100, 181, 246,0.8)"} },
        { x: 6, y: 5, w: 7, h: 1, i: "latitude",name: '190.392', style:{'background-color': "rgb(66, 165, 245, 0.8)" }},
        { x: 0, y: 6, w: 8, h: 1, i: "altitude",name: '432msnm', style:{'background-color': "rgb(30, 136, 229,0.8)" }},
        { x: 8, y: 6, w: 20, h: 1, i: "vegetationType",name: 'Selva mediana subperenifolia', style:{'background-color': "rgb(21, 101, 192, 0.8)" }},
        { x: 0, y: 7, w: 30, h: 1, i: "space1",name: '', style:{'background-color': "rgb(77, 208, 225,0.8)" }},
        { x: 0, y: 8, w: 6, h: 1, i: "locality",name: 'Xalapa', style:{'background-color': "rgb(25, 118, 210, 0.8)" }},
        { x: 6, y: 8, w: 6, h: 1, i: "municipality",name: 'Xalapa', style:{'background-color': "rgb(41, 121, 255,0.8)" }},
        { x: 12, y: 8, w: 7, h: 1, i: "countryState",name: 'Veracruz', style:{'background-color': "rgb(13, 71, 161, 0.8)" }},
        { x: 19, y: 8, w: 7, h: 1, i: "country",name: 'México', style:{'background-color': "rgb(33, 150, 243,0.8)" }},
        { x: 0, y: 9, w: 30, h: 1, i: "space2",name: '', style:{'background-color': "rgb(77, 208, 225,0.8)" }},
        { x: 0, y: 10, w: 8, h: 1, i: "collectDate",name: '29/01/19', style:{'background-color': "rgb(251, 140, 0, 0.8)" }},
        { x: 0, y: 11, w: 5, h: 1, i: "collectHour",name: '01:12', style:{'background-color': "rgb(255, 167, 38,0.8)" }},
        { x: 0, y: 12, w: 30, h: 1, i: "space3",name: '', style:{'background-color': "rgb(77, 208, 225, 0.8)" }},
        { x: 0, y: 13, w: 8, h: 1, i: "deviceTag",name: 'Dispositivo:', style:{'background-color': "rgb(251, 140, 0,0.8)"} },
        { x: 8, y: 13, w: 5, h: 1, i: "device",name: 'Nikon', style:{'background-color': "rgb(230, 81, 0,0.8)" }},
        { x: 13, y: 13, w: 16, h: 1, i: "model",name: 'Coolpix L820 16Mpixel', style:{'background-color': "rgb(255, 167, 38, 0.8)"} },
        { x: 0, y: 14, w: 6, h: 1, i: "collectorTag",name: '  Colector:', style:{'background-color': "rgb(251, 140, 0, 0.8)" }},
        { x: 6, y: 14, w: 15, h: 1, i: "collector",name: 'Isela Morales Martínez', style:{'background-color': "rgb(255, 145, 0,0.8)" }},
        { x: 0, y: 15, w: 6, h: 1, i: "curatorTag",name: 'Curador:', style:{'background-color': "rgb(251, 140, 0,0.8)" }},
        { x: 6, y: 15, w: 15, h: 1, i: "curator",name: 'Cristian Delfín Alfonso', style:{'background-color': "rgb(230, 81, 0, 0.8)" }},
        { x: 78, y: 15, w: 7, h: 1, i: "catalogueTag",name: 'Catálogo:', style:{'background-color': "rgb(251, 140, 0,0.8)" }},
        { x: 85, y: 16, w: 5, h: 1, i: "catalogue",name: 'Aves', style:{'background-color': "rgb(230, 81, 0, 0.8)" }},
        { x: 30, y: 16, w: 35, h: 1, i: "scientificName",name: 'Myiarchus tuberculifer', style:{'background-color': "rgb(104, 159, 56, 0.8)", 'font-style': 'italic' }}
      ],
      originalColors: []
    };
  },
  computed: {
    ...mapState("datacard", {
      photoCollect: state => state.photoCollect,
      datacard: state => state.datacard
    })
  },
  watch: {
    colorsEnabled(newValue, oldValue) {
      if(newValue){
        this.enableColors();
      }else{
        this.disableColors();
      }
    }
  },
  methods: {
    visibilityChanged(isVisible, entry) { //cambiar este metodo y colocarlo dentro del mount
      this.isVisible = isVisible;
      this.setDatacardStyle();
      this.setOriginalColors();
      this.setValues();
    },
    setDatacardStyle() {
      let datatardDOMElement = this.$refs.datacard;
      console.info(datatardDOMElement);
      datatardDOMElement.style.backgroundColor = this.datacardFormat.backgroundColor;
      datatardDOMElement.style.color = this.datacardFormat.fontColor;
      datatardDOMElement.style.height = this.datacardFormat.height;
      datatardDOMElement.style.width = this.datacardFormat.width;
    },
    setOriginalColors(){
      for (let i = 0; i < this.layout.length; i++) {
        const element = this.layout[i].style['background-color'];
        this.originalColors[i] = element;
      }
    },
    setValues(){
      var templateDatacardAttributes = ["country", "countryState", "municipality"]
       var templateDatacardSpeciesAttributes = ["scientificName", "sex", "lifeStage"]

      for (let i = 0; i < templateDatacardAttributes.length; i++) {
        let datacardAttribute = templateDatacardAttributes[i];
        var index = this.layout.findIndex(x => x.i == datacardAttribute);
        this.layout[index].name = this.datacard[datacardAttribute];
      }

      for (let i = 0; i < templateDatacardSpeciesAttributes.length; i++) {
        let datacardAttribute = templateDatacardSpeciesAttributes[i];
        var index = this.layout.findIndex(x => x.i == datacardAttribute);
        this.layout[index].name = this.datacard.species[datacardAttribute];
      }
    },
    disableColors(){
      for (let i = 0; i < this.layout.length; i++) {
        this.layout[i].style['background-color'] = '#000000'
      }
    },
    enableColors(){
      for (let i = 0; i < this.layout.length; i++) {
        this.layout[i].style['background-color'] = this.originalColors[i];
      }
    }
  }
};
</script>

<style lang="scss">
#datacard {
  display: grid;
  transform: scale(1);
}

</style>