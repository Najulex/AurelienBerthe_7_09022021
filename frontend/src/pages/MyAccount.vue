<template>
  <div id="app">
    <Nav></Nav>
    <p class="h3 m-3">Votre compte</p>
    <div class="m-4">
      <p id="error-message"></p>
      <p>Nom d'utilisateur : <span id="username"></span></p>
      <p>Adresse email : <span id="email"></span></p>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav";

export default {
  components: {
    Nav,
  },
  beforeMount() {
    const axios = require('axios');
    axios.get('http://localhost:3000/user', {
      params : {
      id : JSON.parse(localStorage.getItem('auth')).id
  }
})
  .then(function (response) {
    document.getElementById('username').innerHTML = (response.data.user.username);
    document.getElementById('email').innerHTML = (response.data.user.email);
  })
  .catch(function () {
    document.getElementById('error-message').innerHTML = "Il semble que nous ayons des difficultés à récupèrer vos données, merci de réessayer plus tard."
  })
  }
};

</script>