<template>
  <b-list-group-item class="coin d-flex row my-1">
    <b-row class="d-flex justify-content-between mx-auto w-100 coin--title">
      <b-col><span class="float-left">{{ data }}</span></b-col>
      <b-col><span class="mr-auto float-left">{{ coinAverage | averageCost }}</span></b-col>
      <b-col><span class="float-right">{{ companyWithCoin.length }}</span></b-col>

      <b-col>
        <b-btn @click="loadTable"
               :class="showTable ? 'collapsed float-right' : 'float-right'"
               :aria-controls="`collapse-${data}`"
               variant="primary"
               :aria-expanded="showTable ? 'true' : 'false'">
          Open
        </b-btn>
      </b-col>
    </b-row>

    <b-collapse class="mt-2 w-100" v-model="showTable" :id="`collapse-${data}`">
      <b-list-group class="d-flex w-100">
        <Company :company="company" v-for="company in companyWithCoin" :currency="data"
                 @click="openHistory(company)" :key="company"/>
      </b-list-group>
    </b-collapse>
  </b-list-group-item>
</template>

<script>
import { mapGetters } from 'vuex'
import Company from './Company'

export default {
  name: 'Coin',
  components: { Company },
  props: ['data'],
  data() {
    return ({
      showTable: false,
      coinAvg: []
    })
  },
  created() {
    this.$store.dispatch('coin/GET_COIN', this.data);
  },
  computed: {
    ...mapGetters({
      companies: 'companies/getCompanies',
      coinsAverage: 'coin/coins',
      price: 'companies/getPrice'
    }),
    companyWithCoin() {
      return Object.keys(this.companies).reduce((acc, val) => {
        if (
          this.data in this.companies[val] &&
          (this.companies[val][this.data].includes('USD') ||
            this.companies[val][this.data].includes('BTC'))
          ) {
          acc.push(val)
        }
        return acc
      }, [])
    },
    coinAverage() {
      return this.coinsAverage[this.data]
    }
  },
  methods: {
    openHistory(company) {
      console.log(company)
    },
    loadTable() {
      if (!this.showTable) {
        this.companyWithCoin.forEach(company => {
          this.$store.dispatch('companies/GET_PRICE', {
            coin: this.data,
            company: company
          });
        });
      }

      this.showTable = !this.showTable
    }
  }
}
</script>