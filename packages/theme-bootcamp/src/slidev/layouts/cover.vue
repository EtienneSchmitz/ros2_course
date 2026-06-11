<script setup lang="ts">
import logoIso from "../../assets/logo-iso.svg";

</script>

<template>
  <div class="slidev-layout bc-cover" data-hide-footer>
    <img :src="logoIso" alt="" class="bc-cover__logo" />
    <h1 class="bc-cover__title">
      <slot name="title">
        <slot />
      </slot>
    </h1>
    <div class="bc-cover__rule" />
    <p v-if="$slots.subtitle" class="bc-cover__subtitle">
      <slot name="subtitle" />
    </p>
    <p v-if="$frontmatter.author" class="bc-cover__author">{{ $frontmatter.author }}</p>
    <div v-if="$frontmatter.day" class="bc-cover__footer">
      <span class="bc-cover__day">Jour {{ $frontmatter.day }}</span>
      <span class="bc-cover__brand">ROS 2 — Bootcamp</span>
    </div>
  </div>
</template>

<style scoped>
.bc-cover__author {
  margin-top: 1.4rem;
  font-weight: 600;
  opacity: 0.85;
}
</style>
