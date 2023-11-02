<template>
  <AppLoading v-show="showLoading" />
  <AppModal v-show="showModal" />
  <component
    :is="$route.meta.layout || 'div'"
    class="app-content"
  >
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { useAppStore } from "./stores/AppStore";

import AppModal from "@/components/app-modal/AppModal.vue";
import AppLoading from "@/components/app-loading/AppLoading.vue";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { showLoading, showModal } = storeToRefs(appStore);
</script>

<style lang="scss" scoped></style>
