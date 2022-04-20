/*
import { createStore } from "vuex";

export default createStore({
  state: {
    CryptoKey : "000102030405060708090a0b0c0d0e0f"
  },
  mutations: {},
  actions: {},
  modules: {},
});
*/

import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogged: localStorage.getItem('token'),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})