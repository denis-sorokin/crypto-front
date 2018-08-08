<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
export default {
  name: 'Coin',
  props: ['data'],
  created() {
    this.$store.dispatch('coin/GET_COIN', this.data);
  }
}
</script>