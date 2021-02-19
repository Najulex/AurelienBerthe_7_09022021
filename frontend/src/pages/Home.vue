<template>
  <div id="app">
    <Nav></Nav>
    <div class="container mt-3">
      <form class="border p-3 shadow">
        <div class="form-group">
          <label for="postText">Qu'avez-vous à dire aujourd'hui?</label>
          <textarea class="form-control" id="postText" rows="3"></textarea>
        </div>
        <div class="form-group mt-3">
          <label for="">Donnez un titre à votre post</label>
          <input id="postTitle" class="form-control" rows="3" type="text">
        </div>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="postImage">
          <label class="custom-file-label" for="postImage">Une image à partager ?</label>
        </div>
          <button @click="sendPost" type="submit" class="btn btn-primary mt-3">Poster</button>
      </form>
    </div>
    <div class="container">
      <section id="posts">
        <p class="h3 m-3">Les dernières publications</p>
        <Post v-for="post in posts" :key="post.id" :title="post.title" :username="post.username" :text="post.text" :date="post.createdAt" :imageUrl="post.imageUrl"></Post>
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
      posts : []
    } 
  },
  methods : {
    sendPost() {
      axios.post('http://localhost:3000/', {
        username : JSON.parse(localStorage.getItem('auth')).username,
        text : document.getElementById('postText').value,
        imageUrl : document.getElementById('postImage').value,
        title : document.getElementById('postTitle').value
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    }
  }
};
</script>