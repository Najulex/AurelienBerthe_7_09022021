<template>
  <div id="app">
    <Nav></Nav>
    <div class="container text-center mt-3 mb-3">
      <button class="btn btn-outline-info" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Vous avez quelque chose à partager ? Cliquez ici.
  </button>
    </div>
<div class="collapse" id="collapseExample">
  <div class="card-body">
    <div class="container mt-3">
      <form id="postForm" class="border p-3 shadow">
        <div class="form-group">
          <label for="postText">Votre message</label>
          <textarea class="form-control" id="postText" rows="3" placeholder="Qu'avez-vous à dire aujourd'hui?" required></textarea>
        </div>
        <div class="form-group mt-3">
          <label for="">Donnez un titre à votre post</label>
          <input id="postTitle" class="form-control" rows="3" type="text" placeholder="Si vous voulez...">
        </div>
        <div class="custom-file">
          <input type="file" name="file" class="custom-file-input" id="postImage" @change="getFile">
          <label class="custom-file-label" for="postImage">Une image à partager ?</label>
        </div>
          <button @click="sendPost" type="submit" class="btn btn-outline-info mt-3">Envoyer</button>
      </form>
    </div>
  </div>
</div>
    <div class="container">
      <section id="posts">
        <p class="h3 m-4"><i class="fas fa-clone"></i> Les dernières publications</p>
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
  </div>
</template>

<script>
const axios = require('axios');

import Post from "../components/Post"
import Nav from "../components/Nav";
export default {
  components: {
    Nav,
    Post
  },
  data() {
    axios.get('http://localhost:3000/')
      .then((response)=> this.posts = response.data.posts)
      .catch((response)=> console.log(response))
    return {
      posts : [],
      imageName : "",
      file : ""
    } 
  },
  methods : {
    sendPost() {
      const FormData = require('form-data');
      const post = new FormData();
      post.append("image", this.file);
      post.append("title", document.getElementById('postTitle').value);
      post.append("text", document.getElementById('postText').value);
      post.append("username", JSON.parse(localStorage.getItem('auth')).username);
      console.log('>> post >> ', post);
      axios.post('http://localhost:3000/', post, {
        headers: {
      'Content-Type': 'multipart/form-data'}
      })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (response) {
        console.log(response);
    });
    },
    getFile(){
    this.file = document.getElementById('postImage').files[0];
}
  }
};
</script>