<template>
  <div id="app">
    <Nav />
    <p class="h3 m-3">Quoi de neuf aujourd'hui ?</p>
    <form>
      <div class="form-group m-4">
        <label for="exampleFormControlTextarea1">Qu'avez-vous à dire ?</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <div class="form-group m-4">
        <label for="exampleFormControlFile1">Un fichier à partager ?</label>
        <input
          type="file"
          class="form-control-file"
          id="exampleFormControlFile1"
        />
      </div>
    </form>
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