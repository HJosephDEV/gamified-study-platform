<template>
  <div id="login-view__container">
    <FormBox>
      <LoginForm />
    </FormBox>
  </div>
</template>

<script lang="ts" setup>
import FormBox from "@/components/form-box/FormBox.vue";
import LoginForm from "./components/LoginForm.vue";
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
