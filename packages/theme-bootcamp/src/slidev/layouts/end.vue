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
      <a href="https://github.com/EtienneSchmitz/ros2_course" target="_blank" rel="noopener">
        github.com/EtienneSchmitz/ros2_course
      </a>
    </p>
  </div>
</template>
