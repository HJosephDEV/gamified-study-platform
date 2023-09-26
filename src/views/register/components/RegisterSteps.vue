<template>
  <div class="register-steps__wrapper">
    <div class="register-steps__container">
      <div :class="['register-steps__item', { active: isStepOne }]" />
      <div :class="['register-steps__item', { active: isStepTwo }]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useRegisterStore } from "@/stores/RegisterStore";

const registerStore = useRegisterStore();
const { isStepOne, isStepTwo } = storeToRefs(registerStore);
</script>

<style lang="scss" scoped>
.register-steps__wrapper {
  width: calc(100% - 24px - 24px);
  position: absolute;
  top: 8px;
  display: flex;
  justify-content: center;
  .register-steps__container {
    display: flex;
    align-self: flex-start;
    gap: 16px;
    width: 820px;
    .register-steps__item {
      width: 50%;
      border-radius: 20px;
      height: 10px;
      background: #fff;
      display: block;

      &.active {
        background: #ffe500;
      }
    }
  }
}
</style>
