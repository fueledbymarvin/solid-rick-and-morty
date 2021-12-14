<template>
  <button @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Button",
});
</script>

<style scoped lang="scss">
button {
  background: var(--primary-background-color);
  border: 1px solid var(--primary-border-color);
  box-shadow: 0px 2px 4px rgba(58, 92, 144, 0.14),
    0px 3px 4px rgba(58, 92, 144, 0.12), 0px 1px 5px rgba(58, 92, 144, 0.2);
  border-radius: var(--border-radius);
  padding: var(--spacing-xsmall) var(--spacing);
  text-transform: uppercase;
  color: var(--primary-on-color);
  font-size: var(--font-size-small);
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
}
</style>
