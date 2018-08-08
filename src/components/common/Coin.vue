<template>
  <b-list-group-item v-if="coinAverage" class="coin d-flex row my-1">
    <div class="d-flex justify-content-between w-75">
      <span class="align-middle">{{ data }}</span>
      <span class="align-middle">{{ coinAverage | averageCost }}</span>
      <span class="align-middle">{{ companyWithCoin }}</span>
    </div>

    <div class="ml-auto">
      <b-btn :v-b-toggle="`collapseTable-${data}`" variant="primary">Open</b-btn>
      <b-collapse :id="`collapseTable-${data}`" class="mt-2">
        Content
      </b-collapse>
    </div>
  </b-list-group-item>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Coin',
  props: ['data'],
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
          acc += 1
        }
        return acc
      }, 0)
    },
    coinAverage() {
      return this.coinsAverage[this.data]
    }
  },
}
</script>