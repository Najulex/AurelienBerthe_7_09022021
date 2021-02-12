<template>
  <div id="app">
    <Nav />
    <p class="h3 m-3">Votre compte</p>
    <div class="m-4">
      <p id="Username">Nom d'utilisateur :</p>
      <p id="Email">Adresse mail :</p>
      <p id="Password">Votre mot de passe :</p>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav";
export default {
  components: {
    Nav,
  },
};
</script>