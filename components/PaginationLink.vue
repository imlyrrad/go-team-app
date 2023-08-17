<template>
  <li>
    <a
      class="flex items-center justify-center px-5 h-14 leading-tight text-gray-500 bg-white border border-gray-300 cursor-pointer"
      :class="active && 'dark:border-gray-700 dark:bg-gray-700 dark:text-white'"
    >
      {{ page }}
    </a>
  </li>
</template>

<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    default: false,
  },

  page: [Number, String],
})
</script>

<style lang="scss" scoped></style>
