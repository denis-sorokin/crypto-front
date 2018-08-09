<template>
  <b-list-group-item class="company d-flex row mb-1 justify-content-between" @click="showModal">
    <span class="align-start">{{ company }}</span>
    <span class="align-middle">{{ cost }}</span>
    <b-modal ref="modalRef" title="Currency history">
      <charts constructor-type="stockChart" :options="chart"></charts>
    </b-modal>
  </b-list-group-item>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Company',
  props: ['company', 'currency'],
  data() {
    return {
      chart: {
        series: [{
          data: [1,2,3]
        }]
      }
    }
  },
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
  },
  methods: {
    showModal () {
      this.$store.dispatch('companies/GET_HISTORY', {time: 'day', coin: this.currency, company: this.company});
      this.$refs.modalRef.show()
    },
    hideModal () {
      this.$refs.modalRef.hide()
    }
  }
}
</script>