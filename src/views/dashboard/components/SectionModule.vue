<template>
  <div
    class="section-module__container"
    @click="redirectToModule(moduleId)"
  >
    <span>{{ moduleName }}</span>
    <Code2 class="section-module__icon" />
  </div>
</template>

<script lang="ts" setup>
import type { SectionModuleProps } from "@/@types/components/SectionModule";
import { Code2 } from "lucide-vue-next";

const { moduleId, moduleName } = defineProps<SectionModuleProps>();

const redirectToModule = (id: number) => {
  console.log(id);
};
</script>

<style lang="scss">
.section-module__container {
  .section-module__icon {
    width: 18px;
    height: 18px;

    path {
      transition: color 0.6s ease;
      color: #000;
    }
  }
}

.section-module__container {
  &:hover {
    .section-module__icon {
      path {
        color: #fff;
      }
    }
  }
}

.section-module__container {
  &:active {
    .section-module__icon {
      path {
        color: #fee500;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.section-module__container {
  width: 100%;
  background: #ffe500;
  border-radius: 6px;
  border: 4px solid #fff;
  padding: 13px 16px;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition:
    background 0.6s ease,
    border-color 0.6s ease;

  span {
    color: #000;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    transition: color 0.6s ease;
  }

  &:hover {
    background: #000;
    border-color: #fff;

    span {
      color: #fff;
    }
  }

  &:active {
    border-color: #ffe500;

    span {
      color: #ffe500;
    }
  }
}
</style>
