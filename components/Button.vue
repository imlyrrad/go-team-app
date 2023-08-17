<template>
  <button
    :style="{ width: `${width}px` }"
    class="text-white bg-blue-700 px-5 py-3 rounded-[100px]"
    :class="[
      loading && 'bg-blue-500',
      disabled ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-500',
      styleClass,
    ]"
    :disabled="loading || disabled"
    v-bind="$attrs"
  >
    <template v-if="loading">
      <div class="flex items-center">
        <Spinner />
      </div>
    </template>
    <template v-else>
      {{ label }}
      <slot />
    </template>
  </button>
</template>

<script setup lang="ts">
import Spinner from "~/components/Spinner.vue"

defineProps({
  label: [String, Number],
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  width: {
    type: Number,
    default: 200,
  },
  styleClass: String
})

defineComponent({
  Spinner: Spinner,
})
</script>

<style lang="scss" scoped></style>
