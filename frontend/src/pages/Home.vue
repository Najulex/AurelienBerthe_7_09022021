<template>
  <div id="app">
    <div>
      <Nav></Nav>
    </div>
    <header class="p-1">
      <h1 class="p-3 text-center text-secondary h2">Retrouvez ici tout ce qui a été partagé</h1>
      <div class="container text-center mt-3 mb-3">
      <button class="btn btn-outline-secondary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Vous avez aussi quelque chose à partager ? Cliquez ici.
  </button>
    </div>
    </header>
  <main>
    <div class="collapse" id="collapseExample">
  <div class="card-body">
    <div class="container mt-3">
      <form id="postForm" class="border p-3 shadow">
        <div class="form-group">
          <label for="postText">Votre message</label>
          <textarea class="form-control" id="postText" rows="3" placeholder="Qu'avez-vous à dire aujourd'hui?" required></textarea>
        </div>
            <div id="alert-message" class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Attention!</strong> Merci de compléter le champ 'message' qui est obligatoire !
            <button @click="closeAlertMessage" type="button" class="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        <div class="form-group mt-3">
          <label for="postTitle">Donnez un titre à votre post</label>
          <input id="postTitle" class="form-control" rows="3" type="text" placeholder="Si vous voulez...">
        </div>
          <div class="form-group">
            <label for="postImage">Une image à partager ?</label>
            <input type="file" name="file" class="form-control-file" id="postImage" accept=".jpeg, .jpg, .png, .gif">
          </div>
          <button @click="createPost" type="submit" class="btn btn-warning text-dark mt-3">Envoyer</button>
      </form>
    </div>
  </div>
</div>
    <div class="container">
      <section id="posts">
        <h2 class="h3 m-4"><i class="fas fa-clone"></i> Les dernières publications</h2>
        <Post v-for="post in posts" 
        :key="post.id" 
        :title="post.title" 
        :username="post.username" 
        :text="post.text" 
        :date="post.createdAt" 
        :imageUrl="post.imageUrl"
        :id="post.id">
        </Post>
      </section>
    </div>
  </main>
  </div>
</template>

<script>
const axios = require('axios');
const auth = localStorage.getItem('auth');
const token = JSON.parse(auth).token;
const config = { headers: { Authorization: token}};

import Post from "../components/Post"
import Nav from "../components/Nav";
export default {
  components: {
    Nav,
    Post
  },
  beforeMount () {
    if (!token) {
      alert("Session expirée, merci de vous reconnecter.");
      window.location = "/"
    }
    axios.get('http://localhost:3000/api/post', config)
      .then((response)=> this.posts = response.data.posts)
      .catch((response)=> console.log(response))
  },
  data() {
    return {
      posts : []
    } 
  },
  methods : {
    closeAlertMessage() {
      document.getElementById('alert-message').style.display = "none"
    },
    createPost(e) {
      e.preventDefault();
      const FormData = require('form-data');
      const post = new FormData()
      post.append("image", document.getElementById('postImage').files[0]);
      post.append("title", document.getElementById('postTitle').value);
      post.append("text", document.getElementById('postText').value);
      post.append("username", JSON.parse(localStorage.getItem('auth')).username);
      if (document.getElementById('postText').value !== "") {
        axios.post('http://localhost:3000/api/post',post, config)
        .then(()=> window.location ="/home")
        .catch((response) => console.log(response))
      } else {
        document.getElementById('alert-message').style.display = "block"
      }
    },
  }
};
</script>

<style>
#alert-message{
  display: none
}
</style>