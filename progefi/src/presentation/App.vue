<template>
  <div id="main-container">
    <div id="main-header" class="sticky">
      <UINavBar></UINavBar>
    </div>
    <div id="main-menu" class="stickyMenu">
      <UIMenu id="UIMenu"></UIMenu>
    </div>
    <div id="main-content">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
    <div id="main-footer"></div>
    <modal-helper></modal-helper>
    <loading-helper></loading-helper>
  </div>
</template>

<script>
import UINavBar from "./views/UINavBar.vue";
import UIMenu from "./views/UIMenu.vue";
import modalHelper from "./helpers/modalHelper.vue";

export default {
  components: {
    UINavBar,
    UIMenu,
    "modal-helper": modalHelper
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "/style/style.scss";
#main-container {
  display: grid;
  width: 100%;
  height: 700px;
  grid-template-columns: 1fr 6fr;
  grid-template-rows: 50px 700px 10px;
  grid-gap: 3px;
}

#main-header {
  grid-row: 1 / 2;
  grid-column: 1 / -1;
}

#main-menu {
  grid-column: 1 / 2;
  grid-row: 2 / -1;
  background-color: #f5f5f5;
}

#main-content {
  grid-row: 2 / 3;
  grid-column: 2 / -1;
  z-index: 0;
  //background-color: red;
}

#main-footer {
  grid-column: 2 / -1;
  grid-row: 3 / 4;
}

.sticky {
  background-color: #f8f6f6;
  position: fixed;
  width: 100%;
  height: 50px;

  z-index: 1;
  top: 0;
  left: 0;
}

.stickyMenu {
  background-color: #f8f6f6;
  position: fixed;
  grid-row: 2 / -1;
  width: 200px;

  z-index: 1;
  top: 50px;
}

.bordered {
  border: 0.5px solid black;
}

.gray_box {
  background-color: #f2f2f2;
  border-radius: 10px 10px 10px 10px;
  border-color: $light;
  padding: 20px 20px 20px 20px;
  // height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 1s;
}

.fade-enter-active {
  transition-delay: 1s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

@media screen and (max-width: 1200px) {
  .stickyMenu {
    width: 175px;
  }
}

/* ------------PARA OCULTAR EL SCROLLBAR-------------*/
::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
}
/* ---------------------------------------------------*/
</style>
