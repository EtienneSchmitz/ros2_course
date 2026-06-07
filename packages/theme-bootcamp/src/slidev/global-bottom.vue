<script setup lang="ts">
import { computed } from "vue";
import { useNav } from "@slidev/client";
import logoGlyph from "../assets/logo-iso-glyph.svg";

const { currentSlideNo, total, currentSlideRoute } = useNav();

const slideTitle = computed(() => currentSlideRoute.value?.meta?.slide?.title ?? "");
</script>

<template>
  <footer class="bc-global-footer">
    <div class="bc-global-footer__brand">
      <img :src="logoGlyph" alt="ROS 2 — Bootcamp" class="bc-global-footer__logo" />
      <span v-if="slideTitle" class="bc-global-footer__title">{{ slideTitle }}</span>
    </div>
    <div class="bc-global-footer__page">
      {{ currentSlideNo }} / {{ total }}
    </div>
  </footer>
</template>
