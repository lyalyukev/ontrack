<script setup>
import BaseButton from '../components/BaseButton.vue'
import {TrashIcon} from "@heroicons/vue/24/outline";
import BaseSelect from '../components/BaseSelect.vue'
import {PERIOD_SELECT_OPTIONS, BUTTON_TYPE_DANGER} from "@/constants"
import {isActivityValid, isNumber, isUndefined, validateTimelineItems} from "@/validators";
import ActivitySecondsToComplete from '../components/ActivitySecondsToComplete.vue'

defineProps({
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
const emit = defineEmits({
  delete: isUndefined,
  setSecondsToComplete: isNumber
})


</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
        <TrashIcon class="h-8"/>
      </BaseButton>
      <span class="truncate text-2xl">{{ activity.name }}</span>
    </div>

    <div class="flex gap-2">
      <BaseSelect class="font-mono grow"
                  :selected="activity.secondsToComplete || null"
                  placeholder="hh:mm"
                  :options="PERIOD_SELECT_OPTIONS"
                  @select="emit('setSecondsToComplete', $event || 0)"/>

      <ActivitySecondsToComplete v-if="activity.secondsToComplete" :activity="activity" :timeline-items="timelineItems" />
    </div>


  </li>
</template>