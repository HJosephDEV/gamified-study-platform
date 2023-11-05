<template>
  <div class="avatar-item__container">
    <div class="avatar-item__image-wrapper">
      <div class="avatar-item__delete">
        <XIcon />
      </div>
      <img :src="src" />
    </div>
    <span>Level {{ requiredLevel }}</span>
  </div>
</template>

<script lang="ts" setup>
import { XIcon } from "lucide-vue-next";
import type { AvatarItemProps } from "@/@types/views/RegisterAvatars";

const { src, requiredLevel } = defineProps<AvatarItemProps>();
</script>

<style lang="scss" scoped>
.avatar-item__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  .avatar-item__image-wrapper {
    height: 100px;
    width: 100px;
    position: relative;
    cursor: pointer;

    .avatar-item__delete {
      opacity: 0;
      width: 100%;
      height: 100%;
      background: #f15f5fce;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        height: 36px;
        width: 36px;
      }
    }

    img {
      max-width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover {
      .avatar-item__delete {
        animation: delete 0.7s ease;
        opacity: 1;
      }
    }
  }

  span {
    line-height: normal;
    font-size: 12px;
  }

  @keyframes delete {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
