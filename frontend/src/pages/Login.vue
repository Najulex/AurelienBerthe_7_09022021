<template>
<div id="app">
	<header>
<div class="text-center m-3">
			<router-link to="/index"><img
      src="../assets/icon-above-font.png"
      alt="Logo de groupomania"
      width="250"
      class="m-4"
    /></router-link>
		</div>
		<RegTitle text="Connectez-vous maintenant"></RegTitle>
	</header>
		<main>
			<div class="col-md-6 mr-md-auto ml-md-auto bg-light p-4 mb-5 mt-5">
			<form>
				<div class="form-group">
					<label for="inputUsername">Nom d'utilisateur</label>
					<input
						type="text"
						class="form-control"
						id="inputUsername"
						placeholder="J-Dup"
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
					<p id="error-message"></p>
				</div>
				<div class="text-center m-3">
					<button
						@click="displayEmail"
						id="login"
						class="btn btn-warning"
					>
						Me connecter
						<i class="fas fa-sign-in-alt"></i>
					</button>
				</div>
			</form>
			<div>
				<router-link style="color:blue" to="/signup">Vous êtes nouveau ? Créez rapidement votre compte.</router-link>
			</div>
		</div>
		</main>
</div>
</template>

<script>
	const axios = require("axios");
	import RegTitle from "../components/RegTitle"

	export default {
		components : {
			RegTitle
		},
		methods: {
			displayEmail(e) {
				e.preventDefault();
				if (
					document.getElementById('inputUsername').value == "" ||
					document.getElementById('inputPassword').value == ""
				) {
					document.getElementById('error-message').innerHTML = "Merci de remplir tous les champs afin de vous connecter."
				} else {
				axios
					.post("http://localhost:3000/api/user/login", {
						username: document.getElementById("inputUsername").value,
						password: document.getElementById("inputPassword").value,
					})
					.then((response) => {
						let token = response.data.token;
						let username = response.data.username;
						localStorage.setItem('auth', JSON.stringify({token : token, username : username}));
						window.location = "/home";
					})
					.catch((error) => {
						document.getElementById("error-message").innerHTML =
							error.response.data.error;
					});
				}
			},
		},
	};
</script>

<style>
	#error-message {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		color: rgb(209, 47, 47);
		font-size: 1.2rem;
		font-style: italic;
	}
</style>
