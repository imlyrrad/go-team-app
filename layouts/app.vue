<template>
  <TransitionGroup tag="ul" name="fade" class="fixed top-0 w-full">
    <Alert v-for="item in notifications" :key="`x-${item.id}`" :notify="item" />
  </TransitionGroup>

  <div class="flex items-center justify-center h-screen">
    <div class="w-4/5">
      <div class="my-10 flex justify-between">
        <div>
          <div class="text-2xl">
            Welcome <span class="font-bold">{{ user.name }}</span
            >!
          </div>
        </div>
        <Button @click="logout" :width="130" style-class="bg-gray-400">
          <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
          Logout
        </Button>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Alert from "~/components/Alert.vue"
import { useAppStore } from "~/stores/appStore"
import { storeToRefs } from "pinia"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

const UseAppStore = useAppStore()
const { notifications, user } = storeToRefs(UseAppStore)

function logout() {
  UseAppStore.logout()
  navigateTo("/")
}
</script>

<style scoped></style>
