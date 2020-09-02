<template>
  <transition name="slide-fade-c">
    <div
      class="overlay"
      :class="{ show: stateOverlay }"
      v-show="stateOverlay"
      @click="closeOverlay"
    ></div>
  </transition>
</template>

<script>
export default {
  name: "Overlay",
  computed: {
    stateOverlay() {
      return this.$store.getters.STATE_OVERLAY;
    }
  },
  methods: {
    closeOverlay() {
      this.$store.dispatch("CLOSE_OVERLAY");
    }
  }
};
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: #000;
  transition: all 0.5s linear;

  &.show {
    opacity: 0.6;
  }
}
</style>
