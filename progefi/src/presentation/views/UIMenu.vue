<template>
  <div>
    <aside id="menu" class="menu">
      <p class="menu-label">Usuario</p>
      <ul class="menu-list">
        <li>
          <a id="menu-item">{{user.getName()}}</a>
        </li>
      </ul>
      <p class="menu-label">Fichas</p>

      <ul class="menu-list">
        <li
          v-for="item in items"
          v-bind:key="item.title"
          v-on:click="setSelection(item)"
        >
          <a id="menu-item" v-bind:class="item.classObject">{{ item.title }}</a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props:["user"],
  computed: {
    ...mapState("menu", {
      items: state => state.items
    })
  },
  async created() {
  },
  methods: {
    setSelection(menuItem) {
      if (!menuItem.classObject["disabled_item"]){
        this.$store.commit("menu/setItem", menuItem);
      }
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";

#menu {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  height: 600px;
  //background-color: $menu-background;
}

.disabled_item {
  pointer-events: none; //This makes it not clickable
  opacity: 0.6; //This grays it out to look disabled
}
</style>
