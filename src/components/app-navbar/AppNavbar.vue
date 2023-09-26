<template>
  <header class="app-navbar__container">
    <AppDropdown :option-list="optionList">
      <div class="app-navbar__profile">
        <div class="app-navbar__profile-infos">
          <div class="app-navbar__profile-texts">
            <span class="app-navbar__profile-name">haasedevv</span>
            <span class="app-navbar__profile-level">Level 30</span>
          </div>
          <div class="app-navbar__profile-lifes">
            <Heart />
            <Heart />
            <Heart class="lost" />
          </div>
        </div>
        <div class="app-navbar__profile-photo">
          <img
            src="/src/assets/images/poro.png"
            alt="Foto de perfil"
          />
        </div>
      </div>
    </AppDropdown>
  </header>
</template>

<script lang="ts" setup>
import { ref, inject } from "vue";
import type { ProviderAppProps } from "@/@types/providers/App";

import { Heart } from "lucide-vue-next";
import AppDropdown from "@/components/app-dropdown/AppDropdown.vue";

const { $router } = inject<ProviderAppProps>("app") || ({} as ProviderAppProps);

const redirectToSettings = () => $router.push({ name: "settings" });
const optionList = ref([
  { label: "Configurações", event: () => redirectToSettings() },
  { label: "Sair", event: () => {} }
]);
</script>

<style lang="scss">
.app-navbar__profile-lifes {
  display: flex;
  justify-content: end;
  gap: 6px;

  svg {
    width: 18px;
    height: 18px;

    fill: #f15f5f;

    path {
      color: #fff;
    }

    &.lost {
      fill: #fff;
    }
  }
}
</style>

<style lang="scss" scoped>
.app-navbar__container {
  width: 100%;
  background: #161616;
  padding: 16px 24px 15px;
  border-bottom: 1px solid #ffe500;
  display: flex;
  justify-content: end;
  position: fixed;
  top: 0;
  left: 0;

  .app-navbar__profile {
    display: flex;
    gap: 16px;
    cursor: pointer;
    .app-navbar__profile-infos {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .app-navbar__profile-texts {
        display: flex;
        flex-direction: column;
        align-items: end;
        .app-navbar__profile-name {
          color: #ffe500;
          font-size: 12px;
          font-weight: 600;
          line-height: normal;
        }

        .app-navbar__profile-level {
          color: #ffe500;
          font-size: 10px;
          font-weight: 600;
          line-height: normal;
        }
      }

      .app-navbar__profile-lifes {
        display: flex;
        justify-content: end;
        gap: 6px;

        svg {
          width: 18px;
          height: 18px;

          path {
            color: #f15f5f;
            fill: #f15f5f;
          }
        }

        &.lost {
          svg {
            path {
              color: #fff;
            }
          }
        }
      }
    }

    .app-navbar__profile-photo {
      max-width: 60px;
      max-height: 60px;
      border: 1px solid #ffe500;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>
