import Vue from 'vue'
import Vuex from 'vuex'
import companies from './modules/companies'
import coin from './modules/coin'
import loader from './modules/loader'

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    companies,
    coin,
    loader
  },
  strict: debug
})
