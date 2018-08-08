<template>
  <b-list-group-item class="company d-flex row mb-1 justify-content-between">
    <span class="align-start">{{ company }}</span>
    <span class="align-middle">{{ cost }}</span>

  </b-list-group-item>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Company',
  props: ['company', 'currency'],
  computed: {
    ...mapGetters({
      price: 'companies/getPrice'
    }),
    cost() {
      if (this.price && this.currency) {
        let value = this.price[this.currency];
        if (value) {
          return value[this.company];
        };
      }
    }
  }
}
</script>