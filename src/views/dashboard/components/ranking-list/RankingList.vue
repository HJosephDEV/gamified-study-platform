<template>
  <div class="ranking-list__wrapper">
    <h2>Ranking</h2>
    <div class="ranking-list__container">
      <RankingItem
        v-for="(ranking, index) in rankingList"
        :key="`ranking-${index}`"
        :username="ranking.username"
        :exp="ranking.exp"
        :rank="ranking.rank"
        :image="ranking.image"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RankingListProps } from "@/@types/views/Dashboard";

import RankingItem from "./RankingItem.vue";

const { rankingList } = defineProps<RankingListProps>();
</script>

<style lang="scss" scoped>
.ranking-list__wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  h2 {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
  }

  .ranking-list__container {
    height: 100%;
    background: #212121;
    border-radius: 6px;
    border: 1px solid #ffe500;
    margin-top: 24px;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow-y: auto;
    user-select: none;
  }
}
</style>
