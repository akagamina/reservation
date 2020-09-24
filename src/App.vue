<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body,
html {
  height: 100%;
}
#app {
  height: 100%;
}

.btn:focus,
.btn:active,
.form-control:focus {
  outline: none !important;
  box-shadow: none !important;
  border-color: 0 !important;
}
</style>
