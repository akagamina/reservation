
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const roomType = {
  ROOM: "room",
  LANDSCAPE: "landscape"
}

const dbKey = "choices"

export default new Vuex.Store({
  state: {
    menuList: [
      {
        id: "History",
        key: 0,
        value: "Tarih"
      },
      {
        id: "Room",
        key: 1,
        value: "Oda"
      },
      {
        id: "Paid",
        key: 2,
        value: "Ödeme"
      },
    ],
    creditCard: {
      name: '',
      cardNumber: '',
      expiration: '',
      security: ''
    },
    history: {},
    room: {
      roomType: {},
      landscapeChoice: {}
    }
  },
  getters: {
    paymentMenuList: (state) => state.menuList,
    historyCheck: (state) => state.history,
    getRoomChoice: (state) => state.room,
    getCreditCard: (state) => state.creditCard
  },
  mutations: {
    handleCheckInDate(state, data) {
      state.history.checkIn = data
    },
    handleCheckOutDate(state, data) {
      state.history.checkOut = data
    },
    handleChoices(state, data) {
      state.history = data.history
      state.room = data.room
    },
    handleRoomOptions(state, data) {

      switch (data.type) {
        case roomType.ROOM:
          state.room.roomType = {
            value: data.value,
            id: data.id,
            type: data.type
          }
          break
        case roomType.LANDSCAPE:
          state.room.landscapeChoice = {
            value: data.value,
            id: data.id,
            type: data.type
          }
          break
        default:
          break
      }
    }
  },
  actions: {
    putCheckInDate({ commit }, payload) {
      commit("handleCheckInDate", payload)
    },
    putCheckOutDate({ commit }, payload) {
      commit("handleCheckOutDate", payload)
    },
    putRoomOptions({ commit }, payload) {
      commit("handleRoomOptions", payload)
    },
    putChoices({ state }) {
      const items = {
        history: state.history,
        room: state.room
      }
      localStorage.setItem(dbKey, JSON.stringify(items))
    },
    getChoices({ commit }) {
      let items = localStorage.getItem(dbKey)
      commit("handleChoices", JSON.parse(items))
    }
  }
})