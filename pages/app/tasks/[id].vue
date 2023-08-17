<template>
  <div class="w-full">
    <TaskForm :id="Number(taskId)"></TaskForm>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "~/stores/taskStore"
import TaskForm from "~/components/forms/TaskForm.vue"

definePageMeta({
  middleware: ["app"],
  layout: "app",
})

defineComponent({
  TaskForm,
})

const route = useRoute()
const taskId = route.params.id
</script>

<style scoped></style>
