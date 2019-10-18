<template>
  <div id="ch_container">
    <div>
      <b class="is-size-6">Tipo de clima: {{title}}</b>
      <div>
        <ul id="list">
          <li
            id="bubble"
            v-for="climateType in climateTypes"
            :key="climateType.code"
            :value="climateType.code"
            :style="{'background-color': '#' + climateType.colorCode}"
            v-on:click="showDescription(climateType.code)"
          >
            <div id="bubble_text">{{climateType.code}}</div>
          </li>
        </ul>
      </div>
      <b-message type="is-info" v-text="description"></b-message>
    </div>
  </div>
</template>

<script>
import store from "../store/store.js";
import { mapState } from "vuex";

export default {
  name: 'climateTypeHelper',
  data() {
    return {
      title: null,
      description: null
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
      this.description = climateType.description;
      this.title = climateType.code;
    }
  }
};
</script>

<style lang="scss">
#ch_container{
  height: 100%;
}

#list {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 80px;
}

li {
  float: left;
}

#bubble {
  height: 30px;
  width: 30px;
  align-self: center;
  border-radius: 50%;
  display: inline-block;
  line-height: 75px;
  transition: 0.5s;
}

#bubble #bubble_text {
  visibility: hidden;
}

#bubble:hover {
  height: 75px;
  width: 75px;
  transition: 0.5s;
  cursor: pointer;
}

#bubble_text {
  text-align: center;
  font-size: 0px;
}

#bubble:hover #bubble_text {
  visibility: visible;
  font-size: 16px;
  transition: 0.5s;
}
</style>