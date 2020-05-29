<template>
  <div id="ui_enter_container">
    <div id="ui_enter_container_background">
      <img id="ui_enter_background_image" src="../assets/intro.webp" />
    </div>
    <div id="ui_enter_container_content">
      <div id="ui_enter_container_content_introduction">
        <div id="ui_enter_container_information">
          <p id="title">{{title}}</p>
          <p class="text">{{ purposeText }}</p>
          <p class="subtitle_text">{{ subtitleText }}</p>
          <p class="text">{{ featureListText }}</p>
          <ul>
            <li v-for="feature in features" :key="feature" class="text">
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
      <div id="ui_enter_component">
        <register :user="user" v-if="user.getId() == null"></register>
        <login v-else @succesful-login="openSession($event)"></login>
      </div>
    </div>
  </div>
</template>

<script>
import register from "../components/register";
import login from "../components/logIn";
export default {
  name: "UIEnter",
  props:["user"],
  components: {
    register: register,
    login
  },
  data() {
    return {
      title: "PROGEFI",
      purposeText:
        "PROGEFI es una herramienta de software desarrollada por la Universidad " +
        "Veracruzana (UV). Esta aplicación se realizó a través de una colaboración " +
        "entre la Facultad de Estadística e Informática y el Instituto de " +
        "Investigaciones Biológicas de la UV.",
      subtitleText: "¿Qué características te ofrece?",
      featureListText:
        "PROGEFI te permite crear fichas provenientes de fotocolecta o de fotografías que aporten algún avistamiento sobre una especie determinada. Las fichas creadas por PROGEFI pueden ser personalizadas para mostrar datos de la institución que se desee, así como su apariencia. PROGEFI ofrece las siguientes características:",
      features: [
        "Permite personalizar las fichas generadas",
        "Provee un mecánismo de protección para cada ficha creada, lo cual permite identificar su origen",
        "Permite agilizar el proceso de generación de fichas al extraer metadatos de las imagenes",
        "Permite la exportación de los datos de las fichas de fotocolecta a una serie de formatos"
      ]
    };
  },
  methods:{
    openSession(user){
      this.$emit("succesful-login", user);
    }
  }
};
</script>

<style lang="scss" scoped>
  html,
  body {
    margin: 0;
    height: 100%;
    overflow: hidden;
  }
#title {
  font-size: 35px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}
.text {
  color: white;
  font-size: 14px;
}
.subtitle_text {
  color: white;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
}
ul {
  list-style-type: disc;
  margin-left: 10px;
}
li {
  margin-top: 5px;
  margin-left: 10px;
}
</style>

<style lang="scss">

#ui_enter_container_background {
  position: fixed;
  z-index: -1;
  pointer-events: none;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

#ui_enter_container {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
}
#ui_enter_container_content {
  width: 100%;
  height: 100%;
  display: flex;
}
#ui_enter_container_content_introduction {
  position: relative;
  width: 65%;
  margin: 40px;
  height: 100%;
  display: flex;
  /*background-color: #ec407a;*/
}
#ui_enter_container_information {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

#ui_enter_component {
  /*background-color: #4099ff;*/
  position: relative;
  display: flex;
  width: 35%;
  height: 100%;
  margin-top: 80px;
  margin-right: 40px;
}
#ui_enter_background_image {
  /*width: 100%;*/
  filter: brightness(60%);
}
</style>
