<template>
  <div v-if="loading" class="loader">
    <img src="../../assets/logo.png" alt="logo">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Loader',
  computed: {
    ...mapGetters({
      loading: 'loader/getLoaderStatus'
    })
  }
}
</script>