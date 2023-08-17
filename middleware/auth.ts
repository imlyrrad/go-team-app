import { useAppStore } from "~/stores/appStore"

// const isLoggedIn = false
export default defineNuxtRouteMiddleware((to, from) => {
  // redirect to app page

  const isLoggedIn = Boolean(useAppStore().token)
  if (to.path === "/" && isLoggedIn) {
    return navigateTo("/app/tasks")
  }
})
