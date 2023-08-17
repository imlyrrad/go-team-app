import { useAppStore } from "~/stores/appStore"

export default defineNuxtRouteMiddleware((to, from) => {
  // redirect to app page
  const isLoggedIn = Boolean(useAppStore().token)
  if (!isLoggedIn) {
    return navigateTo("/")
  }
})
