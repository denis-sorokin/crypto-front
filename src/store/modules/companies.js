import axios from 'axios';
import { baseUrl } from '../api';

const state = {
  companies: [],
  coins: [],
};

const getters = {
  getCompanies: state => state.companies,
  getCoins: state => state.coins
};

const actions = {
  GET_COINS({ commit }) {
    axios.get(baseUrl + 'data/all/exchanges')
      .then(res => {
        if(res.status === 200) {

          // coins
          let coins = new Set();
          Object.keys(res.data).forEach(e => coins.add(...Object.keys(res.data[e])));
          commit('SAVE_COINS', coins);

          // company list
          // const companiesList = Object.keys(res.data);
          commit('SAVE_COMPANIES', res.data);

        }
      });
  }
};

const mutations = {
  SAVE_COMPANIES(state, companiesList) {
    state.companies = companiesList;
  },
  SAVE_COINS(state, coins) {
    state.coins = Array.from(coins);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}