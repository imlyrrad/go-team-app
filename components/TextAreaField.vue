<template>
  <div class="mb-3">
    <textarea
      :placeholder="label"
      class="w-full p-4"
      :value="modelValue"
      :rows="5"
      :class="{ 'with-errors': errMessage }"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="errMessage" class="text-red-500 px-4 mt-1">{{ errMessage }}</div>
  </div>
</template>

<script setup>
defineEmits(["update:modelValue"])

defineProps({
  modelValue: [String, Number],
  label: { type: String, required: true },
  errMessage: String,
})
</script>

<style lang="scss" scoped>
textarea {
  border: 1px solid #123;

  &:focus {
    outline: none;
  }

  &.with-errors {
    border-color: red;
  }
}
</style>
