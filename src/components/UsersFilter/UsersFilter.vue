<template>
  <section class="users-filter">
    <div class="users-filter__area-left">
      <button class="users-filter__btn-pattern" @click="openFilter">
        <svg class="left">
          <use xlink:href="~@/assets/img/icons.svg#filter_presets" />
        </svg>
        {{filterPatternSelected}}
        <svg class="arrow">
          <use xlink:href="~@/assets/img/icons.svg#arrow_dwn" />
        </svg>
      </button>
      <button class="users-filter__btn-date" @click="openFilter">
        <svg class="left">
          <use xlink:href="~@/assets/img/icons.svg#filter" />
        </svg>
        Фильтр
        <svg class="arrow">
          <use xlink:href="~@/assets/img/icons.svg#arrow_dwn" />
        </svg>
      </button>
    </div>

    <div class="users-filter__area-right">
      <button class="btn btn_white">Выгрузить</button>
      <button class="btn btn_red" @click="addItem">Добавить контакты</button>

      <v-dialog
        content-class="users-filter__dialog filter-dialog"
        v-model="filter"
        overlay-color="rgba(240, 246, 252, 0.7)"
        overlay-opacity="1"
        max-width="60%"
      >
        <v-container class="transparent">
          <v-row>
            <v-col cols="4" class="filter-dialog__patterns filter-dialog-patterns">
              <v-card class="filter-dialog-patterns__card">
                <v-list class="filter-dialog-patterns__list">
                  <v-list-item-group v-model="filterPatternItem" mandatory>
                    <template v-for="(item, i) in filterPatternItems">
                      <v-list-item
                        class="filter-dialog-patterns__list-item"
                        :value="i"
                        :key="i"
                        active-class="filter-dialog-patterns__list-item_active"
                      >
                        <v-list-item-content class="filter-dialog-patterns__content">
                          <v-list-item-title class="filter-dialog-patterns__title">{{item}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>

            <v-col cols="8" class="filter-dialog__picker filter-dialog-picker">
              <v-card class="filter-dialog-picker__card">
                <v-card-text class="filter-dialog-picker__text">
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
                  ></v-date-picker>
                </v-card-text>

                <v-card-actions class="filter-dialog-picker__actions">
                  <v-btn class="btn btn_white" text @click="closeFilter">Отмена</v-btn>
                  <v-btn
                    class="btn btn_red"
                    text
                    @click="saveFilter"
                    :disabled="buttonSaveDisable"
                  >Обновить</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-dialog>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UsersFilter',

  data() {
    return {
      filterState: false,
    };
  },

  watch: {
    filter(val) {
      val || this.closeFilter();
    },
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
        this.$store.dispatch('SET_FILTER_PATTERN_ITEM', 'custom');
        this.$store.dispatch('SET_FILTER_DATES', val);
      },
    },
    buttonSaveDisable() {
      const fd = new Date(this.$store.getters.FILTER_DATES[0]).getTime();
      const sd = new Date(this.$store.getters.SELECTED_DATES[0]).getTime();
      
      return fd === sd ? true : false;
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
    },
    closeFilter() {
      this.$store.dispatch('RESET_FILTER_DATES');
      this.$store.dispatch('RESET_FILTER_PATTERN_ITEM');
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
