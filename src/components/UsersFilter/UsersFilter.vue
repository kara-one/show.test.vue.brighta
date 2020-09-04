<template>
  <section class="users-filter">
    <div class="users-filter__area-left">
      <button class="users-filter__btn-pattern">{{filterPatternSelected}}</button>
      <button class="users-filter__btn-date">Фильтр</button>
    </div>
    <div class="users-filter__area-right">
      <button class="btn btn_white">Выгрузить</button>
      <button class="btn btn_red">Добавить контакты</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UsersFilter',
  computed: {
    filterPatternSelected() {        
      return this.$store.getters.FILTER_PATTERN_SELECTED;
    }
  }, methods: {

  }
};
</script>

<style scoped lang="scss">
.users-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $color_bg_white;
  border-radius: 10px;
  height: 85px;
  padding: 0 21px 0 35px;

  &__btn-pattern {
    position: relative;
    background: transparent;
    height: 23px;
    padding: 0 20px 0 42px;
    font-size: 15px;
    line-height: 23px;
    font-weight: 400;
    border: none;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      background: transparent url("~@/assets/img/icons.svg#filter_presets")
        center no-repeat;
      background-size: 22px 24px;
      width: 22px;
      height: 100%;
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      background-image: url("~@/assets/img/icons.svg#arrow_dwn");
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      width: 11px;
      height: 6px;
      transform: translateY(-50%);
    }
  }

  &__btn-date {
    position: relative;
    background: transparent;
    height: 23px;
    padding: 0 20px 0 42px;
    margin-left: 44px;
    font-size: 15px;
    line-height: 23px;
    font-weight: 400;
    border: none;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      background: transparent url("~@/assets/img/icons.svg#filter") center
        no-repeat;
      background-size: 23px 20px;
      width: 23px;
      height: 100%;
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      background-image: url("~@/assets/img/icons.svg#arrow_dwn");
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      width: 11px;
      height: 6px;
      transform: translateY(-50%);
    }
  }

  &__area-right {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn + .btn {
      margin-left: 11px;
    }
  }
}
</style>
