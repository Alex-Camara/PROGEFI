<template>
  <div>
    <div id="required_field_helper">
      <b-tooltip :label="tooltipValue" position="is-top" type="is-warning" animated>
        <div id="required_icon" ref="required_icon"></div>
      </b-tooltip>
      <div>{{name}}</div>
    </div>
  </div>
</template>

<script>
import styleColors from "../style/style.scss";

export default {
  props: {
    name: String,
    valid: Object
  },
  data() {
    return {
      tooltipValue: null
    };
  },
  watch: {
    valid: {
      handler(newValue, oldValue) {
        newValue.isValid;
        this.setColor(newValue);
      },
      deep: true
    }
  },
  mounted() {
    this.setColor(this.valid);
  },
  methods: {
    setColor(valid) {
      let documentElement = this.$refs.required_icon;
      if (documentElement != null) {
        if (valid.isValid) {
          documentElement.style.backgroundColor = styleColors.secondary;
          this.tooltipValue = "";
        } else {
          documentElement.style.backgroundColor = styleColors.accent;
          this.tooltipValue = valid.message;
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";
#required_field_helper {
  display: flex;
  flex-direction: row;
}

#required_icon {
  height: 8px;
  width: 8px;
  margin-right: 5px;
  align-self: center;
  border-radius: 50%;
  background-color: $accent;
  transition: 0.1s;
}

#required_icon:hover {
  height: 10px;
  width: 10px;
  margin-right: 3px;
  transition: 0.1s;
  cursor: pointer;
}
</style>