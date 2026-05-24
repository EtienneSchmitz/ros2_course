<template>
  <div class="slidev-layout bc-section">
    <div v-if="$frontmatter.eyebrow" class="bc-section__eyebrow">
      {{ $frontmatter.eyebrow }}
    </div>
    <h1 class="bc-section__title">
      <slot />
    </h1>
    <p v-if="$slots.note" class="bc-section__note">
      <slot name="note" />
    </p>
  </div>
</template>
