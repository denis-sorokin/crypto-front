import Vue from 'vue'
import Vuex from 'vuex'
import companies from './modules/companies'
import coin from './modules/coin'

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    companies,
    coin
  },
  strict: debug
})
