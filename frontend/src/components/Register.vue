<template>
  <div id="app">
    <div>
      <img
        src="../assets/icon-above-font.png"
        alt="Logo de groupomania"
        height="200"
      />
      <p class="h3 pb-4 pl-4 pr-4">
        Rejoignez le réseau social de {{ companyName }} et partagez ce que vous
        aimez !
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