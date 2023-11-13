<script setup>
import TimelineItem from '../components/TimelineItem.vue'
import {
  validateTimelineItems
} from "@/validators";
import {nextTick, ref, watchPostEffect} from "vue";
import {MIDNIGHT_HOUR, PAGE_TIME} from "@/constants";
import {currentPage} from "@/router";


defineProps({
  'timelineItems': {
    required: true,
    type: Array,
    validator: validateTimelineItems
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
  if (currentPage.value === PAGE_TIME)
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
                    ref="timelineItemsRef"
                    @scroll-to-hour="scrollToHour"
      />
    </ul>
  </div>
</template>