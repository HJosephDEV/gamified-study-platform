<template>
  <div id="register-view__container">
    <RegisterSteps />
    <FormBox>
      <RegisterStepOne v-if="isStepOne" />
      <RegisterStepTwo v-if="isStepTwo" />
    </FormBox>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useRegisterStore } from "@/stores/RegisterStore";

import FormBox from "@/components/form-box/FormBox.vue";
import RegisterStepOne from "./components/RegisterStepOne.vue";
import RegisterStepTwo from "./components/RegisterStepTwo.vue";
import RegisterSteps from "./components/RegisterSteps.vue";

const registerStore = useRegisterStore();
const { isStepOne, isStepTwo } = storeToRefs(registerStore);
const { $reset } = registerStore;

onUnmounted(() => {
  $reset();
});
</script>

<style lang="scss" scoped>
#register-view__container {
  min-height: 100dvh;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
</style>
