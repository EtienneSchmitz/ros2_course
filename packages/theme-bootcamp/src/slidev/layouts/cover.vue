<template>
  <div class="slidev-layout bc-cover">
    <div class="bc-cover__rule" />
    <h1 class="bc-cover__title">
      <slot name="title">
        <slot />
      </slot>
    </h1>
    <p v-if="$slots.subtitle" class="bc-cover__subtitle">
      <slot name="subtitle" />
    </p>
    <div class="bc-cover__footer">
      <span>ROS 2 — Bootcamp</span>
      <span v-if="$frontmatter.day">Jour {{ $frontmatter.day }}</span>
    </div>
  </div>
</template>
