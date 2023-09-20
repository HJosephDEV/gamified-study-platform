<template>
  <component
    :is="$route.meta.layout || 'div'"
    class="app-content"
  >
    <RouterView />
  </component>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
