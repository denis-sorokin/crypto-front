<template>
  <div class="home">
    <CoinsList/>
  </div>
</template>

<script>
// @ is an alias to /src
import CoinsList from '@/components/CoinsList.vue'

export default {
  name: 'home',
  components: {
    CoinsList
  }
}
</script>
