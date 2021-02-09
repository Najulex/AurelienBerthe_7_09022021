<template>
  <div id="app">
    <div>
      <img
        src="./assets/icon-above-font.png"
        alt="Logo de groupomania"
        height="200"
      />
      <h2 class="title">
        Rejoignez le réseau social de {{ companyName }} et partagez ce que vous
        aimez !
      </h2>
      <div id="nav">
        <router-link to="/login"
          ><Button text="Se connecter" class="login-btn" /> </router-link
        ><br />
        <router-link to="/signup"
          ><Button text="S'enregistrer" class="signup-btn"
        /></router-link>
      </div>
    </div>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Button from "./components/Button";
import Footer from "./components/Footer";
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
.title {
  width: 80%;
  margin: auto;
  margin-bottom: 2rem;
}
</style>
