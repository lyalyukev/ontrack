<script setup>

import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'

import {computed, provide, ref} from "vue";

import {
  generateTimelineItems,
  generateActivitySelectOptions,
  generateActivities, generatePeriodSelectOptions,
} from "@/function";

import TheTimeLine from './pages/TheTimeLine.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'

import {PAGE_TIME, PAGE_ACTIVITIES, PAGE_PROGRESS} from "@/constants";

import {currentPage, timelineRef} from "@/router";


const activities = ref(generateActivities())

const timelineItems = ref(generateTimelineItems(activities.value))

const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds)
provide('timelineItems', timelineItems.value)
provide('activitySelectOptions', activitySelectOptions.value)
provide('PeriodSelectOptions', generatePeriodSelectOptions())
provide('setTimelineItemActivity', setTimelineItemActivity)
provide('setActivitySecondsToComplete', setActivitySecondsToComplete)
provide('createActivity', createActivity)
provide('deleteActivity', deleteActivity)



function deleteActivity(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null
      timelineItem.activitySeconds = null
    }
  })
  activities.value.splice(activities.value.indexOf(activity), 1)
}

function createActivity(activity) {
  activities.value.push(activity)
}

function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = activityId
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}

</script>

<template>
  <TheHeader />

  <main class="flex flex-grow flex-col">
    <TheTimeLine :timeline-items="timelineItems"
                 ref="timelineRef"
                 v-show="currentPage === PAGE_TIME"/>

    <TheActivities v-show="currentPage === PAGE_ACTIVITIES"
                   :activities="activities"
    />
    <TheProgress v-show="currentPage === PAGE_PROGRESS"/>
  </main>

  <TheNav />
</template>

