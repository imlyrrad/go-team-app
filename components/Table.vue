<template>
  <div class="relative overflow-x-auto">
    <div class="flex justify-end">
      <div class="w-2/3">
        <NuxtLink :to="addRoute">
          <Button width="50" class="mx-2" style-class="bg-green-500">
            <font-awesome-icon icon="fa-sold fa-plus" />
          </Button>
        </NuxtLink>
        <Button
          width="50"
          :disabled="!selectedIds.length"
          @click="emitDeleteCallback"
          style-class="bg-red-500 hover:bg-red-400"
        >
          <font-awesome-icon icon="fa-sold fa-trash" />
        </Button>
      </div>
      <div class="w-1/3">
        <InputField label="Search" v-model="keyword" />
      </div>
    </div>

    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase border">
        <tr>
          <th v-if="action" scope="col" class="px-6 py-3 w-10"></th>
          <th
            scope="col"
            class="px-6 py-5"
            v-for="header in props.headers"
            style="width: 200px"
          >
            {{ header.label }}
          </th>
          <th v-if="action" scope="col" class="px-6 py-3 text-center">
            Action
          </th>
        </tr>
      </thead>
      <tbody class="border">
        <template v-if="rows.length">
          <tr class="bg-white border-b" v-for="row in props.rows">
            <td
              v-if="checkbox"
              class="px-6 py-4 font-medium text-gray-900 text-center"
            >
              <input type="checkbox" v-model="selectedIds" :value="row.id" />
            </td>
            <td
              v-for="header in props.headers"
              class="px-6 py-5 font-medium text-gray-900 whitespace-nowrap max-w-[400px] text-ellipsis overflow-hidden"
            >
              <!-- Dynamic Slot-->
              <template v-if="$slots[header.field]">
                <slot :name="header.field" :item="row"></slot>
              </template>
              <!--  Default -->
              <template v-else>
                {{ row[header.field] }}
              </template>
            </td>
            <td
              v-if="action"
              class="px-6 py-4 font-medium text-gray-900 text-center w-10"
            >
              <slot name="action" :item="row"></slot>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr class="bg-white border-b">
            <td
              class="px-6 py-5 font-medium text-gray-900 text-center text-red-500"
              :colspan="computeTotalColumn"
            >
              No Data Found
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <div class="flex justify-end">
      <Pagination
        :data="pagination"
        @on-page-select="emitPageSelect"
        @on-page-next="emitPageNext"
        @on-page-prev="emitPagePrev"
      />
    </div>
  </div>
</template>

<script setup>
import Pagination from "~/components/Pagination.vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

const props = defineProps({
  headers: Array,
  rows: Array,
  action: {
    type: Boolean,
    default: true,
  },
  checkbox: {
    type: Boolean,
    default: true,
  },
  pagination: Object,
  addRoute: String,
  bindSelectedId: Array,
})

defineComponent({
  Pagination: Pagination,
})

const keyword = ref("")
const selectedIds = ref([])

const emit = defineEmits([
  "onPageSelect",
  "onPagePrev",
  "onPageNext",
  "onSearch",
  "onDelete",
])

const emitPageSelect = function (page) {
  emit("onPageSelect", page)
}
const emitPageNext = function (page) {
  emit("onPageNext", page)
}
const emitPagePrev = function (page) {
  emit("onPagePrev", page)
}

const emitDeleteCallback = function (page) {
  emit("onDelete", selectedIds.value)
}

let debounce = null

watch(
  () => keyword.value,
  (nv) => {
    clearTimeout(debounce)
    debounce = setTimeout(() => {
      emit("onSearch", nv)
    }, 300)
  },
)
// Empty selected ids
watch(
  () => props.bindSelectedId,
  () => {
    selectedIds.value = props.bindSelectedId
  },
)

const computeTotalColumn = computed(() => {
  let headerCount = props.headers.length
  if (props.action) {
    headerCount += 1
  }
  if (props.checkbox) {
    headerCount += 1
  }
  return headerCount
})
</script>

<style lang="scss" scoped>
input[type="checkbox"] {
  transform: scale(2);
}
</style>
