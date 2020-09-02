<template>
  <div class="header">
    <a href="/" class="header__logo header__logo_beta"></a>

    <nav class="header_nav nav">
      <ul class="nav__items">
        <li class="nav__item">
          <button class="icon icon__bell icon__shadow"></button>
        </li>
        <li class="nav__item">
          <button class="icon icon__arrow icon__shadow">Артем</button>
        </li>
        <li class="nav__item">
          <button class="icon icon__grey icon__search"></button>
        </li>
        <li class="nav__item">
          <button class="icon icon__grey icon__arrow">Ru</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;

  &__logo {
    background: transparent url("~@/assets/img/logo.svg") center no-repeat;
    background-size: 84px 15px;
    display: block;
    width: 84px;
    height: 15px;
    color: $color_font;

    &_beta {
      position: relative;
      &::after {
        content: "Beta";
        position: absolute;
        right: -30px;
        bottom: -2px;
        z-index: 1;
        font-size: 13px;
        line-height: 15px;
      }
    }
  }
}

.nav {
  &__items {
      display: flex;
      align-items: center;
      justify-content: space-between;
  }

  &__item + &__item {
      margin-left: 17px;
  }
}
</style>
