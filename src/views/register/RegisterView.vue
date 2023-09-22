<template>
  <div id="register-view__container">
    <FormBox></FormBox>
  </div>
</template>

<script lang="ts" setup>
import FormBox from "@/components/form-box/FormBox.vue";
</script>

<style lang="scss" scoped>
#register-view__container {
  min-height: 100dvh;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
