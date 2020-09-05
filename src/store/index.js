import {
  defaultUsers,
  itemUser,
  usersTableHeaders
} from './default.users.js';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dialogForm: false,
    filterForm: false,
    filterDates: [new Date().toISOString().substr(0, 10)],
    userEditedIndex: -1,
    nameMonth: 'Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь'.split(','),
    filterPattern: {
      item: 'today',
      items: {
        today: 'Сегодня',
        yesterday: 'Вчера',
        week: 'Последние 7 дней',
        month: 'Последние 30 дней',
        custom: 'Выбранный период',
      }
    },
    users: defaultUsers(),
    usersTableHeaders: usersTableHeaders(),
    itemUser: itemUser(),
  },
  mutations: {
    SET_DIALOG_FORM(state, content) {
      state.dialogForm = content;
    },
    SET_FILTER_FORM(state, content) {
      state.filterForm = content;
    },
    SET_FILTER_PATTERN_ITEM(state, content) {
      state.filterPattern.item = content;
    },
    SET_FILTER_DATES(state, content) {
      let filterDates = [];
      let range = 0;
      const item = state.filterPattern.item;

      switch (item) {
      case 'yesterday':
        range = 1;
        break;
      case 'week':
        range = 7;
        break;
      case 'month':
        range = 30;
        break;
      case 'custom':
        range = 100;
        break;
      }
      
      if (range == 100) {
        filterDates = content;
      } else {
        if (range > 0) {
          var d = new Date();
          d.setDate(d.getDate() - range);
          let month = d.getMonth() + 1;
          month = month < 10 ? '0' + month : month;
          let day = d.getDate();
          day = day < 10 ? '0' + day : day;

          filterDates.push(d.getFullYear() + '-' + month + '-' + day);
        }

        filterDates.push(new Date().toISOString().substr(0, 10));
      }

      state.filterDates = filterDates;
    },
    SET_EDITED_INDEX(state, content) {
      state.userEditedIndex = content;
    },
    RESET_EDITED_INDEX(state) {
      state.userEditedIndex = -1;
    },
  },
  getters: {
    DIALOG_FORM: s => s.dialogForm,
    FILTER_FORM: s => s.filterForm,
    FILTER_DATES: s => s.filterDates,
    USER_EDITED_INDEX: s => s.userEditedIndex,
    NAME_MONTHS: s => s.nameMonth,
    USERS: s => s.users,
    USERS_TABLE_HEADERS: s => s.usersTableHeaders,
    ITEM_USER: s => s.itemUser,
    FILTER_PATTERN_ITEMS: s => s.filterPattern.items,
    FILTER_PATTERN_ITEM: s => s.filterPattern.item,
  },
  actions: {
    SET_DIALOG_FORM({
      commit
    }, content) {
      commit('SET_DIALOG_FORM', content);
    },
    SET_FILTER_FORM({
      commit
    }, content) {
      commit('SET_FILTER_FORM', content);
    },
    SET_FILTER_PATTERN_ITEM({
      commit
    }, content) {
      commit('SET_FILTER_PATTERN_ITEM', content);
    },
    SET_FILTER_DATES({
      commit
    }, content) {
      commit('SET_FILTER_DATES', content);
    },
    SET_EDITED_INDEX({
      commit
    }, content) {
      commit('SET_EDITED_INDEX', content);
    },
    RESET_EDITED_INDEX({
      commit
    }) {
      commit('RESET_EDITED_INDEX');
    },
  },
  modules: {}
});
