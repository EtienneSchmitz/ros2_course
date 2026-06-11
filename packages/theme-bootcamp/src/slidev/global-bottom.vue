<script setup lang="ts">
import { computed } from "vue";
import { useNav } from "@slidev/client";
import logoGlyph from "../assets/logo-iso-glyph.svg";

const { currentSlideNo, total, currentSlideRoute } = useNav();

const slideTitle = computed(() => currentSlideRoute.value?.meta?.slide?.title ?? "");

// Les layouts cover/end portent leur propre marque → on masque le footer global.
const ownBranded = computed(() => {
  const layout = currentSlideRoute.value?.meta?.slide?.frontmatter?.layout;
  return layout === "cover" || layout === "end";
});
</script>

<template>
  <footer v-if="!ownBranded" class="bc-global-footer">
    <div class="bc-global-footer__brand">
      <img :src="logoGlyph" alt="ROS 2 — Bootcamp" class="bc-global-footer__logo" />
      <span v-if="slideTitle" class="bc-global-footer__title">{{ slideTitle }}</span>
    </div>
    <div class="bc-global-footer__page">
      {{ currentSlideNo }} / {{ total }}
    </div>
  </footer>
</template>
