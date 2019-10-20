<template>
  <div id="ch_container">
    <div>
      <b class="is-size-6">Tipo de clima: {{selectedTitle}} </b>
      <img id="vh_checked_icon" src="../assets/checked.png" v-if="selectedTitle" />
      <div>
        <ul id="ch_list">
          <li
            id="bh_bubble"
            v-for="climateType in climateTypes"
            :key="climateType.code"
            :value="climateType.code"
            :style="{'background-color': '#' + climateType.colorCode}"
            v-on:click="showDescription(climateType.code)"
          >
            <div id="bh_bubble_text">{{climateType.code}}</div>
          </li>
        </ul>
      </div>
      <b-message type="is-info" v-text="selectedDescription"></b-message>
    </div>
  </div>
</template>

<script>
import store from "../store/store.js";
import { mapState } from "vuex";

export default {
  name: "climateTypeHelper",
  data() {
    return {
      selectedTitle: "",
      selectedDescription: ""
    };
  },
  mounted() {
    store.dispatch("climateType/getClimateTypes");
  },
  computed: {
    ...mapState("climateType", {
      climateTypes: state => state.climateTypes
    })
  },
  methods: {
    showDescription(climateCode) {
      let climateType = this.climateTypes.find(x => x.code === climateCode);
      this.selectedDescription = climateType.description;
      this.selectedTitle = climateType.code;
    }
  }
};
</script>

<style lang="scss">
#ch_container {
  height: 100%;
}

#ch_list {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 80px;
}

#bh_bubble {
  height: 30px;
  width: 30px;
  align-self: center;
  border-radius: 50%;
  line-height: 75px;
  transition: 0.3s;
}

#bh_bubble #bh_bubble_text {
  visibility: hidden;
}

#bh_bubble:hover {
  height: 75px;
  width: 75px;
  transition: 0.3s;
  cursor: pointer;
}

#bh_bubble_text {
  text-align: center;
  font-size: 0px;
}

#bh_bubble:hover #bh_bubble_text {
  visibility: visible;
  font-size: 16px;
  transition: 0.3s;
}
</style>