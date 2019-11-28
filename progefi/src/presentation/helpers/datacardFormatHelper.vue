<template>
  <div>
    <div id="datacard" ref="datacard" v-observe-visibility="visibilityChanged">
      <grid-layout
        :responsive="false"
        :layout.sync="layout"
        :col-num="90"
        :row-height="1"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="false"
        :margin="[2, 2]"
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
        >
          <img :src="photoCollect.photoCollectPath" v-if="item.i == 'photocollect'" />
          <img :src="collection.institute.imagePath" v-if="item.i == 'instituteLogo'" />
          {{item.name}}
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store/store.js";
import VueGridLayout from "vue-grid-layout";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  props: ["colorsEnabled"],
  data() {
    return {
      originalColors: [],
      storeModules: [
        {
          name: "datacard",
          allowedTags: ["collectDate", "collectHour"]
        },
        {
          name: "coordinate",
          allowedTags: ["latitude", "longitude", "altitude"]
        },
        { name: "catalogue", allowedTags: ["catalogue"] },
        { name: "collection", allowedTags: ["collection", "institute"] },
        { name: "vegetationType", allowedTags: ["vegetationType"] },
        { name: "climateType", allowedTags: ["climateType"] },
        { name: "collector", allowedTags: ["collector"] },
        { name: "curator", allowedTags: ["curator"] },
        { name: "device", allowedTags: ["device", "model"] },
        {
          name: "location",
          allowedTags: ["country", "countryState", "municipality", "locality"]
        },
        { name: "project", allowedTags: ["project"] },
        {
          name: "speciesData",
          allowedTags: [
            "scientificName",
            "commonName",
            "genus",
            "order",
            "family",
            "speciesClass",
            "phylum",
            "kingdom",
            "sex",
            "lifeStage"
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState("template", {
      template: state => state.template,
      layout: state => state.template.layout
    }),
    ...mapState("datacard", {
      photoCollect: state => state.photoCollect,
      datacard: state => state.datacard
    }),
    ...mapState("climateType", {
      climateType: state => state
    }),
    ...mapState("coordinate", {
      coordinate: state => state
    }),
    ...mapState("vegetationType", {
      vegetationType: state => state
    }),
    ...mapState("catalogue", {
      catalogue: state => state
    }),
    ...mapState("collection", {
      collection: state => state
    }),
    ...mapState("collector", {
      collector: state => state
    }),
    ...mapState("curator", {
      curator: state => state
    }),
    ...mapState("device", {
      device: state => state
    }),
    ...mapState("speciesData", {
      speciesData: state => state
    }),
    ...mapState("project", {
      project: state => state
    }),
    ...mapState("location", {
      location: state => state
    })
  },
  watch: {
    colorsEnabled(newValue, oldValue) {
      if (newValue) {
        this.enableColors();
      } else {
        this.disableColors();
      }
    }
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      if (isVisible) {
        this.setDatacardStyle();
        this.setOriginalColors();
        this.setValues();
      }
    },
    setDatacardStyle() {
      let datatardDOMElement = this.$refs.datacard;

      datatardDOMElement.style.backgroundColor = this.template.backgroundColor;
      datatardDOMElement.style.color = this.template.fontColor;
      datatardDOMElement.style.height = this.template.height;
      datatardDOMElement.style.width = this.template.width;
    },
    setValues() {
      console.log("setting values ...");
      var tags = this.template.tags;
      var layout = this.template.layout;

      for (let i = 0; i < this.storeModules.length; i++) {
        let storeModule = this.storeModules[i];
        for (let j = 0; j < storeModule.allowedTags.length; j++) {
          let tag = storeModule.allowedTags[j];
          let foundTag = tags.filter(obj => {
            return obj.tag === tag;
          });
          this.assignTags(layout, storeModule, foundTag[0]);
        }
      }
    },
    assignTags(layout, storeModule, tag) {
      if (tag !== undefined) {
        var index = layout.findIndex(x => x.i == tag.tag);
        let fullTag = null;

        fullTag = this.assignBeforeTag(tag);
        fullTag = this.assignTag(storeModule, fullTag, tag);
        fullTag = this.assignAfterTag(fullTag, tag);
        layout[index].name = fullTag;
      }
    },
    assignBeforeTag(tag) {
      if (tag.tagBefore != null) {
        //debugger;
        return tag.tagBefore + " ";
      } else {
        return "";
      }
    },
    assignTag(storeModule, fullTag, tag) {
      if (tag.valueName != null) {
        //debugger;
        return fullTag + this[storeModule.name][tag.tagValue][tag.valueName];
      } else {
        //debugger;
        return fullTag + this[storeModule.name][tag.tagValue];
      }
    },
    assignAfterTag(fullTag, tag) {
      if (tag.tagAfter != null) {
        return fullTag + " " + tag.tagAfter;
      } else {
        return fullTag;
      }
    },
    setOriginalColors() {
      for (let i = 0; i < this.layout.length; i++) {
        const element = this.layout[i].style["background-color"];
        this.originalColors[i] = element;
      }
    },
    disableColors() {
      for (let i = 0; i < this.layout.length; i++) {
        this.layout[i].style["background-color"] = "#000000";
      }
    },
    enableColors() {
      for (let i = 0; i < this.layout.length; i++) {
        this.layout[i].style["background-color"] = this.originalColors[i];
      }
    }
  }
};
</script>

<style lang="scss">
#datacard {
  display: grid;
  transform: scale(1);
  padding: 5px;
}
</style>