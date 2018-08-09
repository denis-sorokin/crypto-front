import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import stockInit from 'highcharts/modules/stock'
import App from './App.vue'
import Loader from './components/common/Loader'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

stockInit(Highcharts);

Vue.use(BootstrapVue);
Vue.use(HighchartsVue, { tagName: 'charts' });

Vue.component('loader', Loader);

Vue.filter('averageCost', function(value) {
  if (value && value.length === 2) {
    return `${value[1]} ${value[0]}`
  } else {
    return 'Unknown'
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
