<script setup>
import BaseButton from '../components/BaseButton.vue'
import {TrashIcon} from "@heroicons/vue/24/outline";
import BaseSelect from '../components/BaseSelect.vue'
import {BUTTON_TYPE_DANGER} from "@/constants"
import {isActivityValid, isNumber, isUndefined} from "@/validators";
import ActivitySecondsToComplete from '../components/ActivitySecondsToComplete.vue'
import {inject} from "vue";

const PeriodSelectOptions = inject('PeriodSelectOptions')
const setActivitySecondsToComplete = inject('setActivitySecondsToComplete')
const deleteActivity = inject('deleteActivity')
defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  }
})

</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteActivity(activity)">
        <TrashIcon class="h-8"/>
      </BaseButton>
      <span class="truncate text-2xl">{{ activity.name }}</span>
    </div>

    <div class="flex gap-2">
      <BaseSelect class="font-mono grow"
                  :selected="activity.secondsToComplete || null"
                  placeholder="hh:mm"
                  :options="PeriodSelectOptions"
                  @select="setActivitySecondsToComplete(activity, $event)"
      />

      <ActivitySecondsToComplete v-if="activity.secondsToComplete" :activity="activity"/>
    </div>


  </li>
</template>