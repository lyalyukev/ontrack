<script setup>
import {BUTTON_TYPE_DANGER, BUTTON_TYPE_WARNING, BUTTON_TYPE_SUCCESS, MILLISECOND_IN_SECOND} from "@/constants";
import {ArrowPathIcon} from "@heroicons/vue/24/outline";
import {PauseIcon} from "@heroicons/vue/24/outline";
import {PlayIcon} from "@heroicons/vue/24/outline";
import BaseButton from '../components/BaseButton.vue'
import {isHourValid, isNumber} from "@/validators";
import {formatSecond} from "@/function";
import {ref} from "vue";

const props = defineProps({
  seconds: {
    type: Number,
    default: 0,
    validator: isNumber
  },
  hour: {
    type: Number,
    required: true,
    validator: isHourValid
  }
})

const seconds = ref(props.seconds)
const isRunning = ref(false)
const isStartButtonDisabled = props.hour !== new Date().getHours()

function start() {

  isRunning.value = setInterval(() => {
    seconds.value++
  }, MILLISECOND_IN_SECOND)

}

function stop() {
  clearInterval(isRunning.value)
  isRunning.value = false
}

function reset() {
  stop()
  seconds.value = null
}

</script>
<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!seconds" @click="reset">
      <ArrowPathIcon class="h-8"/>
    </BaseButton>

    <div class="flex flex-grow  items-center rounded bg-gray-100 px-2 font-mono text-3xl">

      {{ formatSecond(seconds) }}

    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <PauseIcon class="h-8"/>
    </BaseButton>
    <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" :disabled="isStartButtonDisabled" @click="start">
      <PlayIcon class="h-8"/>
    </BaseButton>
  </div>
</template>