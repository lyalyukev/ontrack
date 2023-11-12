<script setup>
import {formatSecond, getTotalActivitySeconds} from "@/function";
import {isActivityValid, validateTimelineItems} from "@/validators";

const props = defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  },
  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems
  }
})

const seconds = formatSecond(getTotalActivitySeconds(props.activity, props.timelineItems) - props.activity.secondsToComplete)

</script>

<template>
  <div class="flex items-center rounded bg-purple-100 px-2 font-mono text-xl text-purple-600">
    {{ formatSecond(activity.secondsToComplete) }}
  </div>
</template>