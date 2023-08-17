<template>
  <form @submit.prevent="onSubmit" v-if="render">
    <div class="text-4xl mb-5">{{ id ? "Edit" : "Add" }} Task</div>
    <div class="flex justify-between">
      <InputField
        label="Title"
        class="w-3/12"
        v-model="model.title"
        :err-message="formErrors.title"
      />
      <InputField
        label="Due Date"
        type="date"
        class="w-3/12"
        v-model="model.date_due"
        :err-message="formErrors.date_due"
      />
    </div>
    <TextAreaField
      label="Description"
      v-model="model.description"
      :err-message="formErrors.description"
    ></TextAreaField>

    <Toggle v-model="model.is_completed" label="Completion Status"></Toggle>

    <div class="flex justify-end">
      <NuxtLink to="/app/tasks">
        <Button label="Back" class="mr-2"></Button>
      </NuxtLink>
      <Button
        type="submit"
        :label="id ? 'Update' : 'Save'"
        class="mr-2"
        :loading="state.isSubmitting"
        :disabled="state.isSubmitting"
      ></Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import Toggle from "~/components/Toggle.vue"
import { useTaskStore } from "~/stores/taskStore"
import { applyErrors } from "~/composables/common"
import { useAppStore } from "~/stores/appStore"
import { Notification } from "~/types"

defineComponent({
  Toggle: Toggle,
})

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
})

const UseTaskStore = useTaskStore()
const UseAppStore = useAppStore()

const initialValue = () => ({
  model: {
    title: "",
    description: "",
    date_due: "",
    is_completed: 0,
  },

  formErrors: {
    title: "",
    description: "",
    date_due: "",
  },
})

const model = ref(initialValue().model)
const formErrors = reactive(initialValue().formErrors)
const state = reactive({
  isSubmitting: false,
})

const render = ref(false)

onBeforeMount(() => {
  if (!props.id) {
    render.value = true
  } else {
    UseTaskStore.find(props.id).then((response: any) => {
      Object.assign(model.value, response.data)
      render.value = true
    })
  }
})

function clearForm() {
  Object.assign(model.value, initialValue().model)
  Object.assign(formErrors, initialValue().formErrors)
}

function fireNotification(message: string) {
  UseAppStore.notify({
    type: "success",
    message,
  } as Notification)
}

function onSubmit() {
  const payload = Object.assign({}, model.value)
  state.isSubmitting = true
  if (props.id) {
    // Update
    UseTaskStore.update(props.id, payload)
      .then((response: any) => fireNotification(response.message))
      .finally(() => (state.isSubmitting = false))
  } else {
    // Insert
    UseTaskStore.insert(payload)
      .then((response: any) => {
        clearForm()
        fireNotification(response.message)
      })
      .catch((errors: any) => applyErrors(formErrors, errors))
      .finally(() => (state.isSubmitting = false))
  }
}
</script>

<style lang="scss" scoped></style>
