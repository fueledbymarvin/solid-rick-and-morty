<template>
  <div id="app">
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  --spacing: 16px;
  --spacing-small: 12px;
  --spacing-xsmall: 8px;
  --spacing-large: 24px;
  --primary-on-color: #2e343b;
  --secondary-on-color: #878d96;
  --primary-background-color: #fff;
  --primary-border-color: #343a3f;
  --secondary-border-color: #d7dfe9;
  --font-size: 16px;
  --font-size-small: 12px;
  --font-size-large: 20px;
  --font-size-xlarge: 24px;
  --border-radius: 8px;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: var(--font-size);
  background: var(--primary-background-color);
  color: var(--primary-on-color);
  display: flex;
  justify-content: center;
}

.content {
  padding: var(--spacing-large);
  flex: 0 1 480px;
  max-width: 100%;
}
</style>
