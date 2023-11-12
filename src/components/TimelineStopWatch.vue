<script setup>
import {BUTTON_TYPE_DANGER, BUTTON_TYPE_WARNING, BUTTON_TYPE_SUCCESS, MILLISECOND_IN_SECOND} from "@/constants";
import {ArrowPathIcon} from "@heroicons/vue/24/outline";
import {PauseIcon} from "@heroicons/vue/24/outline";
import {PlayIcon} from "@heroicons/vue/24/outline";
import BaseButton from '../components/BaseButton.vue'
import {isTimelineItemValid} from "@/validators";
import {formatSecond} from "@/function";
import {inject, ref} from "vue";

const updateTimelineItemActivitySeconds = inject('updateTimelineItemActivitySeconds')

const props = defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})

const seconds = ref(props.timelineItem.activitySeconds)
const isRunning = ref(false)
const isStartButtonDisabled = props.timelineItem.hour !== new Date().getHours()

function start() {

  isRunning.value = setInterval(() => {
    updateTimelineItemActivitySeconds(props.timelineItem, 1)
    seconds.value++
  }, MILLISECOND_IN_SECOND)

}

function stop() {
  clearInterval(isRunning.value)
  isRunning.value = false
}

function reset() {
  stop()
  updateTimelineItemActivitySeconds(props.timelineItem, -seconds.value)
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