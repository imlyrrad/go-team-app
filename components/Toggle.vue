<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      value=""
      class="sr-only peer"
      :checked="Boolean(modelValue)"
      @input="$emit('update:modelValue', !Boolean(modelValue))"
    />
    <div
      class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
    ></div>
    <span class="ml-3 text-sm font-medium"> {{label}} </span>
  </label>
</template>

<script setup lang="ts">
defineEmits(["update:modelValue"])
defineProps({
  modelValue: [Boolean, Number],
  label: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
