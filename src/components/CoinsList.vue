<template>
  <div class="container">
    <loader v-if="loading"/>
    <b-list-group :class="loading? 'blur my-5': 'my-5'">
      <Coin v-if="coin" v-for="coin in coins.slice(1, 5)" :data="coin" :key="coin"></Coin>
    </b-list-group>
    <div v-if="modal" class="disable--bg"></div>
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
      coins: 'companies/getCoins',
      loading: 'loader/getLoaderStatus',
      modal: 'other/getModalStatus'
    }),
  }
}
</script>
