import { defineStore } from "pinia"
import { api } from "~/composables/api"

interface Task {
  title: string
  description: string
  date_due: string
  is_completed: number | boolean
}

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
  }),
  getters: {},

  actions: {
    fetch(current_page = 1, keywords = "") {
      return new Promise((resolve, reject) => {
        api("tasks", {
          method: "GET",
          query: {
            current_page,
            per_page: 5,
            keywords,
          },
        })
          .then((response: any) => {
            this.$state.tasks = response.data
            resolve(response)
          })
          .catch((errors) => reject(errors))
      })
    },

    find(id: Number) {
      return api(`tasks/${id}`, {
        method: "GET",
      })
    },

    update(id: Number, task: Task) {
      return api(`tasks/${id}`, {
        method: "PUT",
        body: task,
      })
    },

    insert(task: Task) {
      return api(`tasks`, {
        method: "POST",
        body: task,
      })
    },

    destroy(ids: Number[]) {
      return api(`tasks/${ids.toString()}`, {
        method: "DELETE",
      })
    },
  },
})
