<template>
  <b-list-group-item class="coin d-flex row my-1">
    <div class="d-flex justify-content-between w-75 coin--title">
      <span class="align-middle">{{ data }}</span>
      <span class="align-middle">{{ coinAverage | averageCost }}</span>
      <span class="align-middle">{{ companyWithCoin.length }}</span>
    </div>

    <div class="ml-auto">
      <b-btn @click="showTable = !showTable"
             :class="showTable ? 'collapsed' : null"
             :aria-controls="`collapse-${data}`"
             variant="primary"
             :aria-expanded="showTable ? 'true' : 'false'">
        Open
      </b-btn>
    </div>
    <b-collapse class="mt-2 w-100" v-model="showTable" :id="`collapse-${data}`">
      <b-table striped hover :items="companiesTable"></b-table>
    </b-collapse>
  </b-list-group-item>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Coin',
  props: ['data'],
  data() {
    return ({
      showTable: false
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
    companiesTable() {
      return this.companyWithCoin.map(e => {
        return {Company: e}
      })
    },
    coinAverage() {
      return this.coinsAverage[this.data]
    }
  },
}
</script>