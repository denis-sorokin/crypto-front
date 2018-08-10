import Vue from 'vue';
import cryptoApi from '../../interceptor';

const state = {
  companies: [],
  coins: [],
  price: {},
  history: null
};

const getters = {
  getCompanies: state => state.companies,
  getCoins: state => state.coins,
  getPrice: state => state.price,
  getHistory: state => state.history
};

const actions = {
  GET_COINS({ commit }) {
    cryptoApi.get('data/all/exchanges')
      .then(res => {
        if (res.status === 200) {

          // coins
          let coins = new Set();
          Object.keys(res.data).forEach(e => coins.add(...Object.keys(res.data[e])));
          commit('SAVE_COINS', coins);

          // company list
          // const companiesList = Object.keys(res.data);
          commit('SAVE_COMPANIES', res.data);
        }
      })
      .catch(e => console.error(e));
  },
  GET_PRICE({ commit }, data) {
    const currency = data.coin === 'BTC'? 'USD':'BTC';

    cryptoApi.get(`data/generateAvg?fsym=${data.coin}&tsym=${currency}&e=${data.company}`)
      .then(res => {
        if (res.status === 200) {
          const raw = res.data.RAW;
          const price = {
            [raw.LASTMARKET]: raw.PRICE
          };
          commit('SAVE_PRICE', [price, data.coin]);
        } else {
          console.error(res.status)
        }
      })
      .catch(e => console.error(e));
  },
  GET_HISTORY({ commit }, data) {
    const currency = data.coin === 'BTC'? 'USD':'BTC';
    const count = 60; // days, hours, minutes
    if (data.time !== 'day' && data.time !== 'hour' && data.time !== 'minute') {
      console.error('Time format not valid!');
      return;
    }
    cryptoApi.get(
      `data/histo${data.time}?fsym=${data.coin}&tsym=${currency}&limit=${count}&e=${data.company}`)
      .then(res => {
        if (res.status === 200) {
          commit('SAVE_HISTORY', res.data);
        } else {
          console.error(res.status)
        }
      })
      .catch(e => console.error(e))
  },
  // CLEAR_HISTORY({ commit }) {
  //   commit('CLEAR_HISTORY');
  // }
};

const mutations = {
  SAVE_COMPANIES(state, companiesList) {
    state.companies = companiesList;
  },
  SAVE_COINS(state, coins) {
    state.coins = Array.from(coins);
  },
  SAVE_PRICE(state, price) {
    const cur = price[1];
    const data = price[0];
    Vue.set(state.price, cur, {...state.price[cur], ...data})
  },
  SAVE_HISTORY(state, data) {
    state.history = data;
  },
  // CLEAR_HISTORY(state) {
  //   state.history = null;
  // }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}