<template>
  <div>
    <div class="profile">
      <img :src="character.image" />
      <div class="info">
        <div class="name">
          {{ character.name }}
        </div>
        <div class="details">
          <div class="detail">
            <div class="detail-title">Location</div>
            {{ character.location.name }}
          </div>
          <div class="detail">
            <div class="detail-title">Species</div>
            {{ character.species }}
          </div>
          <div class="detail">
            <div class="detail-title">Gender</div>
            {{ character.gender }}
          </div>
          <div class="detail">
            <div class="detail-title">Living Status</div>
            {{ character.status }}
          </div>
          <div class="detail">
            <div class="detail-title">Episodes Seen In</div>
            {{ character.episode.length }}
          </div>
        </div>
      </div>
    </div>
    <div class="title">Near</div>
    <template v-for="character in near">
      <router-link class="near" :key="character.id" :to="`/c/${character.id}`">
        <CharacterCard :character="character" />
      </router-link>
    </template>
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
    near: Array as () => Character[],
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
  margin-top: var(--spacing-small);
}

.detail + .detail {
  margin-top: var(--spacing);
}

.detail-title {
  color: var(--secondary-on-color);
}

.title {
  margin-top: var(--spacing-large);
  font-size: var(--font-size-xlarge);
  font-weight: bold;
}

.near {
  margin-top: var(--spacing);
  color: inherit;
  text-decoration: none;
  display: block;
}
</style>
