<template>
  <transition name="slide-fade-t">
    <div class="card">
      <div class="card-wrap">
        <div class="card-photo">
          <img
            class=""
            :src="user.photo"
            :alt="'Photo ' + user.name"
            onerror="this.style.display='none'"
          />
        </div>

        <h2 class="card-name">{{ user.name }}</h2>
        <p class="card-position">{{ user.position }}</p>
        <p
          class="card-email"
          :class="{ tooltip: tooltip }"
          v-html="cropText(user.email)"
        ></p>
        <p class="card-phone">{{ user.phone }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Card',
  props: ['user'],
  data() {
    return {
      tooltip: false,
      cropLength: 20,
      cropEnd: '...'
    };
  },
  methods: {
    cropText(text) {
      if (text == undefined) {
        return false;
      }

      if (text.length <= this.cropLength) {
        return text;
      }

      this.tooltip = true;
      return (
        text.substr(0, this.cropLength) +
        this.cropEnd +
        `<span class="tooltiptext">${text}</span>`
      );
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  background-color: transparent;
  padding: 34px 0 0 0;
  border: none;

  @include for-size(tablet-portrait-up) {
    padding: 53px 0 0 0;
  }

  &-wrap {
    width: 200px;
    margin: 0 auto;
  }

  &-photo {
    display: block;
    overflow: hidden;
    background: transparent url("~@/assets/img/photo-cover.svg") center
      no-repeat;
    background-size: contain;
    width: 70px;
    height: 70px;
    margin: 0 auto;
    border-radius: 50%;
    border: 1px solid #fff;

    img {
      width: 100%;
      transition: all 0.5s ease;
    }
  }

  &-name {
    width: 100%;
    margin-top: 15px;
    margin-bottom: 10px;
    word-break: break-all;
  }

  &-position {
    margin: 0;
    text-align: center;
  }

  &-email {
    margin: 0;
    text-align: center; /* 
    white-space: nowrap;
    overflow-x: hidden;
    overflow-y: visible;
    text-overflow: ellipsis; */
  }

  &-phone {
    margin: 0;
    text-align: center;
  }
}
</style>
