<template>
  <div class="container">
    <div class="coins-list" v-for="coin in coins">
      <Coin v-if="coin" :data="coin"></Coin>
    </div>
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
    })
  }
}
</script>
