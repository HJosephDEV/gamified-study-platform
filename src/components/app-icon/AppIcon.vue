<template>
  <component
    :is="icon"
    class="app-icon__icon"
  />
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from "vue";

const { name } = defineProps({
  name: {
    type: String,
    required: true
  }
});

const icon = defineAsyncComponent(() => import(`../../assets/svgs/${name}.svg`));
</script>
