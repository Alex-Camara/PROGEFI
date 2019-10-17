<template>
  <div>
    <div id="mh_container" ref="mh_container" v-on:click="restoreMetadataValue()">
      <p id="mh_container_text">{{displayValue}}</p>
    </div>
  </div>
</template>

<script>
import store from "../../store/store.js";
import { mapState } from "vuex";
import styleColors from "../../style/style.scss";

export default {
  name: "metadataHelper",
  props: ["originalValue", "selectedValue", "attribute"],
  data() {
    return {};
  },
  watch: {
    selectedValue(newValue, oldValue) {
      let documentElement = this.$refs.mh_container;
      if (documentElement != null) {
        switch (this.attribute) {
          case "collectHour":
            var moment = require("moment");
            if (moment(newValue).format("HH:mm") == moment(this.originalValue).format("HH:mm")) {
              
              documentElement.style.backgroundColor = styleColors.secondary;
            } else {
              documentElement.style.backgroundColor = styleColors.accent;
            }
            break;
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
      datacard: state => state.datacard
    }),
    displayValue: {
      get: function() {
        var moment = require("moment");
        if (this.attribute == "collectHour") {
          return moment(this.originalValue).format("HH:mm");
        } else {
          return this.originalValue;
        }
      },
      set: function(newValue) {
        this.displayValue = newValue;
      }
    }
  },
  methods: {
    restoreMetadataValue() {
      this.datacard[this.attribute] = this.originalValue;
    }
  }
};
</script>

<style lang="scss">
@import "../../style/style.scss";

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