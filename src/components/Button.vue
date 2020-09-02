<template>
  <button
    :class="[{ active: stateButton }, classButton]"
    @click="stateButtonGoParent"
  >
    <slot name="inner"></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: ["classButton", "stateButton"],
  methods: {
    stateButtonGoParent() {
      this.$emit("state-button", !this.stateButton);
    }
  }
};
</script>
