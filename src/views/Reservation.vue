<template>
  <div class="reservation h-100">
    <b-row align-v="center"
           align-h="center"
           class="h-100">
      <b-col class="box-block p-3"
             sm="8"
             cols="10">
        <b-col cols="12"
               class="p-3">
          <div class="wrapper"
               v-if="!process">
            <v-stepper class="mb-3"
                       ref="stepper"
                       :withDivider="false"
                       :steps="steps"
                       v-model="step">
              <template slot="step-1">
                <span class="text-info pl-3">
                  Tarih
                </span>
              </template>
              <template slot="step-2">
                <span class="text-info pl-3">
                  Oda
                </span>
              </template>
              <template slot="step-3">
                <span class="text-info pl-3">
                  Ödeme
                </span>
              </template>

            </v-stepper>

            <div class="bg-success text-white p-3"
                 v-if="step === 2 || step === 3">
              <p class="m-0"
                 v-if="historyCheck.checkIn">Check-in: {{historyCheck.checkIn}}</p>
              <p class="m-0"
                 v-if="historyCheck.checkOut">Check-out: {{historyCheck.checkOut}}</p>
            </div>

            <div class="bg-success text-white p-3"
                 v-if="step === 3">
              <p class="m-0"
                 v-if="getRoomChoice.roomType">Oda Tipi: {{getRoomChoice.roomType.value}}</p>
              <p class="m-0"
                 v-if="getRoomChoice.landscapeChoice">Manzara Seçimi: {{getRoomChoice.landscapeChoice.value}}</p>
            </div>

            <div class="bg-danger p-3 mt-3"
                 v-if="warning">
              Boş alanlar doldurulmalı
            </div>

            <template v-if="step === 1">
              <History @checkIn="handleCheckIn"
                       @checkOut="handleCheckOut"
                       :stateCheckOut="state"
                       :stateCheckIn="state"
                       :initialCheckInValue="historyCheck.checkIn"
                       :initialCheckOutValue="historyCheck.checkOut" />
            </template>
            <template v-if="step === 2">
              <Room @changed="handleChanged"
                    :initialValue="getRoomChoice"
                    :state="radioButtonState" />
            </template>

            <template v-if="step === 3">
              <Paid :creditCard="creditCard" />
            </template>

            <div class="d-flex justify-content-between mt-4">
              <div>
                <b-button variant="info"
                          v-if="step !== 1 && step !== 4"
                          @click="handlePrevious">
                  Önceki
                </b-button>
              </div>

              <div>
                <b-button variant="primary"
                          @click="handleNext">
                  {{step !== 3 ? 'Sonraki' : 'Ödeme Yap'}}
                </b-button>
              </div>
            </div>
          </div>

          <div v-else>
            <div class="bg-success text-white text-center p-3">
              <p class="m-0"> Rezervasyonunuz başarı ile tamamlanmıştır </p>
            </div>
            <div class="bg-info text-white p-3 mt-3">
              <div> Check-in Tarihi: {{historyCheck.checkIn}}</div>
              <hr>
              <div> Check-out Tarihi: {{historyCheck.checkOut}}</div>
              <hr>
              <div> Manzara Seçimi: {{getRoomChoice.landscapeChoice.value}}</div>
              <hr>
              <div> Oda Seçimi: {{getRoomChoice.roomType.value}}</div>
            </div>
          </div>
        </b-col>
      </b-col>

    </b-row>
  </div>
</template>

<script>
import History from '@/components/History'
import Room from '@/components/Room'
import Paid from '@/components/Paid'
import { VStepper } from 'vue-stepper-component'

import { BRow, BCol, BFormDatepicker, BButton } from 'bootstrap-vue'
import { mapGetters, mapActions } from "vuex"

const dbKey = "choices"


export default {
  name: 'Home',
  components: {
    VStepper,
    History,
    BRow,
    BCol,
    Paid,
    BButton,
    BFormDatepicker,
    Room
  },
  data() {
    return {
      currentTab: "History",
      steps: 3,
      step: undefined,
      state: null,
      radioButtonState: null,
      warning: false,
      process: false,
      creditCard: {
        name: "",
        cardNumber: "",
        expiration: "",
        security: ""
      },
    }
  },
  watch: {
    historyCheck: {
      deep: true,
      handler(val) {
        if (val.checkIn && val.checkOut) this.warning = false
      }
    },
    getRoomChoice: {
      deep: true,
      handler(val) {
        if (val.landscapeChoice.value && val.roomType.value) this.warning = false
      }
    },
    creditCard: {
      deep: true,
      handler(val) {
      }
    },

  },
  mounted() {
    let items = localStorage.getItem(dbKey)
    if (items) this.getChoices()
  },
  methods: {
    ...mapActions({
      putCheckInDate: 'putCheckInDate',
      putCheckOutDate: "putCheckOutDate",
      putRoomOptions: "putRoomOptions",
      putChoices: "putChoices",
      getChoices: "getChoices",
    }),
    handleCheckIn(val) {
      this.putCheckInDate(val)
    },
    handleCheckOut(val) {
      this.putCheckOutDate(val)
    },
    handleChanged(val) {
      this.putRoomOptions(val)
    },
    handlePrevious() {
      this.$refs.stepper.previous()
      this.warning = false
    },
    handleNext() {
      switch (this.step) {
        case 1:
          if (this.historyCheck.checkIn && this.historyCheck.checkOut) {
            this.$refs.stepper.next()
            this.warning = false
            this.putChoices()
          }
          else {
            this.state = false
            this.warning = true
          }
          break
        case 2:
          if (this.getRoomChoice.roomType.value && this.getRoomChoice.landscapeChoice.value) {
            this.$refs.stepper.next()
            this.warning = false
            this.putChoices()
          }
          else {
            this.radioButtonState = false
            this.warning = true
          }
          break
        case 3:
          if (!this.validateForm) {
            this.warning = true
          } else {
            this.$refs.stepper.next()
            this.process = true
            console.log("Tarih:", this.historyCheck.checkIn + "/" + this.historyCheck.checkOut)
            console.log("Oda:", this.getRoomChoice.roomType.value)
            console.log("Manzara:", this.getRoomChoice.landscapeChoice.value)
          }
          break
        default:
          break
      }
    },
  },

  handleCreditCard(val) {

  },
  computed: {
    ...mapGetters(["paymentMenuList", "historyCheck", "getRoomChoice", "getCreditCard"]),
    validateForm() {
      return this.creditCard.cardNumber && this.creditCard.expiration && this.creditCard.name && this.creditCard.security
    }
  },
}
</script>

<style lang="scss">
.reservation {
  background-color: #f8f9fa;
  .box-block {
    border: 0.5px solid #e4e4e4;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
    border-radius: 4px;
  }
}

div.v-stepper > div.v-stepper-root > div.v-step {
  pointer-events: none;
}

@media (max-width: 575.8px) {
  .v-stepper .v-stepper-root {
    display: block !important;
  }
}

.tabbed {
  .tab-item {
    border: 1px solid #c3c3c3;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
