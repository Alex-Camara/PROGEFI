<template>
  <div>
    <aside id="menu" class="menu">
      <p class="menu-label">Usuario</p>
      <ul class="menu-list">
        <li>
          <a id="menu-item">Cristian Alejandro</a>
        </li>
      </ul>
      <p class="menu-label">Fichas</p>
      <ul class="menu-list">
        <li v-for="item in items" v-bind:key="item.title" v-on:click="setSelection(item)">
          <a id="menu-item" v-bind:class="item.classObject">{{ item.title }}</a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          name: "",
          title: "Colecciones",
          classObject: {
            "is-active": false
          }
        },
        {
          name: "",
          title: "Catálogos",
          classObject: {
            "is-active": false
          }
        },
        {
          name: "UIShowDataCards",
          title: "Fichas de fotocolecta",
          classObject: {
            "is-active": false
          }
        },
        {
          name: "",
          title: "Investigadores",
          classObject: {
            "is-active": false
          }
        },
        {
          name: "",
          title: "Formatos",
          classObject: {
            "is-active": false
          }
        }
      ]
    };
  },
  created() {
    this.$router.push({ name: "UIShowDataCards" });
    this.setInitialSelection("Fichas de fotocolecta");
  },
  methods: {
    setInitialSelection(title) {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].title === title) {
          this.items[i].classObject = {
            "is-active": true
          };
        }
      }
    },
    setSelection(menuItem) {
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].classObject = {
          "is-active": false
        };
      }
      menuItem.classObject = {
        "is-active": true
      };
      this.$router.push({ name: menuItem.name });
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
  background-color: $menu-background;
}


</style>