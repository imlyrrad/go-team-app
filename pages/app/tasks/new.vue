<template>
  <div class="w-full">
    <TaskForm></TaskForm>
  </div>
</template>

<script setup lang="ts">
import TaskForm from "~/components/forms/TaskForm.vue"

definePageMeta({
  middleware: ["app"],
  layout: "app",
})

defineComponent({
  TaskForm,
})
</script>

<style scoped></style>
