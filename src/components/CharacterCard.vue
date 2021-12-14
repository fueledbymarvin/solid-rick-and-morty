<template>
  <div class="card">
    <img :src="character.image" />
    <div class="info">
      <div class="name">{{ character.name }}</div>
      <div class="location">{{ character.location.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Character } from "@/api";

export default Vue.extend({
  name: "CharacterCard",
  props: {
    character: Object as () => Character,
  },
});
</script>

<style scoped lang="scss">
.card {
  display: flex;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(58, 92, 144, 0.14),
    0px 3px 4px rgba(58, 92, 144, 0.12), 0px 1px 5px rgba(58, 92, 144, 0.2);
}

img {
  flex-shrink: 0;
  width: 96px;
  height: 96px;
}

.info {
  min-width: 0;
  padding: var(--spacing);
}

.name {
  font-size: var(--font-size-large);
  font-weight: bold;
}

.location {
  color: var(--secondary-on-color);
  margin-top: var(--spacing-xsmall);
}

.name,
.location {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
