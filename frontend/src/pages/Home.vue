<template>
  <div id="app">
    <Nav></Nav>
    <p class="h3 m-3">Les dernières publications</p>
    <p>userId : {{ userId }}</p>
  </div>
</template>

<script>


import Nav from "../components/Nav";
export default {
  components: {
    Nav,
  },
  data() {
    return {
      userId : JSON.parse(localStorage.getItem('auth')).id
    }
  }
};
</script>