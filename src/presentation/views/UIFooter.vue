<template>
  <div>
    <footer class="page-footer">
      <!-- Copyright -->
      <div id="footer-copyright-text">
        © 2020 Copyright:
        <a id="copyright_text" @click="openUVMainPage">Universidad Veracruzana</a>
        <a id="help_text" v-if="active">{{ helpText }}</a>
        <!-- Copyright -->
      </div>
    </footer>
  </div>
</template>

<script>
const { shell } = window.require("electron");
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("helpText", {
      helpText: state => state.helpText,
      active: state => state.active})
  },
  methods: {
    openUVMainPage() {
      shell.openExternal("https://www.uv.mx"); // Here I utilize the feature.
    }
  }
};
</script>

<style lang="scss">
  @import "../style/style.scss";

  .page-footer{
    background-color: #AFF9C9;
  }
#footer-copyright-text {
  font-size: 14px;
  font-weight: normal;
}#copyright_text{
   margin-right: 100px;
 }
#help_text{
  color: black;
  font-weight: bold;
}
</style>
