<template>
  <b-list-group-item class="coin d-flex row my-1">
    <div class="d-flex justify-content-between w-75 coin--title">
      <span class="align-middle">{{ data }}</span>
      <span class="align-middle">{{ coinAverage | averageCost }}</span>
      <span class="align-middle">{{ companyWithCoin.length }}</span>
    </div>

    <div class="ml-auto">
      <b-btn @click="loadTable"
             :class="showTable ? 'collapsed' : null"
             :aria-controls="`collapse-${data}`"
             variant="primary"
             :aria-expanded="showTable ? 'true' : 'false'">
        Open
      </b-btn>
    </div>
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
    })
  },
  created() {
    this.$store.dispatch('coin/GET_COIN', this.data);
  },
  computed: {
    ...mapGetters({
      companies: 'companies/getCompanies',
      coinsAverage: 'coin/coins'
    }),
    companyWithCoin() {
      return Object.keys(this.companies).reduce((acc, val) => {
        if (this.data in this.companies[val]) {
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