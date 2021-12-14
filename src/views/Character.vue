<template>
  <div class="character">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <CharacterDetail v-else :character="character" :near="near" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import take from "lodash/take";
import { getCharacter, getCharacters, Character, getLocation } from "@/api";
import CharacterDetail from "@/components/CharacterDetail.vue";

export default Vue.extend({
  name: "Search",
  components: {
    CharacterDetail,
  },
  data() {
    return {
      character: null as null | Character,
      near: null as null | Character[],
      loading: true,
      error: null as null | string,
    };
  },
  watch: {
    "$route.params": {
      handler() {
        this.load();
      },
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      if (!/^[1-9]\d*$/.test(this.$route.params.id)) {
        this.error = "Not found";
        this.loading = false;
        return;
      }
      const id = parseInt(this.$route.params.id, 10);
      const getId = (url: string) => {
        const parts = url.split("/");
        return parseInt(parts[parts.length - 1]);
      };
      try {
        this.character = await getCharacter({ id });
        const location = await getLocation({
          id: getId(this.character.location.url),
        });
        const ids = location.residents
          .map(getId)
          .filter((residentId) => id !== residentId);
        this.near = await getCharacters({ ids: take(ids, 5) });
        // eslint-disable-next-line
      } catch (e: any) {
        if (e.response?.status === 404) {
          this.error = "Not found";
        } else {
          this.error = e.message;
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
