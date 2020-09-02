<template>
  <div class="left-menu">
    <div class="left-menu__position">Эксперт</div>

    <nav class="left-menu__nav nav">
      <ul class="nav__items">
        <li class="nav__item">
          <svg>
            <use xlink:href="#analytics" />
          </svg>
          <a href="/">Аналитика</a>
        </li>
        <li class="nav__item">
          <a href="/">Продукт</a>
        </li>
        <li class="nav__item nav__item_active">
          <a href="/">Пользователи</a>
        </li>
        <li class="nav__item">
          <a href="/">Констурктор сайта</a>
        </li>
        <li class="nav__item">
          <a href="/">Трансляции</a>
        </li>
        <li class="nav__item">
          <a href="/">Рассылка</a>
        </li>
        <li class="nav__item">
          <a href="/">Маркетинг</a>
        </li>
        <li class="nav__item">
          <a href="/">Платежи</a>
        </li>
        <li class="nav__item">
          <a href="/">Настройки</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'LeftMenu'
};
</script>

<style scoped lang="scss">
.left-menu {
  &__position {
    position: relative;
    z-index: 40;
    background-color: $color_bg_white;
    width: 177px;
    padding: 0 50px 0 20px;
    font-family: PTSans;
    font-size: 15px;
    line-height: 54px;
    border-radius: 10px;
    box-shadow: 0px 10px 40px rgba(128, 158, 191, 0.2);

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      right: 24px;
      z-index: 50;
      background: transparent url("~@/assets/img/icons.svg#arrow_dwn") center
        no-repeat;
      background-size: contain;
      width: 11px;
      height: 6px;
      transform: translateY(-50%);
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: -59px;
      z-index: 30;
      background: $color_bg_white url("~@/assets/img/icons.svg#bread") center 50px
        no-repeat;
      background-size: 24px 24px;
      width: 80px;
      height: 100%;
    }
  }
}
</style>
