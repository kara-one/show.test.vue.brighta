<template>
  <section class="users-filter">
    <div class="users-filter__area-left">
      <button class="users-filter__btn-pattern" @click="openFilter">{{filterPatternSelected}}</button>
      <button class="users-filter__btn-date" @click="openFilter">Фильтр</button>
    </div>

    <div class="users-filter__area-right">
      <button class="btn btn_white">Выгрузить</button>
      <button class="btn btn_red" @click="addItem">Добавить контакты</button>

      <v-dialog v-model="filter" overlay-color="white" overlay-opacity="0.1" max-width="60%">
        <v-container class="transparent">
          <v-row>
            <v-col cols="4">
              <v-card class="transparent">
                <v-list>
                  <v-list-item-group v-model="filterPatternItem" mandatory color="indigo">
                    <template v-for="(item, i) in filterPatternItems">
                      <v-list-item
                        :value="i"
                        :key="i"
                        active-class="deep-purple--text text--accent-4"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{item}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>

            <v-col cols="8">
              <v-card class="transparent">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
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
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeFilter">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="saveFilter">Save</v-btn>
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

  watch: {
    filter(val) {
      val || this.closeFilter();
    },
  },

  computed: {
    filter: {
      get() {
        return this.$store.getters.FILTER_FORM;
      },
      set(val) {
        this.$store.dispatch('SET_FILTER_FORM', val);
      },
    },
    filterPatternSelected() {
      const items = this.$store.getters.FILTER_PATTERN_ITEMS;
      const item = this.$store.getters.FILTER_PATTERN_ITEM;

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
        this.filterPatternItem = 'custom';
        this.$store.dispatch('SET_FILTER_DATES', val);
      },
    },
  },

  methods: {
    allowedDates: (val) => {
      const date = new Date().toISOString().substr(0, 10);

      if (val <= date) {
        return val;
      }
    },
    addItem() {
      this.$store.dispatch('SET_DIALOG_FORM', true);
      this.$store.dispatch('RESET_EDITED_INDEX');
    },
    openFilter() {
      this.$store.dispatch('SET_FILTER_FORM', true);
    },
    saveFilter() {
      this.$store.dispatch('SET_FILTER_FORM', false);
    },
    closeFilter() {
      this.$store.dispatch('SET_FILTER_FORM', false);
    },
  },
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
