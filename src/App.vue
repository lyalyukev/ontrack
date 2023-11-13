<script setup>

import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'

import {computed, provide, ref} from "vue";

import {
  generateTimelineItems,
  normalizePageHash,
  generateActivitySelectOptions,
  generateActivities,
} from "@/function";

import TheTimeLine from './pages/TheTimeLine.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'

import {PAGE_TIME, PAGE_ACTIVITIES, PAGE_PROGRESS} from "@/constants";

const currentPage = ref(normalizePageHash())

const timeline = ref()

const activities = ref(generateActivities())

const timelineItems = ref(generateTimelineItems(activities.value))

const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds)
provide('timelineItems', timelineItems.value)
provide('activities', activities.value)
provide('activitySelectOptions', activitySelectOptions.value)

function goTo(page) {
  if (currentPage.value === PAGE_TIME && page === PAGE_TIME) {
    timeline.value.scrollToHour()
  }
  if (page !== PAGE_TIME) {
    document.body.scrollIntoView()
  }
  currentPage.value = page
}

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

function setTimelineItemActivity(timelineItem, activity) {
  timelineItem.activityId = activity.id
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}

</script>

<template>
  <TheHeader @navigate="goTo($event)"/>

  <main class="flex flex-grow flex-col">
    <TheTimeLine :timeline-items="timelineItems"
                 @set-timeline-item-activity="setTimelineItemActivity"
                 :current-page="currentPage"
                 ref="timeline"
                 v-show="currentPage === PAGE_TIME"/>

    <TheActivities v-show="currentPage === PAGE_ACTIVITIES"
                   :activities="activities"
                   @delete-activity="deleteActivity"
                   @create-activity="createActivity"
                   @set-activity-seconds-to-complete="setActivitySecondsToComplete"
    />
    <TheProgress v-show="currentPage === PAGE_PROGRESS"/>
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)"/>
</template>

