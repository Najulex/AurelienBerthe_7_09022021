<template>
  <div class="col-md-6 mr-md-auto ml-md-auto bg-light p-4 mb-5 mt-5">
    <p class="h3">Se connecter</p>
    <form>
      <div class="form-group">
        <label for="inputEmail">Email</label>
        <input
          type="email"
          class="form-control"
          id="inputEmail"
          placeholder="dupont.jean@exemple.com"
          required
        />
      </div>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label for="inputPassword">Mot de passe</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            placeholder="********"
            required
          />
        </div>
      </div>
      <div>
        <div
          id="error-password"
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
          style="display: none"
        >
          <strong>Mot de passe erroné</strong>
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <div>
        <p id="error-message"></p>
      </div>
      <button @click="displayEmail" id="login" class="mt-1 btn btn-info">
        Me connecter
      </button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    displayEmail() {
      alert(
        "email : " +
          document.getElementById("inputEmail").value +
          " et mdp : " +
          document.getElementById("inputPassword").value
      );
    },
  },
};
</script>