import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import HighchartsVue from 'highcharts-vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(HighchartsVue, {tagName: 'charts'});

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
