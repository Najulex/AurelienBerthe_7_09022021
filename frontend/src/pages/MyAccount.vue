<template>
  <div id="app">
    <Nav></Nav>
    <p class="h3 m-3 jumbotron">Vos infos</p>
    <div class="m-4">
      <p id="error-message"></p>
      <p class="title">Nom d'utilisateur : <span id="username"></span></p>
      <p class="title">Adresse email : <span id="email"></span></p>
      <div class="mt-5">
        <button id="remove-account" class="btn btn-danger" @click="displayAlert">Supprimer mon compte</button>
      </div>
      <div id="alert-remove-account">
      </div>
    </div>
  </div>
</template>

<script>

const axios = require('axios');

function confirmRemoveAccount(e) {
  e.stopPropagation;
  let user_id = JSON.parse(localStorage.getItem('auth')).id;
  axios.delete('http://localhost:3000/' + user_id)
    .then((response)=> {alert(response.data.message);
    localStorage.clear();
    window.location = "/"})
    .catch((error)=> {console.log(error);})
}

import Nav from "../components/Nav";

export default {
  components: {
    Nav,
  },
  methods : {
    displayAlert() {
      document.getElementById('remove-account').style.display = "none";
      document.getElementById("alert-remove-account").innerHTML = "";
      let firstDiv = document.createElement('div');
      document.getElementById("alert-remove-account").appendChild(firstDiv);
      firstDiv.classList.add("alert","alert-danger","alert-dismissible","fade","show", "mt-4", "mb-4");
      let firstParagraph = document.createElement("p");
      firstDiv.appendChild(firstParagraph);
      firstParagraph.innerHTML = "Attention, cette action est irréversible, êtes-vous sûr(e) de vouloir supprimer votre compte?";
      let confirmBtn = document.createElement("button");
      firstDiv.appendChild(confirmBtn);
      confirmBtn.classList.add("btn","btn-dark");
      confirmBtn.innerHTML = "Oui, je suis sûr(e), merci de supprimer mon compte.";
      confirmBtn.addEventListener("click", confirmRemoveAccount);
      let closeBtn = document.createElement('button');
      firstDiv.appendChild(closeBtn);
      closeBtn.classList.add("close");
      closeBtn.setAttribute("type", "button");
      closeBtn.setAttribute("data-dismiss", "alert");
      closeBtn.setAttribute("aria-label", "Close");
      let span = document.createElement('span');
      closeBtn.appendChild(span);
      span.setAttribute('aria-hidden', 'true');
      span.innerHTML = '&times;';
      closeBtn.addEventListener('click', ()=> {
      document.getElementById('remove-account').style.display = "block";
      })
    }
  },
  beforeMount() {
    let user_id = JSON.parse(localStorage.getItem('auth')).id;
    axios.get('http://localhost:3000/' + user_id)
  .then(function (response) {
    document.getElementById('username').innerHTML = response.data.username;
    document.getElementById('email').innerHTML = response.data.email;
  })
  .catch(function () {
    document.getElementById('error-message').innerHTML = "Il semble que nous ayons des difficultés à accèder à votre compte, merci de réessayer plus tard."
  })
  }
};
</script>

<style>
.title ,.btn {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size : 1.2rem
}
.h3 {
  font-size: 2rem;
}
span {
  font-style: oblique;
  color: brown;
}
.jumbotron {
  background-color: #FED6D7;
}
</style>