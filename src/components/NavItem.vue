<script setup>
import {navigate, currentPage} from "@/router";
import {isNavItemValid, isPageValid} from "@/validators";
import {computed} from "vue";

const classes = computed(() => [
  'flex flex-col items-center p-2 text-xs capitalize',
  {'bg-gray-200 pointer-events-none': currentPage.value === props.page}
])

const props = defineProps({
  navItem: {
    required: true,
    type: Object,
    validator: isNavItemValid
  }
})

</script>

<template>
  <li class="flex-1">

    <a :href="`#${navItem.page}`" :class="classes" @click="navigate(navItem.page)">

      <component :is="navItem.icon" class="h-6 w-6"/>

      {{ navItem.page }}

    </a>

  </li>
</template>