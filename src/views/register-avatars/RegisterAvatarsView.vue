<template>
  <div class="register-avatars-view__container">
    <div class="register-avatars-view__content">
      <h1>Cadastrar avatares</h1>

      <div class="register-avatars-view__card">
        <AvatarsList v-if="showAvatars" />
        <AvatarsRegisterForm v-if="showForm" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

import { useRegisterAvatarsStore } from "@/stores/RegisterAvatarsStore";

import AvatarsList from "./components/AvatarsList.vue";
import AvatarsRegisterForm from "./components/AvatarsRegisterForm.vue";

const registerAvatarsStore = useRegisterAvatarsStore();
const { showAvatars, showForm } = storeToRefs(registerAvatarsStore);
</script>

<style lang="scss" scoped>
.register-avatars-view__container {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  .register-avatars-view__content {
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;

    h1 {
      color: #fff;
      font-size: 24px;
      font-weight: 600;
      line-height: normal;
    }

    .register-avatars-view__card {
      width: 100%;
      background: #212121;
      margin-top: 24px;
      padding: 24px;
      border-radius: 6px;
      border: 1px solid #ffe500;
    }
  }
}

@media (max-width: 550px) {
  .register-avatars-view__container {
    .register-avatars-view__content {
      h1 {
        font-size: 18px;
      }
    }
  }
}
</style>
