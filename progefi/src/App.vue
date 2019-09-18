<template>
  <div id="main-container">
    <div id="main-header">
      <UINavBar></UINavBar>
    </div>
    <div id="main-menu">
      <UIMenu id="UIMenu"></UIMenu>
    </div>
    <div id="main-content">
      <router-view></router-view>
    </div>
    <div id="main-footer"></div>
  </div>
</template>

<script>
import UINavBar from "./components/UINavBar.vue";
import UIMenu from "./components/UIMenu.vue";

export default {
  components: {
    UINavBar,
    UIMenu
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">

#main-container {
  display: grid;
  width: 100%;
  height: 715px;
  grid-template-columns: 1fr 6fr;
  grid-template-rows: 1fr 18fr 0.75fr;
  grid-gap: 3px;
}

#main-header {
  grid-row: 1 / 2;
  grid-column: 1 / -1;
}

#main-menu {
  grid-column: 1 / 2;
  grid-row: 2 / -1;
}

#main-content {
  grid-row: 2 / 3;
  grid-column: 2 / -1;
}

#main-footer {
  grid-column: 2 / -1;
  grid-row: 3 / 4;
}

/* ------------PARA OCULTAR EL SCROLLBAR-------------*/
::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
}
/* ---------------------------------------------------*/

</style>
