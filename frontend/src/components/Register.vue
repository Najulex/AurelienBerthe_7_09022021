<template>
  <div id="app">
    <div>
      <img
        src="../assets/icon-above-font.png"
        alt="Logo de groupomania"
        width="250"
        class="m-4"
      />
      <p class="h3 m-3 m-md-5">
        Rejoignez le réseau social de
        <span class="font-weight-bold text-uppercase">{{ companyName }}</span>
        et partagez ce que vous aimez !
      </p>
      <div id="nav">
        <router-link to="/login"
          ><Button text="Se connecter" class="btn btn-primary m-2"
        /></router-link>
        <router-link to="/signup"
          ><Button text="S'enregistrer" class="btn btn-secondary m-2"
        /></router-link>
      </div>
    </div>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Button from "./Button";
import Footer from "./Footer";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    Button,
    Footer,
  },
  computed: {
    ...mapState(["companyName"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>