<template>
  <div id="login-view__container">
    <FormBox />
  </div>
</template>

<script lang="ts" setup>
import FormBox from "@/components/form-box/FormBox.vue";
</script>

<style lang="scss" scoped>
#login-view__container {
  min-height: 100dvh;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
