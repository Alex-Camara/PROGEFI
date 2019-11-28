<template>
  <div>
    <div id="mh_container" ref="mh_container" v-on:click="restoreMetadataValue()">
      <p id="mh_container_text">{{displayValue}}</p>
    </div>
  </div>
</template>

<script>
import store from "../store/store.js";
import { mapState } from "vuex";
import styleColors from "../style/style.scss";
import moment from "moment";

export default {
  name: "metadataHelper",
  props: ["selectedValue", "attribute"],
  data() {
    return {};
  },
  watch: {
    selectedValue(newValue, oldValue) {
      let documentElement = this.$refs.mh_container;

      if (documentElement != null) {
        switch (this.attribute) {
          /*case "collectHour":
            if (
              moment(newValue).format("HH:mm") ==
              moment(this.originalValue).format("HH:mm")
            ) {
              documentElement.style.backgroundColor = styleColors.secondary;
            } else {
              documentElement.style.backgroundColor = styleColors.accent;
            }
            break;*/
          default:
            if (newValue == this.originalValue) {
              documentElement.style.backgroundColor = styleColors.secondary;
            } else {
              documentElement.style.backgroundColor = styleColors.accent;
            }

            break;
        }
      }
    }
  },
  computed: {
    ...mapState("datacard", {
      datacardState: state => state.datacard
    }),
    ...mapState("metadata", {
      metadataState: state => state
    }),
    originalValue: function() {
      return this.metadataState[this.attribute];
    },
    displayValue: {
      get: function() {
        return this.originalValue;
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
        case "model":
          store.commit("device/restoreMetadataValue", {
            attribute: this.attribute,
            metadataValue: this.metadataState[this.attribute]
          });
          break;

        case "latitude":
        case "longitude":
        case "altitude":
          store.commit("coordinate/restoreMetadataValue", {
            attribute: this.attribute,
            metadataValue: this.metadataState[this.attribute]
          });
          break;

        case "formattedHour":
          store.commit(
            "datacard/setCollectHour",
            this.metadataState.collectHour
          );
          break;

        case "formattedDate":
          store.commit(
            "datacard/setCollectDate",
            this.metadataState.collectDate
          );
          break;

        default:
          store.commit("datacard/restoreMetadataValue", {
            attribute: this.attribute,
            metadataValue: this.metadataState[this.attribute]
          });
          break;
      }
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