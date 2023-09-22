<template>
  <div id="register-view__container">
    <FormBox>
      <RegisterStepOne v-if="true" />
      <RegisterStepTwo v-else />
    </FormBox>
  </div>
</template>

<script lang="ts" setup>
import FormBox from "@/components/form-box/FormBox.vue";
import RegisterStepOne from "./components/RegisterStepOne.vue";
import RegisterStepTwo from "./components/RegisterStepTwo.vue";
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
