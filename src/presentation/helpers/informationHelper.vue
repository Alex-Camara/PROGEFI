<template>
  <div>
    <img
      id="information_helper_info_icon"
      src="../assets/information.png"
      @mouseleave="setHelpText('', false)"
      @mouseenter="setHelpText(message, true)"
    />
  </div>
</template>

<script>
export default {
  name: "informationHelper",
  props: ["message"],
  methods: {
    setHelpText(message, active) {
      this.$store.dispatch("helpText/setActive", { active, message });
    }
  }
};
</script>

<style lang="scss">
#information_helper_info_icon {
  display: flex;
  height: 15px;
  width: 15px;
  margin-right: 5px;
  cursor: pointer;
  transition: 0.2s;
  align-self: center;
}

#information_helper_info_icon:hover {
  height: 18px;
  width: 18px;
  transition: 0.2s;
  margin-right: 2px;
}
</style>
