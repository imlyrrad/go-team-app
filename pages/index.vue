<template>
  <div class="w-full">
    <form @submit.prevent="submitForm" class="w-1/2 mx-auto">
      <div class="text-center mb-10">
        <div class="text-2xl">Sign in</div>
        <div class="font-light">Enter your username and password</div>
      </div>
      <div class="mb-6">
        <div class="relative mb-3">
          <InputField
            label="Email Address"
            v-model="model.email"
            :err-message="formErrors.email"
          />

          <InputField
            type="password"
            label="Password"
            v-model="model.password"
            :err-message="formErrors.password"
          />

          <NuxtLink to="register"> Create an account.</NuxtLink>

          <div class="text-center my-5">
            <Button
              type="submit"
              label="Login"
              :loading="state.submitting"
            ></Button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import InputField from "~/components/InputField.vue"
import Button from "~/components/Button.vue"
import { useAppStore } from "~/stores/appStore"
import { applyErrors } from "~/composables/common"
import { setCookie } from "~/composables/cookies"

definePageMeta({
  layout: "login",
  middleware: ["auth"],
})

const state = reactive({
  submitting: false,
})
const initialValues = () => ({
  email: "",
  password: "",
})

const model = ref(initialValues())
onMounted(() => {
  model.value.email = "darrylceguerra@gmail.com"
  model.value.password = "Password@123"
})

const formErrors = reactive(initialValues())
const UseAppStore = useAppStore()

function submitForm() {
  // Enable Spinner
  state.submitting = true

  setTimeout(() => {
    const payload = Object.assign({}, model.value)
    UseAppStore.login(payload)
      .then((response: any) => {
        const token = response.data.token
        setCookie("go-team-token", token, 1)
        UseAppStore.setToken(token)
        UseAppStore.setCurrentUser(response.data.user)
        navigateTo("/app")
      })
      .catch((errors) => {
        applyErrors(formErrors, errors)
      })
      .finally(() => (state.submitting = false))
  }, 100)
}
</script>

<style scoped lang="scss"></style>
