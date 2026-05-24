<script setup lang="ts">
import logoIso from "../../assets/logo-iso.svg";

</script>

<template>
  <div class="slidev-layout bc-cover" data-hide-footer>
    <img :src="logoIso" alt="" class="bc-cover__logo" />
    <div class="bc-cover__rule" />
    <h1 class="bc-cover__title">
      <slot name="title">
        <slot />
      </slot>
    </h1>
    <p v-if="$slots.subtitle" class="bc-cover__subtitle">
      <slot name="subtitle" />
    </p>
    <div v-if="$frontmatter.day" class="bc-cover__footer">
      <span class="bc-cover__day">Jour {{ $frontmatter.day }}</span>
    </div>
  </div>
</template>
