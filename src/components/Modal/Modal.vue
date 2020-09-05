<template>
    <transition name="modal">
        <div class="modal" v-if="showModal">
            <div class="btn-close" @click="showModalClose()"></div>
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: ['showModal'],
  data() {
    return {
      showModalLocal: this.showModal,
    };
  },
  methods: {
    showModalClose() {
      this.$emit('show-modal', false);
    },
  },
  created() {
    let that = this;

    document.addEventListener('keyup', function(event) {
      if (event.keyCode === 27) {
        that.showModalClose();
      }
    });
  },
};
</script>

<style>
@import "_modal.css";
</style>
