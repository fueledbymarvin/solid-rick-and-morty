<template>
  <div class="search">
    <div class="title">Character Explorer</div>
    <div class="input">
      <input v-model="query" type="text" placeholder="Search" />
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.0589 6.77944C10.0589 8.59063 8.59063 10.0589 6.77944 10.0589C4.96826 10.0589 3.5 8.59063 3.5 6.77944C3.5 4.96826 4.96826 3.5 6.77944 3.5C8.59063 3.5 10.0589 4.96826 10.0589 6.77944ZM9.58708 10.6477C8.79881 11.2208 7.8286 11.5589 6.77944 11.5589C4.13983 11.5589 2 9.41905 2 6.77944C2 4.13983 4.13983 2 6.77944 2C9.41905 2 11.5589 4.13983 11.5589 6.77944C11.5589 7.82859 11.2208 8.79878 10.6477 9.58704L14.001 12.9403L12.9403 14.001L9.58708 10.6477Z"
        />
      </svg>
    </div>
    <div class="results">
      <div v-if="loading" class="loading">Loading...</div>
      <template v-else-if="error">{{ error }}</template>
      <template v-else-if="result">
        <div class="count">
          {{ result.info.count }} result{{ result.info.count === 1 ? "" : "s" }}
        </div>
        <div
          v-for="character in result.results"
          :key="character.id"
          class="result"
        >
          <CharacterCard :character="character" />
        </div>
        <div class="buttons" v-if="result.info.prev || result.info.next">
          <div>
            <Button v-if="result.info.prev" @click="page--">Previous</Button>
          </div>
          <div>
            <Button v-if="result.info.next" @click="page++">Next</Button>
          </div>
        </div>
        <div v-if="result.info.pages" class="pages">
          Page {{ page }} of {{ result.info.pages }}
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import debounce from "lodash/debounce";
import { search, SearchResponse } from "@/api";
import CharacterCard from "@/components/CharacterCard.vue";
import Button from "@/components/Button.vue";

export default Vue.extend({
  name: "Search",
  components: {
    CharacterCard,
    Button,
  },
  data() {
    return {
      query: "",
      page: 1,
      result: null as null | SearchResponse,
      loading: false,
      error: null as null | string,
    };
  },
  watch: {
    query() {
      this.search();
    },
    page() {
      this.search();
    },
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      this.loading = true;
      this.error = null;
      this.debouncedSearch();
    },
    // eslint-disable-next-line
    debouncedSearch: debounce(async function (this: any) {
      try {
        const name = this.query;
        const page = this.page;
        const result = await search({ name, page });
        if (name === this.query && page === this.page) {
          this.result = result;
        }
        // eslint-disable-next-line
      } catch (e: any) {
        if (e.response.status === 404) {
          this.result = {
            info: {
              pages: 0,
              count: 0,
            },
            results: [],
          };
        } else {
          this.error = e.message;
        }
      } finally {
        this.loading = false;
      }
    }, 100),
  },
});
</script>

<style lang="scss" scoped>
.title {
  font-size: var(--font-size-xlarge);
}

.input {
  position: relative;
  margin-top: var(--spacing-large);

  input {
    border: 1px solid var(--secondary-border-color);
    border-radius: var(--border-radius);
    padding: var(--spacing-small) var(--spacing) var(--spacing-small) 48px;
    width: 100%;

    &::placeholder {
      color: var(--primary-on-color);
    }
  }

  svg {
    position: absolute;
    fill: var(--primary-on-color);
    left: var(--spacing);
    top: var(--spacing);
  }
}

.results {
  margin-top: var(--spacing);
}

.count,
.loading {
  color: var(--secondary-on-color);
  text-align: center;
}

.result {
  margin-top: var(--spacing);
}

.buttons {
  margin-top: var(--spacing-large);
  display: flex;
  justify-content: space-between;
}

.pages {
  margin-top: var(--spacing);
  color: var(--secondary-on-color);
  text-align: center;
}
</style>
