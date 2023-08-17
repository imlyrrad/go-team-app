<template>
  <div class="w-full">
    <form @submit.prevent="submitForm" class="w-1/2 mx-auto">
      <div class="text-center mb-10">
        <div class="text-2xl">Create an Account</div>
        <div class="font-light">Enter your account information.</div>
      </div>

      <div class="mb-6">
        <div class="relative mb-3">
          <InputField
            label="Name"
            v-model="model.name"
            :err-message="formErrors.name"
          />
          <InputField
            label="Email"
            v-model="model.email"
            :err-message="formErrors.email"
          />
          <InputField
            type="password"
            label="Password"
            v-model="model.password"
            :err-message="formErrors.password"
          />
          <InputField
            type="password"
            label="Confirm Password"
            v-model="model.password_confirmation"
          />

          <NuxtLink to="/"> Already have an account? Login</NuxtLink>

          <div class="text-center my-10">
            <Button
              type="submit"
              label="Create Account"
              :loading="state.submitting"
            ></Button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
/**
 * Components
 */
import InputField from "~/components/InputField.vue"
import Button from "~/components/Button.vue"
import { useUserStore } from "~/stores/userStore"
import { useAppStore } from "~/stores/appStore"
import { Notification } from "~/types"
import { applyErrors } from "~/composables/common"

definePageMeta({
  layout: "login",
})

const state = reactive({
  submitting: false,
})

const initialValues = () => ({
  model: {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  },
  formErrors: {
    name: "",
    email: "",
    password: "",
  },
})

const model = ref(initialValues().model)
const formErrors = reactive(initialValues().formErrors)

const UseUserStore = useUserStore()
const UseAppStore = useAppStore()

function clearForm() {
  Object.assign(model.value, initialValues().model)
  Object.assign(formErrors, initialValues().formErrors)
}

function submitForm() {
  // Enable Spinner
  state.submitting = true

  const payload = Object.assign({}, model.value)
  // Not required i just want only to show the loading transition :D
  setTimeout(() => {
    UseUserStore.insert(payload)
      .then((response: any) => {
        // Fire Notification
        UseAppStore.notify({
          type: "success",
          message: response.message,
        } as Notification)

        // Clear Form
        clearForm()
      })
      // Catch 422 Errors and display on DOM
      .catch((errors) => {
        applyErrors(formErrors, errors)
      })
      .finally(() => (state.submitting = false))
  }, 100)
}
</script>

<style scoped lang="scss"></style>
