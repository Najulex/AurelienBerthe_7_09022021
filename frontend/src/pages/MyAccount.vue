<template>
  <div id="app">
    <Nav></Nav>
    <header>
      <h1 class="h3 m-3 jumbotron"><i class="fas fa-user-circle"></i> Vos infos</h1>
    </header>
    <main>
      <div class="m-4">
      <p id="error-message"></p>
      <p class="title"><i class="far fa-user"></i> Nom d'utilisateur : <span id="username"></span></p>
      <p class="title"><i class="fas fa-at"></i> Adresse email : <span id="email"></span></p>
      <div class="container mb-3 text-center">
      <button type="button" class="btn btn-danger" data-toggle="modal" data-target=".bd-example-modal-lg">Supprimer mon compte</button>
    </div>
    <p>
  <div class="container text-center mb-4">
    <button @click="displayPosts" class="btn btn-warning" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Gérer mes posts
  </button>
  </div>
<div class="collapse" id="collapseExample">
  <div class="card">
   <section id="posts">
        <p id="posts-title" style="display:none" class="h3 m-4"><i class="fas fa-clone"></i> Mes publications</p>
        <p class="p-4 m-3 text-center" id="no-posts" style="display:none"></p>
        <Post v-for="post in posts" 
        :key="post.id" 
        :id="post.id"
        :title="post.title" 
        :username="post.username" 
        :text="post.text" 
        :date="post.createdAt" 
        :imageUrl="post.imageUrl"
        @deleteUserPost="deletePost(post.id)"
        @getPostId="getPostId(post.id)">
        </Post>
      </section>
  </div>
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
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modifier mon post</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="updatePostForm" class="border p-3 shadow">
        <div class="form-group">
          <label for="text">Votre message</label>
          <textarea id="postText" name="text" class="form-control" rows="3" placeholder="Qu'avez-vous à dire aujourd'hui?" required></textarea>
        </div>
        <div id="alert-message" class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Attention!</strong> Merci de compléter le champ 'message' qui est obligatoire !
  <button @click="closeAlertMessage" type="button" class="close" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
        <div class="form-group mt-3">
          <label for="title">Donnez un titre à votre post</label>
          <input id="postTitle" name="title" class="form-control" rows="3" type="text" placeholder="Si vous voulez...">
        </div>
          <div class="form-group">
            <label for="image">Une image à partager ?</label>
            <input id="postImage"  type="file" name="image" class="form-control-file" accept=".jpeg, .jpg, .png, .gif">
          </div>
           <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
        <button @click="updatePost" type="button" class="btn btn-primary">Enregistrer</button>
      </div>
      </form>
      </div>
    </div>
  </div>
</div>
    </main>
    
  </div>
</template>

<script>

const axios = require('axios');
let auth = localStorage.getItem('auth');
let token = JSON.parse(auth).token;
let config = { headers : { Authorization : token}}

import Nav from "../components/Nav";
import Post from "../components/Post";

export default {
  components: {
    Nav,
    Post
  },
  data() {
    return {
      posts : [],
      postId : ""
    }
  },
  methods : {
    closeAlertMessage() {
      document.getElementById('alert-message').style.display = "none"
    },
    getPostId(id) {
      console.log(id);
      this.postId = id
    },
    updatePost(e) {
      e.preventDefault();
      const FormData = require('form-data');
      const post = new FormData()
      post.append("image", document.getElementById('postImage').files[0]);
      post.append("title", document.getElementById('postTitle').value);
      post.append("text", document.getElementById('postText').value);
      if (document.getElementById('postText').value !== "") {
        axios.put('http://localhost:3000/api/post/' + this.postId, post, config)
        .then(()=> window.location ="/myaccount")
        .catch((response) => console.log(response))
      } else {
        document.getElementById('alert-message').style.display = "block";
      }
    },
    deletePost(id) {
      axios.delete('http://localhost:3000/api/post/' + id, config)
      .then(()=> window.location = "/myaccount")
      .catch((response)=> console.log(response))
    },
    deleteAccount() {
      if (!token) {
      alert("Session expirée, merci de vous reconnecter.");
      window.location = "/"
    }
    axios.delete('http://localhost:3000/api/user/', config)
    .then((response)=> {alert(response.data.message);
    localStorage.clear();
    window.location = "/"})
    .catch((error)=> {console.log(error);})
},
    displayPosts() {
      if (!token) {
      alert("Session expirée, merci de vous reconnecter.");
      window.location = "/"
    }
      let username = JSON.parse(localStorage.getItem('auth')).username;
      axios.get('http://localhost:3000/api/post/' + username, config)
      .then((response)=>  {if (response.data.length == 0) {
      document.getElementById('no-posts').style.display = 'block';
        document.getElementById('no-posts').innerHTML = "Il semblerait que vous n'ayez encore rien publié, n'hésitez pas à poster ce que vous voulez partager à vos collègues !"
      } else {
        document.getElementById('posts-title').style.display = "block";
        this.posts = response.data;
      }})
      .catch((response)=> {console.log(response)})
    },
  },
  beforeMount() {
    axios.get('http://localhost:3000/api/user/', config)
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
#alert-message{
  display: none
}
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