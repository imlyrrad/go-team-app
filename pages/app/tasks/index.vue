<template>
  <div class="w-full">
    <Table
      :headers="table.headers"
      :rows="tasks"
      :pagination="pagination"
      :bindSelectedId="selectedIds"
      @on-page-select="onPageSelect"
      @on-page-next="onPageNext"
      @on-page-prev="onPagePrev"
      @on-search="onSearch"
      @on-delete="onDelete"
      add-route="/app/tasks/new"
    >
      <template #is_completed="row: any">
        <div
          :class="
            row.item.is_completed
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white'
          "
          class="px-2 rounded-lg py-1 inline"
        >
          {{ row.item.is_completed ? "Completed" : "Incomplete" }}
        </div>
      </template>
      <template #action="row: any">
        <NuxtLink :to="`/app/tasks/${row.item.id}`">Edit</NuxtLink>
      </template>
    </Table>

    <Dialog
      :visible="showModal"
      key="modal"
      @on-close="hideModal"
      :on-confirm="onConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import Table from "~/components/Table.vue"
import { useTaskStore } from "~/stores/taskStore"
import { storeToRefs } from "pinia"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import Dialog from "~/components/Dialog.vue"
import { Notification } from "~/types"
import { useAppStore } from "~/stores/appStore"

definePageMeta({
  middleware: ["app"],
  layout: "app",
})

defineComponent({
  Table: Table,
})

const showModal = ref(false)
const selectedIds = ref([] as Number[])

const table = reactive({
  headers: [
    { label: "Tasks", field: "title" },
    { label: "Description", field: "description" },
    { label: "Due Date", field: "date_due" },
    { label: "Completion Status", field: "is_completed" },
  ],
})

const UseTaskStore = useTaskStore()
const UseAppStore = useAppStore()

const { tasks } = storeToRefs(UseTaskStore)
const pagination = ref({
  current_page: 1,
  last_page: 0,
  per_page: 5,
  total: 0,
})

const keywords = ref("")

const fetchTasks = function (page: number) {
  UseTaskStore.fetch(page, keywords.value).then((response: any) => {
    pagination.value = response.meta
  })
}

onMounted(() => {
  fetchTasks(1)
})

function onPageSelect(page: number) {
  fetchTasks(page)
}

function onPagePrev(page: number) {
  page && page--
  fetchTasks(page)
}

function onPageNext(page: number) {
  page < pagination.value.last_page && page++
  fetchTasks(page)
}

function onSearch(keyword: string) {
  keywords.value = keyword
  fetchTasks(1)
}

function onDelete(ids: Number[]) {
  selectedIds.value = ids
  showModal.value = true
}

function hideModal() {
  showModal.value = false
}

function onConfirm() {
  UseTaskStore.destroy(selectedIds.value).then((response: any) => {
    /* Hide Modal*/
    hideModal()

    /* Refresh Table */
    fetchTasks(pagination.value.current_page)

    /* Clear Selected IDs*/
    selectedIds.value = []

    /* Fires Notification */
    UseAppStore.notify({
      type: "success",
      message: response.message,
    } as Notification)
  })
}
</script>

<style lang="scss" scoped></style>
