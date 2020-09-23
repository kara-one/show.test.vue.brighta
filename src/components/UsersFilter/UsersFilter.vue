<template>
  <section class="users-filter">
    <div class="users-filter__area-left">
      <button class="users-filter__btn-date">
        <svg class="left">
          <use xlink:href="~@/assets/img/icons.svg#filter" />
        </svg>
        Фильтр
        <svg class="arrow">
          <use xlink:href="~@/assets/img/icons.svg#arrow_dwn" />
        </svg>
      </button>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <button class="users-filter__btn-pattern" v-bind="attrs" v-on="on">
            <svg class="left">
              <use xlink:href="~@/assets/img/icons.svg#filter_presets" />
            </svg>
            {{filterPatternSelected}}
            <svg class="arrow">
              <use xlink:href="~@/assets/img/icons.svg#arrow_dwn" />
            </svg>
          </button>
        </template>

        <v-list class="filter-dialog-patterns__list">
          <v-list-item-group v-model="filterPatternItem" :value="filterPatternItem" mandatory>
            <v-list-item
              v-for="(item, i) in filterPatternItems"
              class="filter-dialog-patterns__list-item"
              :value="i"
              :key="i"
              active-class="filter-dialog-patterns__list-item_active"
            >
              <v-list-item-content class="filter-dialog-patterns__content">
                <v-list-item-title class="filter-dialog-patterns__title">{{item}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-dialog
        content-class="users-filter__dialog filter-dialog"
        v-model="filter"
        persistent
        width="390px"
      >
        <template v-slot:activator="{ on, attrs }">
          <div class="users-filter__custom-date-input" v-show="isPatternCustom">
            <v-text-field v-model="dateRangeText" readonly v-bind="attrs" v-on="on"></v-text-field>
          </div>
        </template>

        <v-date-picker
          v-model="filterDates"
          first-day-of-week="1"
          width="100%"
          :full-width="true"
          :no-title="true"
          :range="true"
          :reactive="true"
          :show-current="true"
          :allowed-dates="allowedDates"
        >
          <v-btn class="btn btn_white" text @click="closeFilter">Отмена</v-btn>
          <v-btn class="btn btn_red" text @click="saveFilter" :disabled="buttonSaveDisable">Обновить</v-btn>
        </v-date-picker>
      </v-dialog>
    </div>

    <div class="users-filter__area-right">
      <button class="btn btn_white">Выгрузить</button>
      <button class="btn btn_red" @click="addItem">Добавить контакты</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UsersFilter',

  data() {
    return {
      filterState: false,
      isPatternCustom: false,
    };
  },

  computed: {
    filter: {
      get() {
        return this.filterState;
      },
      set(val) {
        this.filterState = val;
      },
    },
    filterPatternSelected() {
      const items = this.$store.getters.FILTER_PATTERN_ITEMS;
      const item = this.$store.getters.FILTER_PATTERN_SELECTED;

      return items[item];
    },
    filterPatternItem: {
      get() {
        return this.$store.getters.FILTER_PATTERN_ITEM;
      },
      set(val) {
        this.$store.dispatch('SET_FILTER_PATTERN_ITEM', val);
        this.$store.dispatch('SET_FILTER_DATES', []);

        if (val === 'custom') {
          this.filterState = true;
        } else {
          this.saveFilter();
          this.isPatternCustom = false;
        }
      },
    },
    filterPatternItems() {
      return this.$store.getters.FILTER_PATTERN_ITEMS;
    },
    filterDates: {
      get() {
        return this.$store.getters.FILTER_DATES;
      },
      set(val) {
        this.$store.dispatch('SET_FILTER_DATES', val);
      },
    },
    dateRangeText() {
      const dates = this.filterDates;
      const monthsNames = this.$store.getters.NAME_MONTHS;

      if (dates.length == 1) {
        const firstDate = new Date(dates[0]);
        const firstDay = firstDate.getDate();
        const firstMonth = firstDate.getMonth();
        const firstYear = firstDate.getFullYear();
        return ((firstDay < 10 ? '0' + firstDay : firstDay) +
          ' ' +
          monthsNames[firstMonth] +
          ' ' +
          firstYear);
      }
      
      if (dates.length == 2) {
        const firstDate = new Date(dates[0]);
        const secondDate = new Date(dates[1]);

        const firstDay = firstDate.getDate();
        const firstMonth = firstDate.getMonth();
        const firstYear = firstDate.getFullYear();
        const secondDay = secondDate.getDate();
        const secondMonth = secondDate.getMonth();
        const secondYear = secondDate.getFullYear();

        return (
          (firstDay < 10 ? '0' + firstDay : firstDay) +
          (firstMonth != secondMonth ? ' ' + monthsNames[firstMonth] : '') +
          (firstYear != secondYear ? ' ' + firstYear : '') +
          ' - ' +
          (secondDay < 10 ? '0' + secondDay : secondDay) +
          ' ' +
          monthsNames[secondMonth] +
          ' ' +
          secondYear
        );
      }

      return this.filterDates.join(' ~ ');
    },
    buttonSaveDisable() {
      const fd = this.$store.getters.FILTER_DATES;
      if (fd.length == 0) {
        return true;
      }

      const sd = this.$store.getters.SELECTED_DATES;
      if (sd.length > 0) {
        for (let i = 0; i < fd.length; i++) {
          const tsFd = new Date(fd[i]).getTime();
          const tsSd = new Date(sd[i]).getTime();

          if (tsFd != tsSd) {
            return false;
          }
        }

        return true;
      }

      return false;
    },
    dateToday() {
      return this.$store.getters.DATE_FORMAT(0);
    },
  },

  methods: {
    allowedDates(val) {
      if (val <= this.dateToday) {
        return val;
      }
    },
    addItem() {
      this.$store.dispatch('SET_DIALOG_FORM', true);
      this.$store.dispatch('RESET_EDITED_INDEX');
    },
    openFilter() {
      this.filterState = true;
    },
    saveFilter() {
      this.$store.dispatch('SET_SELECTED_DATES');
      this.$store.dispatch('SET_FILTER_PATTERN_SELECTED');
      this.filterState = false;
      this.isPatternCustom = true;
    },
    closeFilter() {
      this.$store.dispatch('RESET_FILTER_PATTERN_ITEM');
      this.$store.dispatch('RESET_FILTER_DATES');
      this.filterState = false;
    },
  },
};
</script>

<style lang="scss">
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
    margin-left: 44px;
    font-size: 15px;
    line-height: 23px;
    font-weight: 400;
    border: none;
    cursor: pointer;

    &:hover {
      color: $color_font_red;

      svg {
        fill: $color_font_red;
      }
    }

    svg.left {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      width: 22px;
      height: 100%;
    }

    svg.arrow {
      position: absolute;
      top: 50%;
      right: 0;
      z-index: 10;
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
    font-size: 15px;
    line-height: 23px;
    font-weight: 400;
    border: none;
    cursor: pointer;

    &:hover {
      color: $color_font_red;

      svg {
        fill: $color_font_red;
      }
    }

    svg.left {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      width: 23px;
      height: 100%;
    }

    svg.arrow {
      position: absolute;
      top: 50%;
      right: 0;
      z-index: 10;
      width: 11px;
      height: 6px;
      transform: translateY(-50%);
    }
  }

  &__custom-date-input {
    position: relative;
    display: inline-block;
    height: 23px;
    margin-left: 24px;
    font-size: 15px;
    line-height: 23px;
    font-weight: 400;

    &:hover {
      .v-input input {
        color: $color_font_red;
      }
    }

    .v-input {
      margin: 0;
      padding: 0;

      &__slot {
        &::before,
        &::after {
          border: none !important;
        }
      }

      input {
        padding: 0;
      }
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

  &__dialog {
    width: 580px;
    padding: 0 20px;
    margin: 0;
    box-shadow: none;
  }
}

.filter-dialog-patterns {
  max-width: 190px;
  box-sizing: content-box;
  padding-right: 4px;

  &__card {
    box-shadow: 0px 10px 40px rgba(128, 158, 191, 0.2) !important;
    border-radius: 10px !important;
    overflow: hidden;
  }

  &__list {
    padding: 10px;
    box-shadow: none !important;
  }

  &__content {
    padding: 0;
  }

  &__title {
    font-family: PTSans;
    font-weight: 400;
    font-size: 15px;
  }

  &__list-item {
    height: 36px;
    min-height: 36px;
    padding: 0 12px;
    border-radius: 5px;
    overflow: hidden;
    border: 2px solid $color_white;

    &:hover {
      background-color: $color_white !important;
      border: 2px solid $color_grey_light;

      &::before {
        opacity: 0 !important;
      }
    }

    &::before {
      opacity: 0 !important;
    }

    &_active {
      background-color: $color_grey;
      border: 2px solid $color_grey;

      &:hover {
        background-color: $color_grey !important;
        border: 2px solid $color_grey;
      }
    }
  }
}

.filter-dialog-picker {
  max-width: 308px;
  box-sizing: content-box;
  padding-left: 4px;
  padding-bottom: 20px;

  &__card {
    box-shadow: 0px 10px 40px rgba(128, 158, 191, 0.2) !important;
    border-radius: 10px !important;
    overflow: hidden;
  }

  &__text {
    padding: 2px 0 0 0;
  }

  &__actions {
    justify-content: space-between;
    padding: 10px;
  }
}
</style>
