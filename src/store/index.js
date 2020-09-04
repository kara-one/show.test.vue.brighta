import Vue from 'vue';
import Vuex from 'vuex';
import {
  defaultUsers
} from './default.users.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nameMonth: 'Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь'.split(','),
    filterPattern: {
      selected: '',
      default: 'today',
      items: {
        today: 'Сегодня',
        yesterday: 'Вчера',
        week: 'Последние 7 дней',
        month: 'Последние 30 дней',
      }
    },
    users: defaultUsers()
  },
  mutations: {
    SET_USERS(state, content) {
      state.users = content;
    },
  },
  getters: {
    NAME_MONTHS: s => s.nameMonth,
    USERS: s => s.users,
    FILTER_PATTERN_ITEMS: s => s.filterPattern.items,
    FILTER_PATTERN_SELECTED: s => {
      const field = s.filterPattern.selected !== '' ? s.filterPattern.selected : s.filterPattern.default;

      return s.filterPattern.items[field];
    },
  },
  actions: {
    SET_USERS({
      commit
    }, content) {
      commit('SET_USERS', content);
    },
  },
  modules: {}
});
