<template>
  <div>
    <div id="sex_helper_container" class="box">
      <div id="sex_helper_container_header">
        <b class="is-size-6">
          Sexo: {{ selectedSex }}
          <img
            id="sex_helper_checked_icon"
            src="../assets/checked.png"
            v-if="selectedSex"
          />
        </b>
      </div>

      <div
        id="sex_helper_male"
        @mouseleave="sexes[0].symbol=require('../assets/male.png')"
        @mouseover="sexes[0].symbol=require('../assets/male_accent.png')"
        @click="setSex(sexes[0].name)"
      >
        <img :src="sexes[0].symbol" />
      </div>
      <div id="sex_helper_male_text">
        <p v-text="sexes[0].name"></p>
      </div>

      <div
        id="sex_helper_female"
        @mouseleave="sexes[1].symbol=require('../assets/female.png')"
        @mouseover="sexes[1].symbol=require('../assets/female_accent.png')"
        @click="setSex(sexes[1].name)"
      >
        <img :src="sexes[1].symbol" />
      </div>
      <div id="sex_helper_female_text">
        <p v-text="sexes[1].name"></p>
      </div>

      <div
        id="sex_helper_indeterminate"
        @mouseleave="sexes[2].symbol=require('../assets/question.png')"
        @mouseover="sexes[2].symbol=require('../assets/question_accent.png')"
        @click="setSex(sexes[2].name)"
      >
        <img :src="sexes[2].symbol" />
      </div>
      <div id="sex_helper_indeterminate_text">
        <p v-text="sexes[2].name"></p>
      </div>

      <div
        id="sex_helper_addOption"
        @mouseleave="sexes[3].symbol=require('../assets/more.png')"
        @mouseover="sexes[3].symbol=require('../assets/more_accent.png')"
        @click="addOption()"
      >
        <img :src="sexes[3].symbol" />
      </div>
      <div id="sex_helper_addOption_text">
        <p v-text="sexes[3].name"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sexes: [
        { name: "Macho", symbol: require("../assets/male.png") },
        { name: "Hembra", symbol: require("../assets/female.png") },
        { name: "Indeterminado", symbol: require("../assets/question.png") },
        { name: "Otro", symbol: require("../assets/more.png") }
      ],
      selectedSex: ""
    };
  },
  methods: {
    setSex(sex) {
      this.selectedSex = sex;
    },
    addOption() {
      this.$buefy.dialog.prompt({
        type: 'is-secondary',
        message: `Introduce el sexo`,
        confirmText: 'Agregar',
        cancelText: 'Cancelar',
        inputAttrs: {
          maxlength: 20
        },
        trapFocus: true,
        onConfirm: value => this.setSex(value)
      });
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";

#sex_helper_container {
  display: grid;
  grid-template-rows: 40px 60px 20px;
  grid-template-columns: 25% 25% 25% 25%;
  justify-items: center;
  align-items: center;
}

#sex_helper_container_header {
  grid-row: 1 / 2;
  grid-column: 1 / -1;
  justify-self: start;
  align-self: start;
}

#sex_helper_checked_icon {
  height: 20px;
  width: 20px;
  align-self: center;
}

#sex_helper_male {
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  transition: 0.1s;
}

#sex_helper_male:hover {
  border-color: $accent;
  height: 45px;
  width: 45px;
  transition: 0.1s;
  cursor: pointer;
}

#sex_helper_male:hover + #sex_helper_male_text {
  font-weight: bold;
}

#sex_helper_male_text {
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  text-align: center;
  width: 40px;
  font-size: 14px;
}

#sex_helper_female {
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  transition: 0.1s;
}

#sex_helper_female:hover {
  border-color: $accent;
  height: 45px;
  width: 45px;
  transition: 0.1s;
  cursor: pointer;
}

#sex_helper_female:hover + #sex_helper_female_text {
  font-weight: bold;
}

#sex_helper_female_text {
  grid-row: 3 / 4;
  grid-column: 2 / 3;
  text-align: center;
  width: 50px;
  font-size: 14px;
}

#sex_helper_indeterminate {
  grid-row: 2 / 3;
  grid-column: 3 / 4;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  transition: 0.1s;
}

#sex_helper_indeterminate_text {
  grid-row: 3 / 4;
  grid-column: 3 / 4;
  font-size: 14px;
}

#sex_helper_indeterminate:hover {
  border-color: $accent;
  height: 45px;
  width: 45px;
  transition: 0.1s;
  cursor: pointer;
}

#sex_helper_indeterminate:hover + #sex_helper_indeterminate_text {
  font-weight: bold;
}

#sex_helper_addOption {
  grid-row: 2 / 3;
  grid-column: 4 / 5;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  transition: 0.1s;
}

#sex_helper_addOption:hover {
  height: 45px;
  width: 45px;
  transition: 0.1s;
  cursor: pointer;
}

#sex_helper_addOption_text {
  grid-row: 3 / 4;
  grid-column: 4 / 5;
  font-size: 14px;
}

#sex_helper_addOption:hover + #sex_helper_addOption_text {
  font-weight: bold;
}
</style>