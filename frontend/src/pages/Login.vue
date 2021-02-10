<template>
  <div>
    <div class="text-center m-3">
      <img
        src="../assets/icon-above-font.png"
        alt="Logo de groupomania"
        width="250"
      />
    </div>
    <div class="col-md-6 mr-md-auto ml-md-auto bg-light p-4 mb-5 mt-5">
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
        <div class="text-center m-3">
          <Button text="Se connecter" @click="displayEmail" id="login" />
        </div>
      </form>
      <div>
        <router-link to="/signup">Je n'ai pas encore de compte.</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button";
export default {
  components: {
    Button,
  },
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