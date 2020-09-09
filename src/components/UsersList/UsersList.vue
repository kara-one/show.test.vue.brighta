<template>
  <section class="users-list">
    <v-data-table
      :headers="tableHeaders"
      :items="items"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
      item-key="id"
      class="users-list__table"
      loading-text="Загрузка, подождите..."
      loading
      show-select
      hide-default-footer
    >
      <template v-slot:top>
        <v-pagination
          class="users-list__pagination"
          v-model="page"
          v-if="pagination"
          :length="pageCount"
        ></v-pagination>
        <v-select
          class="users-list__perpage"
          v-model="itemsPerPage"
          :items="itemsPerPages"
          :append-icon="'mdi-chevron-down'"
          label="Количество на странице"
          prefix="Отобразить"
          hide-details
          solo
        ></v-select>
      </template>

      <template v-slot:item.name="{ item }">
        {{ item.name }}
        <br />
        <span>{{ item.email }}</span>
      </template>

      <template
        v-slot:item.registration_timestamp="{ item }"
      >{{ formatDate(item.registration_timestamp) }}</template>

      <template
        v-slot:item.last_activity_timestamp="{ item }"
      >{{ formatDate(item.last_activity_timestamp) }}</template>

      <template v-slot:item.last_action="{ item }">
        <div class="wrap-mask">{{ item.last_action }}</div>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="wrap-actions">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </div>
      </template>
    </v-data-table>

    <v-dialog
      v-model="dialog"
      overlay-color="rgba(240, 246, 252, 0.7)"
      overlay-opacity="1"
      max-width="60%"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.name" label="Пользователь"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.product" label="Продукт"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.last_action" label="Последнее действие"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn class="btn btn_white" text @click="close">Отмена</v-btn>
          <v-btn class="btn btn_red" text @click="save">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  name: 'UsersList',

  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      itemsPerPages: [1, 2, 3, 5, 10],
      pagination: false,
      editedItem: {},
      defaultItem: {},
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.init();
  },

  computed: {
    dialog: {
      get() {
        return this.$store.getters.DIALOG_FORM;
      },
      set(val) {
        this.$store.dispatch('SET_DIALOG_FORM', val);
      },
    },
    editedIndex() {
      return this.$store.getters.USER_EDITED_INDEX;
    },
    items() {
      // Prepare filter dates
      const dates = this.$store.getters.SELECTED_DATES.map((date) => {
        // Create Data obj
        const d = new Date(date);

        // Reset time
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);

        return d;
      });

      // ADD date filter on USERS
      return this.$store.getters.USERS.filter((item) => {
        // Create Data obj
        const registration = new Date(item.registration_timestamp);

        // Reset time
        registration.setHours(0);
        registration.setMinutes(0);
        registration.setSeconds(0);
        registration.setMilliseconds(0);

        // Compare
        // IF one day date (today, yesterday, ...)
        if (dates.length == 1 && registration.getTime() == dates[0].getTime()) {
          return item;
        }
        // IF range date (week, month, ...)
        else if (
          dates.length == 2 &&
          registration.getTime() > dates[0].getTime() &&
          registration.getTime() <= dates[1].getTime()
        ) {
          return item;
        }
      });
    },
    tableHeaders() {
      return this.$store.getters.USERS_TABLE_HEADERS;
    },
    formTitle() {
      return this.editedIndex === -1
        ? 'Новый контакт'
        : 'Редактировать контакт';
    },
  },

  methods: {
    init() {
      this.editedItem = this.$store.getters.ITEM_USER;
      this.defaultItem = this.$store.getters.ITEM_USER;
    },

    /** EVENT click for Edit User */
    editItem(item) {
      // SET FLAG open form
      this.$store.dispatch('SET_DIALOG_FORM', true);

      // SET form data
      this.editedItem = Object.assign({}, item);
      this.$store.dispatch('SET_EDITED_INDEX', this.items.indexOf(item));
    },

    /** EVENT click for Delete User */
    deleteItem(item) {
      const index = this.items.indexOf(item);
      confirm('Нажав OK вы удалите пользователя!') &&
        this.items.splice(index, 1);
    },

    /** EVENT click for Close User form */
    close() {
      // SET FLAG open form
      this.$store.dispatch('SET_DIALOG_FORM', false);

      this.$nextTick(() => {
        // RESET form data
        this.editedItem = Object.assign({}, this.defaultItem);
        this.$store.dispatch('RESET_EDITED_INDEX');
      });
    },

    /** EVENT click for Save User form */
    save() {
      // IF edit User
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      }
      // IF add new User
      else {
        // Add dates from new User
        this.editedItem.last_activity_timestamp = Date.now();
        this.editedItem.registration_timestamp = Date.now();

        // PUSH new User
        this.items.push(this.editedItem);
      }

      // Close editor
      this.close();
    },

    /** Date normalize */
    formatDate(date) {
      date = new Date(date);

      // Month
      var mm = date.getMonth();
      mm = this.$store.getters.NAME_MONTHS[mm];

      // Day
      var dd = date.getDate();
      if (dd < 10) {
        dd = '0' + dd;
      }

      // Year
      var yy = date.getFullYear();

      return mm + ' ' + dd + '. ' + yy;
    },
  },
};
</script>

<style lang="scss">
.users-list {
  background-color: $color_bg_white;
  padding: 0 43px 0 32px;
  border-radius: 10px;
  overflow: hidden;

  &__pagination {
    .v-pagination {
      display: flex !important;
      justify-content: flex-end !important;
    }
  }

  &__perpage {
    position: relative;

    .v-input__control {
      position: absolute;
      bottom: -61px;
      right: 0;
      height: 61px;
      width: 160px;
      font-size: 13px;
      line-height: 16px;
    }

    .v-input__slot {
      height: 61px;
      padding: 0 !important;
      box-shadow: none !important;
    }

    .v-select {
      &__slot {
        justify-content: flex-end;
      }

      &__selections {
        flex: none !important;

        input {
          width: 0 !important;
        }
      }
    }

    .v-select__selection--comma {
      margin: 7px 8px 7px 11px;
    }
  }

  &__table {
    table {
      table-layout: fixed;
      width: 100%;
    }

    .v-data-table-header {
      tr {
        height: 75px;
        vertical-align: top;
      }

      th {
        height: 62px !important;
        max-height: 62px;
        max-width: 20%;
        padding: 0 15px 0 25px !important;
        font-size: 13px !important;
        line-height: 62px;
        font-weight: 700 !important;
        color: $color_font !important;
        white-space: nowrap;
        text-align: left;

        &:first-child {
          padding-top: 18px !important;
          padding-left: 0 !important;
          width: 40px !important;
        }

        &:nth-child(2) {
          width: 17% !important;
        }
        &:nth-child(3) {
          width: 16% !important;
        }
        &:nth-child(4) {
          width: 16% !important;
        }
        &:nth-child(5) {
          width: 17% !important;
        }

        &:last-child {
          width: 107px !important;
        }

        .v-simple-checkbox {
          display: flex;
          justify-content: flex-start;
        }
      }
    }

    tr {
      &.v-data-table__selected {
        background: transparent !important;
      }

      &:hover {
        background: transparent !important;

        td:nth-child(2) {
          border-top-color: $color_grey_light !important;
          border-left-color: $color_grey_light !important;
          border-bottom-color: $color_grey_light !important;
          border-radius: 5px 0 0 5px;
        }

        td:nth-child(3),
        td:nth-child(4),
        td:nth-child(5) {
          border-top-color: $color_grey_light !important;
          border-bottom-color: $color_grey_light !important;
        }

        td:nth-child(6) {
          border-top-color: $color_grey_light !important;
          border-right-color: $color_grey_light !important;
          border-bottom-color: $color_grey_light !important;
          border-radius: 0 5px 5px 0;
        }
      }
    }

    td {
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 57px !important;
      padding: 0 15px 0 25px !important;
      font-size: 15px !important;
      line-height: 20px;
      font-weight: 400 !important;
      white-space: nowrap;
      text-align: left;
      border: 2px solid $color_white !important;

      &:nth-child(5):after,
      &:nth-child(6):after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        background: linear-gradient(to left, #fff, rgba(255, 255, 255, 0.3));
        width: 50px;
        height: 100%;
      }

      &:first-child {
        padding-left: 0 !important;
        border: none !important;

        &::after {
          background: transparent;
          width: 0;
          height: 0;
        }
      }

      &:last-child {
        padding-right: 0 !important;
        border: none !important;

        &::after {
          background: transparent;
        }
      }

      .v-simple-checkbox {
        display: flex;
        justify-content: flex-start;
      }

      span {
        font-size: 13px;
        line-height: 16px;
        font-weight: 300;
      }

      .wrap-mask {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .wrap-actions {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
