<template>
  <div>
    <b-list-group-item v-if="cost" :class="classed" @click="showModal">
      <span>{{ company }}</span>
      <span class="ml-auto float-right company--cost">{{ cost }}</span>
    </b-list-group-item>

    <b-modal v-show="history" ref="modalRef" hide-footer :title="company" size="lg"
             @hide="modalBackdrophandler" @close="modalBackdrophandler" @ok="modalBackdrophandler"
             centered class="historyPopup">

      <charts v-if="chartOptions" :constructor-type="'stockChart'"
              :options="chartOptions" ref="highcharts"></charts>

      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-btn>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Company',
  props: ['company', 'currency'],
  computed: {
    ...mapGetters({
      price: 'companies/getPrice',
      history: 'companies/getHistory',
      modal: 'other/getModalStatus'
    }),
    cost() {
      if (this.price && this.currency) {
        let value = this.price[this.currency];
        if (value) {
          return value[this.company];
        };
        return 'Unknown'
      }
    },
    chartOptions() {
      if (this.history && this.history.Data) {
        return {
          chart: {
            type: 'candlestick',
            zoomType: 'xy',
            credits: false,
          },
          rangeSelector: {
            buttons: [
              {
                type: 'hour',
                count: 7,
                text: '7 hours'
              }, {
                type: 'day',
                count: 1,
                text: '1 day'
              }, {
                type: 'all',
                text: 'All'
              }
            ],
            buttonTheme: {
              width: 55,
              r: 7,
              style: {
                color: '#039',
                fontWeight: 'bold'
              },
              states: {
                hover: {
                },
                select: {
                  fill: '#039',
                  style: {
                    color: 'white'
                  }
                }
              }
            },
            inputBoxBorderColor: 'gray',
            inputBoxWidth: 120,
            inputBoxHeight: 18,
            inputStyle: {
              color: '#039',
              fontWeight: 'bold'
            },
            labelStyle: {
              color: 'silver',
              fontWeight: 'bold'
            },
            selected: 1,
            inputEnabled: false
          },
          navigator: {
            enabled: true
          },
          series: [{
            name: this.currency,
            data: this.history.Data.map(e => {
              return [e.time*1000, e.open, e.high, e.low, e.close]
            }),
          }],
        }
      }
    },
    classed() {
      const base = 'd-flex row mb-1 justify-content-between company';
      return !this.modal? base + ' company--zoom' : base;
    }
  },
  methods: {
    showModal () {
      if (!this.modal) {
        this.$store.dispatch('other/OPEN_POPUP');
        this.getHistory();
        this.$refs.modalRef.show();
      }
    },
    hideModal () {
      this.$refs.modalRef.hide();
      this.closeModal();
    },
    getHistory(time = 'minute') {
      this.$store.dispatch('companies/GET_HISTORY', {time: time, coin: this.currency, company: this.company});
    },
    closeModal() {
      this.$store.dispatch('other/CLOSE_POPUP');
      // this.$store.dispatch('companies/CLEAR_HISTORY');
    },
    modalBackdrophandler(e) {
      if (e && e.type && e.type === 'hide') {
        this.closeModal();
      }
    }
  }
}
</script>