<template>
  <div id="app">
    <Nav></Nav>
    <p class="h3 m-3 jumbotron"><i class="fas fa-user-circle"></i> Vos infos</p>
    <div class="m-4">
      <p id="error-message"></p>
      <p class="title"><i class="far fa-user"></i> Nom d'utilisateur : <span id="username"></span></p>
      <p class="title"><i class="fas fa-at"></i> Adresse email : <span id="email"></span></p>
      <div class="container mb-3 text-center">
      <button type="button" class="btn btn-danger" data-toggle="modal" data-target=".bd-example-modal-lg">Supprimer mon compte</button>
    </div>
      <div class="container text-center">
        <button @click="displayPosts" class="btn btn-outline-success">Voir mes posts</button>
      </div>
    </div>
    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content p-3 font-weight-bold h5">
        <p>Attention! Cette action est irréversible! Etes-vous sûr(e) de vouloir supprimer votre profil ?</p>
        <div class="text-center">
          <button @click="deleteAccount" class="btn btn-danger">Oui, supprimer mon profil</button>
        </div>
      </div>
    </div>
  </div>
    <section id="posts">
        <p id="posts-title" style="display:none" class="h3 m-4"><i class="fas fa-clone"></i> Mes publications</p>
        <p class="p-4 m-3 text-center" id="no-posts" style="display:none"></p>
        <Post v-for="post in posts" 
        :key="post.id" 
        :title="post.title" 
        :username="post.username" 
        :text="post.text" 
        :date="post.createdAt" 
        :imageUrl="post.imageUrl">
        </Post>
      </section>
  </div>
</template>

<script>

const axios = require('axios');

import Nav from "../components/Nav";
import Post from "../components/Post";

export default {
  components: {
    Nav,
    Post
  },
  data() {
    return {
      posts : []
    }
  },
  methods : {
    deleteAccount() {
  let user_id = JSON.parse(localStorage.getItem('auth')).id;
  axios.delete('http://localhost:3000/' + user_id)
    .then((response)=> {alert(response.data.message);
    localStorage.clear();
    window.location = "/index"})
    .catch((error)=> {console.log(error);})
},
    displayPosts() {
       let username = JSON.parse(localStorage.getItem('auth')).username;
      axios.get('http://localhost:3000/post/' + username)
      .then((response)=>  {if (response.data.length == 0) {
      document.getElementById('no-posts').style.display = 'block';
        document.getElementById('no-posts').innerHTML = "Il semblerait que vous n'ayez encore rien posté, n'hésitez pas à poster ce que vous voulez partager à vos collègues !"
      } else {
        document.getElementById('posts-title').style.display = "block";
        this.posts = response.data
      }})
      .catch((response)=> {console.log(response)})
    },
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
#no-posts {
  color: #04795c;
  font-size: 1.6rem;
}
</style>