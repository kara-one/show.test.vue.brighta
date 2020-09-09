import {
  dateFormat,
  datesArray,
  nameMonth,
  patterns
} from './__date';
import {
  itemUser,
  usersGenerated,
  usersTableHeaders
} from './__users';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
console.log('patterns: ', patterns);
export default new Vuex.Store({
  state: {
    dialogForm: false,
    filterDates: datesArray(patterns.default, []),
    selectedDates: datesArray(patterns.default, []),
    userEditedIndex: -1,
    nameMonth: nameMonth(),
    filterPattern: patterns,
    users: usersGenerated(),
    usersTableHeaders: usersTableHeaders(),
    itemUser: itemUser(),
  },
  mutations: {
    SET_DIALOG_FORM(state, content) {
      state.dialogForm = content;
    },
    SET_FILTER_PATTERN_ITEM(state, content) {
      state.filterPattern.item = content;
    },
    RESET_FILTER_PATTERN_ITEM(state) {
      state.filterPattern.item = state.filterPattern.selected;
    },
    SET_FILTER_PATTERN_SELECTED(state) {
      state.filterPattern.selected = state.filterPattern.item;
    },
    SET_FILTER_DATES(state, content) {
      const item = state.filterPattern.item;

      state.filterDates = datesArray(item, content);
    },
    RESET_FILTER_DATES(state) {
      state.filterDates = state.selectedDates;
    },
    SET_SELECTED_DATES(state) {
      state.selectedDates = state.filterDates;
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
    FILTER_DATES: s => s.filterDates,
    SELECTED_DATES: s => s.selectedDates,
    USER_EDITED_INDEX: s => s.userEditedIndex,
    NAME_MONTHS: s => s.nameMonth,
    USERS: s => s.users,
    USERS_TABLE_HEADERS: s => s.usersTableHeaders,
    ITEM_USER: s => s.itemUser,
    FILTER_PATTERN_ITEMS: s => s.filterPattern.items,
    FILTER_PATTERN_ITEM: s => s.filterPattern.item,
    FILTER_PATTERN_SELECTED: s => s.filterPattern.selected,
    DATE_FORMAT: s => range => {
      if (s === '') {
        return false;
      }

      return dateFormat(range);
    },
  },
  actions: {
    SET_DIALOG_FORM({
      commit
    }, content) {
      commit('SET_DIALOG_FORM', content);
    },
    SET_FILTER_PATTERN_ITEM({
      commit
    }, content) {
      commit('SET_FILTER_PATTERN_ITEM', content);
    },
    RESET_FILTER_PATTERN_ITEM({
      commit
    }, content) {
      commit('RESET_FILTER_PATTERN_ITEM', content);
    },
    SET_FILTER_PATTERN_SELECTED({
      commit
    }, content) {
      commit('SET_FILTER_PATTERN_SELECTED', content);
    },
    SET_FILTER_DATES({
      commit
    }, content) {
      commit('SET_FILTER_DATES', content);
    },
    RESET_FILTER_DATES({
      commit
    }, content) {
      commit('RESET_FILTER_DATES', content);
    },
    SET_SELECTED_DATES({
      commit
    }, content) {
      commit('SET_SELECTED_DATES', content);
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
