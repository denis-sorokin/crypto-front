import Vue from 'vue';
import cryptoApi from '../../interceptor';

const state = {
  coinsAverage: {},
};

const getters = {
  coins: state => state.coinsAverage,
  coinAverage: state => state.coinsAverage
};

const actions = {
  GET_COIN({ commit, rootState }, coin) {
    const currency = coin === 'BTC'? 'USD':'BTC';
    cryptoApi.get(`data/price?fsym=${coin}&tsyms=${currency}`)
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
    Vue.set(state, 'coinsAverage', {...state.coinsAverage, ...coin})
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}