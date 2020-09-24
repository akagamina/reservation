<template>
  <div>
    <VCreditCard ref="cards"
                 @change="creditInfoChanged"
                 :trans="translations" />
  </div>
</template>

<script>
import VCreditCard from 'v-credit-card'
import 'v-credit-card/dist/VCreditCard.css'

const translations = {
  name: {
    label: 'İsim',
    placeholder: 'Kart üzerindeki isim'
  },
  card: {
    label: 'Kart',
    placeholder: 'Kart numarası'
  },
  expiration: {
    label: 'SKT'
  },
  security: {
    label: 'CVC',
    placeholder: 'Güvenlik numarası'
  }
}
export default {
  components: { VCreditCard },
  props: {
    creditCard: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      translations,

    }
  },

  methods: {
    creditInfoChanged(values) {
      for (const key in values) {
        this.creditCard[key] = values[key]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>