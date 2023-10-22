<template>
  <AppLoading v-show="showLoading" />
  <component
    :is="$route.meta.layout || 'div'"
    class="app-content"
  >
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { useAppStore } from "./stores/AppStore";

import AppLoading from "@/components/app-loading/AppLoading.vue";

const { showLoading } = useAppStore();
</script>

<style lang="scss" scoped></style>
