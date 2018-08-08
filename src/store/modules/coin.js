import Vue from 'vue';
import axios from 'axios';
import { baseUrl } from '../api';

const state = {
  coinsAverage: {},
};

const getters = {
  coins: state => state.coinsAverage,
  coinAverage: (state, coin) => state.coinsAverage[coin]
};

const actions = {
  GET_COIN({ commit, rootState }, coin) {
    const currency = coin === 'BTC'? 'USD':'BTC';
    axios.get(`${baseUrl}data/price?fsym=${coin}&tsyms=${currency}`)
      .then(res => {
        if(res.status === 200) {
          if(!!res.data[currency]) {
            commit('SAVE_COINS_AVERAGE', {
              [coin]: [
                currency, res.data[currency]
              ]
            })
          }
        }})
      .catch(e => {
        console.error(e);
      });
  }
};

const mutations = {
  SAVE_COINS_AVERAGE(state, coin) {
    Vue.set(state, 'coinsAverage', Object.assign(state.coinsAverage, coin))
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}