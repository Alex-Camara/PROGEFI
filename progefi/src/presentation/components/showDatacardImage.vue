<template>
  <div>
    <div id="show_datacard_image_container">
      <div id="show_datacard_box">
        <div id="show_datacard_image_datacard" class="gray_box">
          <img :src="datacardPath + '/datacard.png'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["datacardPath"]
};
</script>

<style lang="scss">
@import "../style/style.scss";
#show_datacard_image_container {
  display: grid;
  grid-template-columns: 100%;
  // justify-content: center;
  // text-align: center;
  width: 100%;
}
#show_datacard_box {
  grid-column: 1 / 2;
  justify-self: center;
  margin-bottom: 40px;
}
#show_datacard_image_datacard {
  width: 1000px;
  justify-self: center;
}
</style>