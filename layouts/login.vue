<template>
  <!--  Notification Section-->
  <TransitionGroup tag="ul" name="fade" class="fixed top-0 w-full">
    <Alert v-for="item in notifications" :key="`x-${item.id}`" :notify="item" />
  </TransitionGroup>

  <!--  Screen Section -->
  <div class="h-screen md:flex" v-if="render">
    <div class="md:basis-1/2 flex justify-center items-center">
      <div>
        <img src="~assets/images/banner.jpg" alt="" />
      </div>
    </div>
    <div class="md:basis-1/2 flex justify-center items-center">
      <slot />
    </div>
  </div>
  <div v-else>
    <div class="w-full h-screen flex items-center justify-center bg-white">
      Loading App...
    </div>
  </div>
</template>

<script setup lang="ts">
import Alert from "~/components/Alert.vue"
import { useAppStore } from "~/stores/appStore"
import { storeToRefs } from "pinia"
import { getCookie } from "~/composables/cookies"

const UseAppStore = useAppStore()
const { notifications } = storeToRefs(UseAppStore)
const render = ref(false)

onBeforeMount(() => {
  const token = getCookie("go-team-token")
  if (token) {
    UseAppStore.verify(token)
      .then((response: any) => {
        UseAppStore.setToken(token)
        UseAppStore.setCurrentUser(response.data.user)
        navigateTo("/app/tasks")
      })
      .finally(() => {
        setTimeout(() => {
          render.value = true
        }, 100)
      })
  } else {
    setTimeout(() => {
      render.value = true
    },100)
  }
})
</script>

<style scoped lang="scss"></style>
