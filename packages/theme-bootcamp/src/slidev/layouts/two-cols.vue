<script setup lang="ts">
import { computed } from "vue";
import { useNav } from "@slidev/client";

const { currentSlideRoute } = useNav();
const title = computed(() => currentSlideRoute.value?.meta?.slide?.title ?? "");
</script>

<template>
  <div class="slidev-layout bc-two-cols">
    <h1 v-if="title" class="bc-two-cols__title">{{ title }}</h1>
    <div class="bc-two-cols__grid">
      <div class="bc-two-cols__col">
        <slot name="left">
          <slot />
        </slot>
      </div>
      <div class="bc-two-cols__col">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
