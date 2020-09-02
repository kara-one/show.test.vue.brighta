import Vue from "vue";
import Vuex from "vuex";
import {
  defaultUsers
} from "./default.users.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: defaultUsers()
  },
  mutations: {},
  getters: {
    USERS: s => s.users
  },
  actions: {},
  modules: {}
});
