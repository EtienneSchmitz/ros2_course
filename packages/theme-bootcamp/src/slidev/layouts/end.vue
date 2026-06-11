<script setup lang="ts">
import logoIso from "../../assets/logo-iso.svg";
</script>

<template>
  <div class="slidev-layout bc-end" data-hide-footer>
    <img :src="logoIso" alt="" class="bc-end__logo" />
    <h1 class="bc-end__title">
      <slot>Questions ?</slot>
    </h1>
    <p class="bc-end__subtitle">
      ROS 2 — Bootcamp · Perpignan 2026
    </p>
    <p class="bc-end__link">
      <a href="https://ros2.etienne-schmitz.com" target="_blank" rel="noopener">
        ros2.etienne-schmitz.com
      </a>
    </p>
  </div>
</template>
