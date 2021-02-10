<template>
  <div class="col-md-6 mr-md-auto ml-md-auto bg-light p-4 mt-5 mb-5">
    <p class="h3">Créez votre compte</p>
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
        <div class="form-group col-md-6">
          <label for="inputUsername">Nom d'utilisateur</label>
          <input
            type="text"
            class="form-control"
            id="inputUsername"
            placeholder="JeanDup"
            required
          />
        </div>
        <div class="form-group col-md-6">
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
          <strong>Mot de passe trop faible</strong> Le mot de passe doit
          contenir au moins une chiffre, une majuscule, une minuscule et 8
          caractères.
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
      <button @click="createUser" id="signup" class="mt-4 btn btn-success">
        Créer mon compte
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    newUser: {
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
  },
  methods: {
    createUser() {
      const pwd = document.getElementById("inputPassword").value;
      if (
        pwd.match(/[0-9]/g) &&
        pwd.match(/[a-z]/g) &&
        pwd.match(/[A-Z]/g) &&
        pwd.length >= 8
      ) {
        this.newUser = {
          username: document.getElementById("inputUsername").value,
          email: document.getElementById("inputEmail").value,
          password: pwd,
        };
        localStorage.setItem("users", JSON.stringify(this.newUser));
      } else {
        console.log("alert");
        let alert = document.getElementById("error-password");
        alert.style.display = "block";
      }
    },
  },
};
</script>
