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
    historyData() {
      return this.history.Data.map(e => {
        return [e.time*1000, e.open, e.high, e.low, e.close]
      })
    },
    chartOptions() {
      if (this.history && this.history.Data) {
        return {
          chart: {
            type: 'candlestick',
            zoomType: 'x',
          },
          rangeSelector: {
            buttons: [
              {
                type: 'hour',
                count: 12,
                text: '12 hours'
              }, {
                type: 'day',
                count: 3,
                text: '3 days'
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
            selected: 2,
            inputEnabled: false
          },
          navigator: {
            adaptToUpdatedData: false,
            series: {
              data: this.historyData
            }
          },
          series: [{
            name: this.currency,
            dataGrouping: {
              enabled: false
            },
            data: this.historyData
          }],
          xAxis: {
            events: {
              setExtremes: this.loadData
            },
            minRange: 3600 * 1000 // one hour
          },
          yAxis: {
            floor: 0
          },
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
    getHistory(time = 'hour') {
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
    },
    loadData(e) {
      console.log(e)
      // this.getHistory(e.to);
      let lineCharts = this.$refs.highcharts;
      lineCharts.showLoading('Loading data from server...');
      lineCharts.addSeries(this.historyData);
      lineCharts.hideLoading();
    }
  }
}
</script>