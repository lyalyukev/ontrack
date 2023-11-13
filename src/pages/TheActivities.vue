<script setup>

import ActivityItem from '../components/ActivityItem.vue'
import {isActivityValid, validateActivities} from "@/validators";
import TheActivityForm from '../components/TheActivityForm.vue'
import TheActivitiesEmptyState from "@/components/TheActivitiesEmptyState.vue";


defineProps({
  activities: {
    required: true,
    type: Array,
    validator: validateActivities
  }
})
const emit = defineEmits({
  deleteActivity: isActivityValid
})


</script>
<template>
  <div class="flex flex-col grow text-center p-8">
    <ul v-if="activities.length > 0" class="divide-y grow">
      <ActivityItem v-for="activity in activities"
                    :key="activity.id"
                    :activity="activity"
                    @delete="emit('deleteActivity', activity)"/>
    </ul>

    <TheActivitiesEmptyState v-else/>

    <TheActivityForm />
  </div>
</template>