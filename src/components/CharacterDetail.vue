<template>
  <div>
    <div class="profile">
      <img :src="character.image" />
      <div class="info">
        <div class="name">
          {{ character.name }}
        </div>
        <div class="details">
          {{ character.location.name }}<br />
          {{ character.species }}<br />
          {{ character.gender }}<br />
          {{ character.status }}<br />
          {{ character.episode.length }}<br />
        </div>
      </div>
    </div>
    <div class="title">Near</div>
    <!-- <template v-for="(character, index) in near">
      <div class="card" v-if="index < 5" :key="character.id">
        <CharacterCard :character="character" />
      </div>
    </template> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Character } from "@/api";
import CharacterCard from "@/components/CharacterCard.vue";

export default Vue.extend({
  name: "CharacterDetail",
  components: {
    CharacterCard,
  },
  props: {
    character: Object as () => Character,
  },
});
</script>

<style scoped lang="scss">
.profile {
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(58, 92, 144, 0.14),
    0px 3px 4px rgba(58, 92, 144, 0.12), 0px 1px 5px rgba(58, 92, 144, 0.2);

  img {
    width: 100%;
  }
}

.info {
  padding: var(--spacing);
}

.name {
  font-size: var(--font-size-large);
  font-weight: bold;
}

.details {
  margin-top: var(--spacing-xsmall);
  color: var(--secondary-on-color);
}

.title {
  margin-top: var(--spacing-xlarge);
  font-size: var(--font-size-xlarge);
  font-weight: bold;
}

.card {
  margin-top: var(--spacing);
}
</style>
