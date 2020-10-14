<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <!-- <svg>
          <use xlink:href="#icon-wx"></use>
        </svg> -->
        <svg-icon icon-class="wx"></svg-icon>
        Home</router-link
      >
      <router-link to="/about">About</router-link>
    </div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <router-view />
  </div>
</template>

<script>
import HelloWorld from "comps/HelloWorld.vue";
// import "@/icons/svg/wx.svg";
export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
