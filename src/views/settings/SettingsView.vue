<template>
  <div class="settings-view__container">
    <div class="settings-view__content">
      <h1>Configurações de conta</h1>

      <div class="settings-view__card">
        <ProfileCard />
        <InfosCard />
        <PasswordsCard />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import InfosCard from "./components/infos-card/InfosCard.vue";
import PasswordsCard from "./components/passwords-card/PasswordsCard.vue";
import ProfileCard from "./components/profile-card/ProfileCard.vue";
</script>

<style lang="scss">
.settings-view__container {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  .settings-view__content {
    width: 100%;
    max-width: 626px;
    display: flex;
    flex-direction: column;

    h1 {
      color: #fff;
      font-size: 24px;
      font-weight: 600;
      line-height: normal;
    }

    .settings-view__card {
      width: 100%;
      background: #212121;
      margin-top: 24px;
      padding: 24px;
      border-radius: 6px;
      border: 1px solid #ffe500;
      display: flex;
      flex-direction: column;
      gap: 58px;
    }
  }
}

@media (max-width: 550px) {
  .settings-view__container {
    .settings-view__content {
      h1 {
        font-size: 18px;
      }
    }
  }
}
</style>
