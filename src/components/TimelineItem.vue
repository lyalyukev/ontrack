<script setup>
import BaseSelect from "../components/BaseSelect.vue"
import TimelineHour from '../components/TimelineHour.vue'
import {
  isActivityValid, isHourValid, isNumber,
  isTimelineItemValid,
  validateActivities,
  validatorSelectOption
} from "@/validators";
import {NULLABLE_ACTIVITY} from "@/constants";
import TimelineStopWatch from '../components/TimelineStopWatch.vue'

const props = defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  },
  activitySelectOptions: {
    required: true,
    type: Array,
    validator: validatorSelectOption
  },
  activities: {
    required: true,
    type: Array,
    validator: validateActivities
  },
})

const emit = defineEmits({
  selectActivity: isActivityValid,
  scrollToHour: isHourValid,
  updateActivitySeconds: isNumber
})

function selectActivity(id) {
  emit('selectActivity', findActivityById(id))
}

function findActivityById(id) {
  return props.activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
}

</script>

<template>
  <li
      class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">

    <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollToHour', timelineItem.hour)"/>

    <BaseSelect
        :options="activitySelectOptions"
        :placeholder="'Rest'"
        :selected="timelineItem.activityId"
        @select="selectActivity"/>
    <TimelineStopWatch :timeline-item="timelineItem"/>
  </li>
</template>