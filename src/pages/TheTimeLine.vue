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

  hour ??= new Date().getHours()

  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemsRef.value[hour - 1].$el

  el.scrollIntoView({behavior: isSmooth ? 'smooth' : 'instant'})

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