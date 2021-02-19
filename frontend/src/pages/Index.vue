<template>
  <div>
    <a href="/index"><img
      src="../assets/icon-above-font.png"
      alt="Logo de groupomania"
      width="250"
      class="m-4"
    /></a>
    <p class="h3 m-4 m-md-5">
      Rejoignez le réseau social de
      <span class="font-weight-bold text-uppercase">{{ companyName }}</span>
      et partagez ce que vous aimez !
    </p>
    <div class="container text-center">
      <router-link to="/login"
        ><Button text="Je possède un compte"
      /></router-link>
      <router-link to="/signup"
        ><Button class="btn-secondary" text="Je crée mon compte"
      /></router-link>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Button from "../components/Button";
import { mapState } from "vuex";
export default {
  components: {
    Footer,
    Button,
  },
  computed: {
    ...mapState(["companyName"]),
  },
};
</script>