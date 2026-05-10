<template>
  <div class="slidev-layout bc-two-cols">
    <div class="bc-two-cols__col">
      <slot name="left">
        <slot />
      </slot>
    </div>
    <div class="bc-two-cols__col">
      <slot name="right" />
    </div>
  </div>
</template>
