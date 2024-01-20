<template>
  <TheHeader />
  <div class="content-app">
    <TheMenu/> 
    <router-view></router-view>
  </div>
</template>

<script>

import TheHeader from './layout/header/TheHeader.vue';
import TheMenu from './layout/menu/TheMenu.vue';
import TheEmulationList from './view/emulation-list/EmulationList.vue'
import TheHomePage from './view/home-page/TheHomePage.vue';

export default {
  name: 'App',
  components: {
    TheHeader, TheMenu, TheEmulationList, TheHomePage
  }
}
</script>

<style>
</style>
