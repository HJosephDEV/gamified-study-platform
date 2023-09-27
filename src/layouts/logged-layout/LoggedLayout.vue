<template>
  <div class="logged-layout__wrapper">
    <AppNavbar />
    <div class="logged-layout__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppNavbar from "@/components/app-navbar/AppNavbar.vue";
</script>

<style lang="scss" scoped>
.logged-layout__wrapper {
  .logged-layout__content {
    padding-top: 92px;
  }
}
</style>
