<template>
  <div>
<!--    <div class="container_flex">-->
      <p id="template_thumbnail_title" class="subtitle">{{title}}</p>
<!--    </div>-->
    <div class="container_flex">
      <div id="template_thumbnail_container" class="gray_box">
        <div id="template_thumbnail_height">{{ height }}</div>
        <div id="template_thumbnail_width">{{ width }}</div>
        <div id="template_thumbnail_div">
          <div class="container_flex_column">
            <div
              id="template_thumbnail_dummy_text1"
              class="template_thumbnail_lines"
            >
              {{ testText1 }}
            </div>
            <div
              id="template_thumbnail_dummy_text2"
              class="template_thumbnail_lines"
            >
              {{ testText2 }}
            </div>
            <div
              id="template_thumbnail_dummy_text3"
              class="template_thumbnail_lines"
            >
              {{ testText3 }}
            </div>
            <div
              id="template_thumbnail_dummy_text4"
              class="template_thumbnail_lines"
            >
              {{ testText4 }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["template"],
  name: "templateThumbnailPreview",
  data() {
    return {
      title: "VISTA PREVIA:",
      testText1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      testText2: "Nulla ullamcorper diam quis elit vulputat",
      testText3: "Pellentesque quis metus eu metus ultrices rhoncus.",
      testText4:
        "Integer elit sapien, rutrum eget neque non, aliquet elementum massa."
    };
  },
  mounted() {
    this.setBackgroundColor(this.template.getBackgroundColor());
      this.setFontColor(this.template.getFontColor());
    this.setSize();
  },
  computed: {
    backgroundColor: function() {
      return this.template.getBackgroundColor();
    },
    fontColor: function() {
      return this.template.getFontColor();
    },
      fontSize: function() {
          return this.template.getFontSize();
      },
    height: function() {
      return this.template.getHeight();
    },
    width: function() {
      return this.template.getWidth();
    },
    fontFamily: function() {
      return this.template.getFontFamily();
    }
  },
  watch: {
    backgroundColor(newValue) {
      this.setBackgroundColor(newValue);
    },
    fontColor(newValue) {
      this.setFontColor(newValue);
    },
    height() {
      this.setSize();
    },
    width() {
      this.setSize();
    },
      fontSize() {
          this.setSize();
      },
    fontFamily(newValue) {
      this.setFontFamily(newValue);
    }
  },
  methods: {
    setBackgroundColor(color) {
      let thumbnail = document.getElementById("template_thumbnail_div");
      thumbnail.style.backgroundColor = color;
    },
    setFontColor(color) {
        let dummyTest1 = document.getElementById(
            "template_thumbnail_dummy_text1"
        );
        dummyTest1.style.color = color;

        let dummyTest2 = document.getElementById(
            "template_thumbnail_dummy_text2"
        );
        dummyTest2.style.color = color;
        let dummyTest3 = document.getElementById(
            "template_thumbnail_dummy_text3"
        );
        dummyTest3.style.color = color;

        let dummyTest4 = document.getElementById(
            "template_thumbnail_dummy_text4"
        );
        dummyTest4.style.color = color;

    },
    setFontFamily(fontFamily) {
      let dummyTest1 = document.getElementById(
              "template_thumbnail_dummy_text1"
      );
      dummyTest1.style.fontFamily = fontFamily;

      let dummyTest2 = document.getElementById(
              "template_thumbnail_dummy_text2"
      );
      dummyTest2.style.fontFamily = fontFamily;
      let dummyTest3 = document.getElementById(
              "template_thumbnail_dummy_text3"
      );
      dummyTest3.style.fontFamily = fontFamily;

      let dummyTest4 = document.getElementById(
              "template_thumbnail_dummy_text4"
      );
      dummyTest4.style.fontFamily = fontFamily;

    },
    setSize() {
      let partialWidth = 700;
      // let textWidth = 20;
      let percentageRatio = (partialWidth * 100) / this.width;
      let partialHeight = (percentageRatio * this.height) / 100;
      let thumbnail = document.getElementById("template_thumbnail_div");
      thumbnail.style.height = partialHeight + "px";
      thumbnail.style.width = partialWidth + "px";

        let partialTextWidth = (percentageRatio * this.fontSize) / 100;;
      let dummyTest1 = document.getElementById(
        "template_thumbnail_dummy_text1"
      );
      dummyTest1.style.fontSize = partialTextWidth + "px";

      let dummyTest2 = document.getElementById(
        "template_thumbnail_dummy_text2"
      );
      dummyTest2.style.fontSize = partialTextWidth + "px";

      let dummyTest3 = document.getElementById(
        "template_thumbnail_dummy_text3"
      );
      dummyTest3.style.fontSize = partialTextWidth + "px";

      let dummyTest4 = document.getElementById(
        "template_thumbnail_dummy_text4"
      );
      dummyTest4.style.fontSize = partialTextWidth + "px";
    }
  }
};
</script>

<style lang="scss">
@import "./../style/style.scss";

#template_thumbnail_title{
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: bold;
  justify-content: center;
  text-align: center;
}

#template_thumbnail_container {
  width: 100%;
  display: grid;
  grid-template-columns: auto 700px auto;
  grid-template-rows: 30px 80% 10%;
}

#template_thumbnail_height {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  display: flex;
  align-self: center;
  justify-self: end;
  margin-right: 5px;
  font-weight: bold;
  transition: 0.2s;
  padding: 3px;
}

#template_thumbnail_width {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  display: flex;
  font-weight: bold;
  align-self: center;
  justify-self: center;
  margin-bottom: 5px;
  transition: 0.2s;
  padding: 3px;
}

#template_thumbnail_div {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  transition: 0.2s;
  justify-content: center;
  margin-bottom: 20px;
}

.template_thumbnail_lines {
  margin-top: 10px;
  margin-left: 10px;
}
</style>
