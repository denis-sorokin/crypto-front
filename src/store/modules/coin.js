import Vue from 'vue';
import axios from 'axios';
import { baseUrl } from '../api';

const state = {
  coinsDetail: [],
};

const getters = {
  getCoinsDetail: state => state.coinsDetail
};

const actions = {
  GET_COIN({ commit, rootState }, coin) {
    const companies = rootState.companies.companies;
    const coins = Object.keys(companies).map(company => {
      Object.keys(companies[company]).forEach(val => {
        console.log(companies[company][val])
        // if (Object.keys(companies[company][val]) === coin) return companies[company][val];
      })
    }, []);
    console.log(coins)

    // axios.get(`${baseUrl}data/price?fsym=${coin}&tsyms=${coin==='BTC'? 'USD':'BTC'}`)
    //   .then(res => {
    //     if(res.status === 200) {
    //       console.log(coin)
    //       console.log(res.data)
    //       console.log(res.data.BTC)
    //     }
    //   });
  }
};

const mutations = {
  //
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}