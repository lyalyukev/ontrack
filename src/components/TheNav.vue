<script setup>

import NavItem from "@/components/NavItem.vue";
import {NAV_ITEMS} from "@/constants";
import {navigate, currentPage} from "@/router"


</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around border-t">
      <NavItem
          v-for="icon, page in NAV_ITEMS"
          :href="`#${page}`" :key="page"
          :class=" {'bg-gray-200 pointer-events-none' : currentPage === page}"
          @click="navigate(page)">

        <component :is="icon" class="h-6 w-6"/>

        {{ page }}

      </NavItem>
    </ul>
  </nav>
</template>