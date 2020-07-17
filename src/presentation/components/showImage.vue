<template>
  <div>
    <div id="show_image_container">
      <div id="show_image_box">
        <div id="show_image_content" class="gray_box">
          <img :src="getImage()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["imagePath"],
  methods:{
    getImage(path) {
      if (path !== ""){
        let src = "file://" + path;
        return src
      } else{
        return ""
      }
    },
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";
#show_image_container {
  display: grid;
  grid-template-columns: 100%;
  // justify-content: center;
  // text-align: center;
  width: 100%;
}
#show_image_box {
  grid-column: 1 / 2;
  justify-self: center;
  margin-bottom: 40px;
}
#show_image_content {
  width: 1000px;
  justify-self: center;
}
</style>