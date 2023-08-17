import { defineStore } from "pinia"
import { Notification, Credential } from "~/types"
import { api } from "~/composables/api"

export const useAppStore = defineStore("appStore", {
  state: () => ({
    notifications: [] as Notification[],
    token: "",
    user: {} as any,
  }),

  getters: {
    getToken(state) {
      return state.token
    },
  },

  actions: {
    // General Actions
    notify(notification: Notification) {
      this.$state.notifications = [notification, ...this.$state.notifications]

      // Auto Remove Notification
      setTimeout(() => {
        this.removeNotification(notification.id)
      }, 4000)
    },

    removeNotification(id: Number) {
      const i = this.$state.notifications.findIndex((n) => n.id === id)
      i !== -1 && this.$state.notifications.splice(i, 1)
    },

    /* Authentication*/
    setToken(token: string) {
      this.$state.token = token
    },

    login(payload: Credential) {
      return api("auth", {
        method: "POST",
        body: payload,
      })
    },

    logout() {
      this.setToken("")
      deleteCookie("go-team-token")
    },

    verify(token: string) {
      return api("auth", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    },

    setCurrentUser(userInfo: Object) {
      this.$state.user = {
        ...userInfo,
        ...this.$state.user,
      }
    },
  },
})
