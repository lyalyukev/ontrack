<script setup>
import {PAGE_TIME} from "@/constants";
import {navigate} from '@/router'
</script>

<template>
  <a :href="`#${PAGE_TIME}`" @click="navigate(PAGE_TIME)"><img src="../assets/img/logo.png" alt="Logo" class="h-9"></a>
</template>
