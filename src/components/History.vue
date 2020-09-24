<template>
  <div>

    <div class="d-flex">
      <label class="w-25 d-flex align-items-center"
             for="checkIn">Check-in</label>
      <b-form-datepicker v-model="checkInValue"
                         id="checkIn"
                         placeholder="Check-in tarihini giriniz"
                         @input="checkIn"
                         :min="date"
                         class="mb-2"
                         :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                         locale="en"
                         :state="!checkInValue ? stateCheckIn : null">
      </b-form-datepicker>
    </div>
    <div class="d-flex">
      <label class="w-25 d-flex align-items-center"
             for="checkOut">Check-out</label>
      <b-form-datepicker v-model="checkOutValue"
                         id="checkOut"
                         placeholder="Check-out tarihini giriniz"
                         @input="checkOut"
                         :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                         locale="en"
                         :min="date"
                         class="mb-2"
                         :state="!checkOutValue ? stateCheckOut : null">
      </b-form-datepicker>
    </div>
  </div>
</template>

<script>
import { BFormDatepicker } from 'bootstrap-vue'
export default {
  data() {
    return {
      date: new Date(),
      checkInValue: this.initialCheckInValue || "",
      checkOutValue: this.initialCheckOutValue || "",
      warning: false
    }
  },
  props: {
    stateCheckIn: {
      type: Boolean,
      default: null
    },
    stateCheckOut: {
      type: Boolean,
      default: null
    },
    initialCheckInValue: {
      type: String,
      default: ''
    },
    initialCheckOutValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    checkIn(val) {
      this.$emit("checkIn", val)
    },
    checkOut(val) {
      this.$emit("checkOut", val)
    }
  },
  components: {
    BFormDatepicker
  },
  mounted() {
    console.log("asds")
  },

}
</script>

<style lang="scss" scoped>
</style>