<template>
  <section class="users-list">
    <v-data-table
      v-model="selected"
      :headers="tableHeaders"
      :items="items"
      :search="search"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
      item-key="id"
      class="elevation-1"
      loading-text="Загрузка, подождите..."
      loading
      show-select
      hide-default-footer
    >
      <template v-slot:top>
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
        <v-select
          v-model="itemsPerPage"
          :items="itemsPerPages"
          :append-icon="'mdi-plus'"
          label="Items per page"
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

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-toolbar flat color="white">
      <v-dialog v-model="dialog" max-width="500px">
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
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
  </section>
</template>

<script>
export default {
  name: 'UsersList',

  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 3,
      itemsPerPages: [1, 2, 3, 5, 10],
      search: '',
      selected: [],
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
      const dates = this.$store.getters.FILTER_DATES.map((date) => {
        // Create Data obj
        const d = new Date(date);

        // Reset time
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);

        return d;
      });
      console.log('dates: ', this.$store.getters.FILTER_DATES);
      console.log('dates: ', dates);
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
          registration.getTime() >= dates[0].getTime() &&
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
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
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

<style scoped lang="scss">
.users-list {
  background-color: $color_bg_white;
  border-radius: 10px;
}
</style>
