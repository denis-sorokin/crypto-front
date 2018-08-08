import Vue from 'vue';
import axios from 'axios';
import { baseUrl } from '../api';

const state = {
  companies: [],
  coins: [],
  price: {}
};

const getters = {
  getCompanies: state => state.companies,
  getCoins: state => state.coins,
  getPrice: state => state.price,
};

const actions = {
  GET_COINS({ commit }) {
    axios.get(baseUrl + 'data/all/exchanges')
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

    axios.get(baseUrl + `data/generateAvg?fsym=${data.coin}&tsym=${currency}&e=${data.company}`)
      .then(res => {
        if (res.status === 200) {
          commit('SAVE_PRICE', res.data);
        }
      })
      .catch(e => console.error(e));
  }
};

const mutations = {
  SAVE_COMPANIES(state, companiesList) {
    state.companies = companiesList;
  },
  SAVE_COINS(state, coins) {
    state.coins = Array.from(coins);
  },
  SAVE_PRICE(state, data) {
    const raw = data.RAW;

    Vue.set(state, 'price', {...state.price,
      ...state.price[raw.FROMSYMBOL]?
        state.price[raw.FROMSYMBOL][raw.LASTMARKET] = raw.PRICE
        :state.price[raw.FROMSYMBOL] = {
          [raw.LASTMARKET]: raw.PRICE
        }
    })
    // state.price[raw.FROMSYMBOL]?
    //   state.price[raw.FROMSYMBOL][raw.LASTMARKET] = raw.PRICE
    //   :state.price[raw.FROMSYMBOL] = {
    //     [raw.LASTMARKET]: raw.PRICE
    //   }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}