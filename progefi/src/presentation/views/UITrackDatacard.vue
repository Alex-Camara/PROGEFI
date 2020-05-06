<template>
  <div id="ui_track_datacard_component">
    <div id="ui_track_datacard_component_title">
      <p class="component_title">{{ title }}</p>
    </div>
    <div id="ui_track_datacard_component_content">
<track-datacard></track-datacard>
    </div>
  </div>
</template>

<script>
import trackDatacard from "../components/trackDatacard";
export default {
  name: "UITrackDatacard",
  components: {
    "track-datacard": trackDatacard
  },
  data() {
    return {
      title: "Rastrear ficha"
    };
  }
};
</script>

<style scoped>
#ui_track_datacard_component {
  display: grid;
  grid-template-rows: 10% 90%;
    height: 100%;
  justify-content: center;
}
#ui_track_datacard_component_title {
  grid-row: 1 / 2;
  display: flex;
  justify-self: center;
  align-self: center;
}

  #ui_track_datacard_component_content{
    grid-row: 2 / 3;
    margin-top: 20px;
    width: 1100px;
  }
</style>
