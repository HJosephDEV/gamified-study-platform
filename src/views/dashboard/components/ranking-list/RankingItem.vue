<template>
  <div class="ranking-item__container">
    <div class="ranking-item__profile">
      <div class="raking-item__profile-photo">
        <img
          :src="image"
          alt="Foto de perfil"
        />
      </div>

      <div class="ranking-item__profile-infos">
        <span class="ranking-item__profile-name">{{ username }}</span>
        <span class="ranking-item__profile-exp">{{ exp }} xp</span>
      </div>
    </div>

    <div class="ranking-item__profile-ranking-container">
      <span>rank {{ rank }}</span>

      <AppIcon name="trophy" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RankingProps } from "@/@types/views/Dashboard";

import AppIcon from "@/components/app-icon/AppIcon.vue";

const { username, exp, rank, image } = defineProps<RankingProps>();
</script>

<style lang="scss" scoped>
.ranking-item__container {
  border-radius: 5px;
  background: linear-gradient(293deg, #fff 47.13%, #ffeb3f 75.13%);
  padding: 6px 12px;
  position: relative;

  .ranking-item__profile {
    display: flex;
    align-items: center;
    gap: 4px;

    .raking-item__profile-photo {
      border: 1px solid #000;
      height: 28px;
      width: 28px;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    .ranking-item__profile-infos {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-width: 55%;

      .ranking-item__profile-name {
        color: #000;
        font-size: 14px;
        font-weight: 600;
        line-height: normal;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .ranking-item__profile-exp {
        color: #000;
        font-size: 10px;
        font-weight: 400;
        line-height: normal;
      }
    }
  }

  .ranking-item__profile-ranking-container {
    display: flex;
    align-items: end;
    position: absolute;
    right: 0;
    bottom: calc(100% - 20px);

    span {
      color: #000;
      font-size: 12px;
      font-weight: 400;
    }

    svg {
      height: 36px;
      width: 36px;
    }
  }
}
</style>
