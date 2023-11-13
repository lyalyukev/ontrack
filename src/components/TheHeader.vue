<script setup>

import TheLogo from './TheLogo.vue'
import TheHeaderProgress from "@/components/TheHeaderProgress.vue";
import {isPageValid} from "@/validators";
import {PAGE_TIME, PAGE_PROGRESS} from "@/constants";
import {navigate} from '@/router'

</script>

<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <TheLogo @click="navigate(PAGE_TIME)" />
    <TheHeaderProgress @click="navigate(PAGE_PROGRESS)" />
  </header>
</template>