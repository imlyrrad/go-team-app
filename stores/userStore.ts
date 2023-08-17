import { defineStore } from "pinia"
import { api } from "~/composables/api"

interface User {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export const useUserStore = defineStore("userStore", {
  state: () => ({}),
  getters: {},
  actions: {
    insert(payload: User) {
      return api("users", {
        method: "POST",
        body: payload,
      })
    },
  },
})
