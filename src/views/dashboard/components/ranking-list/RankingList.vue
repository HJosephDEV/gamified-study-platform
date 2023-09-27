<template>
  <div class="ranking-list__wrapper">
    <RankingItem />
    <RankingItem />
  </div>
</template>

<script lang="ts" setup>
import RankingItem from "./RankingItem.vue";
</script>

<style lang="scss" scoped>
.ranking-list__wrapper {
  border-radius: 6px;
  border: 1px solid #ffe500;
  background: #212121;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
