<template>
  <div>
    <div
      id="mh_container"
      ref="mh_container"
      v-on:click="restoreMetadataValue()">
      <p id="mh_container_text">{{ displayValue }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import styleColors from "../style/style.scss";

export default {
  name: "metadataHelper",
  props: ["selectedValue", "attribute"],
  data() {
    return {
      isMetadata: true
    };
  },
  watch: {
    selectedValue(newValue) {
      let documentElement = this.$refs.mh_container;
      if (documentElement != null) {
        if (newValue == this.getMetadataValue(this.attribute)) {
          documentElement.addEventListener("mouseenter", ()=>{
            this.setHelpText('El valor del campo coincide con el metadato recuperado', true)
          });
          documentElement.addEventListener("mouseleave", ()=>{
            this.setHelpText('', false)
          });
          documentElement.style.backgroundColor = styleColors.secondary;
          this.isMetadata = true;
        } else {
          documentElement.addEventListener("mouseenter", ()=>{
            this.setHelpText('Has clic para restaurar el valor del metadato...', true)
          })
          documentElement.addEventListener("mouseleave", ()=>{
            this.setHelpText('', false)
          })
          documentElement.style.backgroundColor = styleColors.accent;
          this.isMetadata = false;
        }
      }
    }
  },
  computed: {
    ...mapState("datacard", {
      datacard: state => state.datacard
    }),
    ...mapState("metadata", {
      metadataCollect: state => state.collect
    }),
    // originalValue: function() {
    //   return this.getMetadataValue(this.attribute);
    // },
    displayValue: {
      get: function() {
        return this.getMetadataValue(this.attribute);
      },
      set: function(newValue) {
        this.displayValue = newValue;
      }
    }
  },
  methods: {
    restoreMetadataValue() {
      switch (this.attribute) {
        case "device":
          {
            let metadataDevice = this.metadataCollect.getModel().getDevice();
            this.datacard
              .getCollect()
              .getModel()
              .setDevice(metadataDevice.getName());
          }
          break;
        case "model":
          {
            let metadataModel = this.metadataCollect.getModel();
            this.datacard.getCollect().setModel(metadataModel.getName());
          }
          break;
        case "latitude":
          {
            let metadataLatitude = this.metadataCollect.getLatitude();
            this.datacard.getCollect().setLatitude(metadataLatitude);
          }
          break;
        case "longitude":
          {
            let metadataLongitude = this.metadataCollect.getLongitude();
            this.datacard.getCollect().setLongitude(metadataLongitude);
          }
          break;
        case "altitude":
          {
            let metadataAltitude = this.metadataCollect.getAltitude();
            this.datacard.getCollect().setAltitude(metadataAltitude);
          }
          break;
        case "formattedHour":
          {
            let metadataCollectDate = this.metadataCollect.getCollectDate();
            this.datacard.getCollect().setCollectDate(metadataCollectDate);
          }
          break;
        case "formattedDate":
          {
            let metadataCollectDate = this.metadataCollect.getCollectDate();
            this.datacard.getCollect().setCollectDate(metadataCollectDate);
          }
          break;
        default:
          break;
      }
    },
    getMetadataValue(attribute) {
      switch (attribute) {
        case "device":
          return this.metadataCollect
            .getModel()
            .getDevice()
            .getName();
        case "model":
          return this.metadataCollect.getModel().getName();
        case "latitude":
          return this.metadataCollect.getLatitude();
        case "longitude":
          return this.metadataCollect.getLongitude();
        case "altitude":
          return this.metadataCollect.getAltitude();
        case "formattedHour":
          return this.metadataCollect.getFormattedCollectHour();
        case "formattedDate":
          return this.metadataCollect.getFormattedCollectDate();
        default:
          break;
      }
    },
    setHelpText(message, active) {
      this.$store.dispatch("helpText/setActive", { active, message });
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";

#mh_container {
  margin-top: 33px;
  line-height: 18px;
  width: 5px;
  height: 18px;
  background-color: $secondary;
  transition: 0.4s;
  text-align: center;
}

#mh_container #mh_container_text {
  visibility: hidden;
}

#mh_container:hover {
  margin-top: 27px;
  transition: 0.4s;
  width: 145px;
  height: 30px;
  background: $secondary;
  cursor: pointer;
}

#mh_container:hover #mh_container_text {
  transition: 0.4s;
  text-align: center;
  padding-top: 5px;
  font-size: 16px;
  color: black;
  visibility: visible;
}
</style>
