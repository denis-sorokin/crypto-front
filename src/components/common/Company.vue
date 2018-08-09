<template>
  <b-list-group-item class="company d-flex row mb-1 justify-content-between" @click="showModal">
    <span class="align-start">{{ company }}</span>
    <span class="align-middle">{{ cost }}</span>
    <b-modal ref="modalRef" title="Currency history">

      <charts v-if="chartOptions" :constructor-type="'stockChart'"
              :options="chartOptions" ref="highcharts"></charts>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-btn>
    </b-modal>
  </b-list-group-item>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Company',
  props: ['company', 'currency'],
  computed: {
    ...mapGetters({
      price: 'companies/getPrice',
      history: 'companies/getHistory'
    }),
    cost() {
      if (this.price && this.currency) {
        let value = this.price[this.currency];
        if (value) {
          return value[this.company];
        };
      }
    },
    chartOptions() {
      if (this.history && this.history.Data) {
        return {
          chart: {
            type: 'candlestick'
          },
          series: [{
            data: this.history.Data.map(e => {
              return [e.time, e.open, e.high, e.low, e.close]
            }),
            // color: '#6fcd98'
          }]
        }
      }
    }
  },
  methods: {
    showModal () {
      this.$store.dispatch('companies/GET_HISTORY', {time: 'day', coin: this.currency, company: this.company});
      this.$refs.modalRef.show()
    },
    hideModal () {
      this.$refs.modalRef.hide()
    }
  }
}
</script>