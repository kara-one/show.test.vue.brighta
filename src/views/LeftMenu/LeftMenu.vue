<template>
  <div class="left-menu">
    <div class="left-menu__position">Эксперт</div>
    <div class="left-menu__bread"></div>

    <nav class="left-menu__nav nav">
      <ul class="nav__items">
        <li class="nav__item">
          <svg class="inline-svg-icon">
            <use xlink:href="~@/assets/img/icons.svg#analytics" />
          </svg>
          <a href="/">Аналитика</a>
        </li>
        <li class="nav__item">
          <svg class="inline-svg-icon">
            <use xlink:href="~@/assets/img/icons.svg#product" />
          </svg>
          <a href="/">Продукт</a>
        </li>
        <li class="nav__item nav__item_active">
          <svg class="inline-svg-icon">
            <use xlink:href="~@/assets/img/icons.svg#users" />
          </svg>
          <a href="/">Пользователи</a>
        </li>
        <li class="nav__item">
          <svg class="inline-svg-icon">
            <use xlink:href="~@/assets/img/icons.svg#constructor" />
          </svg>
          <a href="/">Констурктор сайта</a>
        </li>
        <li class="nav__item">
          <svg class="inline-svg-icon">
            <use xlink:href="~@/assets/img/icons.svg#broadcast" />
          </svg>
          <a href="/">Трансляции</a>
        </li>
        <li class="nav__item">
          <svg class="inline-svg-icon">
            <use xlink:href="~@/assets/img/icons.svg#newsletter" />
          </svg>
          <a href="/">Рассылка</a>
        </li>
        <li class="nav__item">
          <svg class="inline-svg-icon">
            <use xlink:href="~@/assets/img/icons.svg#marketing" />
          </svg>
          <a href="/">Маркетинг</a>
        </li>
        <li class="nav__item">
          <svg class="inline-svg-icon">
            <use xlink:href="~@/assets/img/icons.svg#payments" />
          </svg>
          <a href="/">Платежи</a>
        </li>
        <li class="nav__item">
          <svg class="inline-svg-icon">
            <use xlink:href="~@/assets/img/icons.svg#configs" />
          </svg>
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
  position: relative;
  padding-top: 54px;

  &__position {
    position: absolute;
    top: 0;
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
  }

  &__bread {
    position: absolute;
    top: 0;
    z-index: 30;
    background: $color_bg_white url("~@/assets/img/icons.svg#bread") 193px
      center no-repeat;
    background-size: 24px 24px;
    width: 236px;
    height: 54px;
    border-radius: 10px;
    box-shadow: 0px 10px 40px rgba(128, 158, 191, 0.2);
  }

  &__nav {
    position: relative;
    z-index: 50;
    background-color: $color_bg_white;
    margin-top: 11px;
    width: 177px;
    padding: 9px 9px 9px 10px;
    border-radius: 10px;
    box-shadow: 0px 10px 40px rgba(128, 158, 191, 0.2);
  }

  .nav {
    &__items {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__item {
      position: relative;
      background-position: center center;
      background-repeat: no-repeat;
      margin-top: 8px;
      border: 1px solid $color_border;
      border-radius: 6px;

      &:first-child {
        margin-top: 0;
      }

      a {
        display: block;
        height: 85px;
        padding-top: 55px;
        font-family: PTSans;
        font-size: 15px;
        line-height: 19px;
        color: $color_font;
        text-align: center;
      }

      svg {
        position: absolute;
        top: 35%;
        left: 50%;
        width: 25px;
        height: 25px;
        fill: $color_font;
        transform: translate(-50%, -35%);
      }

      &_active {
        border: 1px solid $color_menu_active;

        a {
          color: $color_menu_active;
        }

        svg {
          fill: $color_menu_active;
        }
      }
    }
  }
}
</style>
