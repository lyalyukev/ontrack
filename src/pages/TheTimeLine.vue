<script setup>
import TimelineItem from '../components/TimelineItem.vue'
import {
  isActivityValid, isNumber,
  isPageValid,
  isTimelineItemValid,
  validateActivities,
  validateTimelineItems,
  validatorSelectOption
} from "@/validators";
import {nextTick, ref, watchPostEffect} from "vue";
import {MIDNIGHT_HOUR, PAGE_TIME} from "@/constants";

const props = defineProps({
  'timelineItems': {
    required: true,
    type: Array,
    validator: validateTimelineItems
  },
  'activitySelectOptions': {
    required: true,
    type: Array,
    validator: validatorSelectOption
  },
  'activities': {
    required: true,
    type: Array,
    validator: validateActivities
  },
  currentPage: {
    required: true,
    type: String,
    validator: isPageValid
  }
})

const emit = defineEmits({
  setTimelineItemActivity(timelineItem, activity) {
    return [
      isTimelineItemValid(timelineItem),
      isActivityValid(activity)
    ].every(Boolean)
  },
  updateTimelineActivitySeconds(timelineItem, activitySeconds){
    return [
        isTimelineItemValid(timelineItem),
        isNumber(activitySeconds)
    ].every(Boolean)
  }
})

const timelineItemsRef = ref([])

function scrollToHour(hour = null, isSmooth = true) {

  hour??= new Date().getHours()
  const options = {behavior: isSmooth ? 'smooth': 'instant'}

  if (hour !== MIDNIGHT_HOUR) {
    timelineItemsRef.value[hour - 1].$el.scrollIntoView(options)
  } else {
    document.body.scrollIntoView(options)
  }
}

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIME)
    await nextTick()
  scrollToHour(null, false)
})

defineExpose({scrollToHour})

</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem v-for="timelineItem in timelineItems" :key="timelineItem.hour"
                    :timeline-item="timelineItem"
                    :activity-select-options="activitySelectOptions"
                    :activities="activities"
                    ref="timelineItemsRef"
                    @update-activity-seconds="emit('updateTimelineActivitySeconds', timelineItem, $event)"
                    @scroll-to-hour="scrollToHour"
                    @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
      />
    </ul>
  </div>
</template>