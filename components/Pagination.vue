<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex -space-x-px text-sm py-5">
      <PaginationLink
        page="Prev"
        @click="$emit('onPagePrev', data.current_page)"
      />
      <template v-for="(page, index) in data.last_page">
        <!--  Check if on first page      -->
        <template v-if="isFirstPage">
          <!--  Display Initial Page-->
          <template v-if="index < setting.range">
            <PaginationLink
              :active="page === data.current_page"
              :page="page"
              @click="$emit('onPageSelect', page)"
            />
          </template>
        </template>
        <template v-else>
          <!-- Check if Near Last Page-->
          <template v-if="isLastPage">
            <template v-if="page > data.last_page - setting.range">
              <PaginationLink
                :active="page === data.current_page"
                :page="page"
                @click="$emit('onPageSelect', page)"
              />
            </template>
          </template>
          <template v-else>
            <!-- Page Moved-->
            <template v-if="page <=withinMaxRange && withinMinRange <= page">
              <PaginationLink
                  :active="page === data.current_page"
                  :page="page"
                  @click="$emit('onPageSelect', page)"
              />
            </template>

          </template>
        </template>
      </template>
      <PaginationLink
        page="Next"
        @click="$emit('onPageNext', data.current_page)"
      />
    </ul>
  </nav>
</template>

<script setup lang="ts">
import PaginationLink from "~/components/PaginationLink.vue"

defineComponent({
  PaginationLink: PaginationLink,
})

interface Meta {
  total: number
  last_page: number
  current_page: number
  per_page: number
}

const setting = reactive({
  range: 5,
  span: 2,
})

const props = defineProps({
  data: {
    type: Object,
    default() {
      return {} as Meta
    },
  },
})

const isFirstPage = computed(() => {
  return props.data.current_page === 1
})

const isLastPage = computed(() => {
  return props.data.last_page - setting.range < props.data.current_page
})

const withinMaxRange = computed(() => {
  return props.data.current_page + setting.span
})
const withinMinRange = computed(() => {
  return props.data.current_page - setting.span
})

defineEmits(["onPagePrev", "onPageNext", "onPageSelect"])
</script>

<style lang="scss" scoped></style>
