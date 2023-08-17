<template>
  <div
    class="absolute top-0 left-0 right-0 bottom-0 h-screen flex items-center justify-center"
    :class="{ hidden: !show }"
  >
    <div class="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50" />
    <div class="bg-white w-1/4 z-10">
      <div class="p-4 flex border-b justify-between items-center">
        <div>Confirmation</div>
        <div
          class="rounded-full px-2 py-1 cursor-pointer hover:bg-gray-100"
          @click="$emit('onClose', false)"
        >
          <font-awesome-icon icon="fa-solid fa-xmark"></font-awesome-icon>
        </div>
      </div>
      <div class="p-4 border-b">Are you sure ?</div>
      <div class="flex justify-end py-3 px-3">
        <Button
          label="Cancel"
          :width="120"
          class="mr-2"
          @click="$emit('onClose', false)"
        ></Button>
        <Button label="Confirm" :width="120" @click="onConfirm"></Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

const show = ref(false)
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  onConfirm: Function,
})

onBeforeMount(() => {
  show.value = props.visible
})

watch(
  () => props.visible,
  (nv) => {
    show.value = props.visible
  },
)

defineEmits(["onClose"])

function onConfirm() {
  props.onConfirm && props.onConfirm()
}
</script>

<style scoped></style>
