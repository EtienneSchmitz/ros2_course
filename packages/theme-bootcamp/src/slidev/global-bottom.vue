<script setup lang="ts">
import { useNav } from "@slidev/client";
import logoGlyph from "../assets/logo-iso-glyph.svg";

const { currentSlideNo, total } = useNav();
</script>

<template>
  <footer class="bc-global-footer">
    <img :src="logoGlyph" alt="ROS 2 — Bootcamp" class="bc-global-footer__logo" />
    <div class="bc-global-footer__page">
      {{ currentSlideNo }} / {{ total }}
    </div>
  </footer>
</template>
