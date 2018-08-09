<template>
  <div class="container">
    <b-list-group class="my-5">
      <Coin v-if="coin" v-for="coin in coins.slice(1, 5)" :data="coin" :key="coin"></Coin>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Coin from './common/Coin'

export default {
  name: 'CoinsList',
  components: { Coin },
  created() {
    this.$store.dispatch('companies/GET_COINS');
  },
  computed: {
    ...mapGetters({
      companies: 'companies/getCompanies',
      coins: 'companies/getCoins'
    }),
  }
}
</script>
