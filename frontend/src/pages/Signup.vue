<template>
	<div>
		<div class="text-center m-3">
			<a href="/index"><img
      src="../assets/icon-above-font.png"
      alt="Logo de groupomania"
      width="250"
      class="m-4"
    /></a>
		</div>
		<div class="col-md-8 mr-md-auto ml-md-auto bg-light p-4 mt-5 mb-5">
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
				<div class="form-group">
						<label for="inputUsername">Nom d'utilisateur</label>
						<input
							type="text"
							class="form-control"
							id="inputUsername"
							placeholder="ex : J-Dup"
							required
						/>
					</div>
				<div class="form-row">
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
					<div class="form-group col-md-6">
						<label for="inputConfirmPassword">Confirmer votre mot de passe</label>
						<input
							type="password"
							class="form-control"
							id="inputConfirmPassword"
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
						@click="createUser"
						id="login"
						class="btn btn-success"
						style="font-size: 1.4rem"
					>
						Créer mon compte
						<i class="fas fa-user-plus"></i>
					</button>
				</div>
			</form>
			<div>
				<router-link to="/login">J'ai déjà un compte.</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	const axios = require("axios");

	export default {
		methods: {
			createUser(e) {
				e.preventDefault();
				let pwd = document.getElementById("inputPassword").value;
				let email = document.getElementById("inputEmail").value;
				let username = document.getElementById("inputUsername").value;
				let confirmpwd = document.getElementById("inputConfirmPassword").value;
				if (
					username == "" || email == "" || pwd =="" || confirmpwd ==""
				) {
					document.getElementById('error-message').innerHTML = 'Merci de renseigner tous les champs afin de créer votre compte'
				} else { if (pwd !== confirmpwd) {
					document.getElementById('error-message').innerHTML = 'Confirmation du mot de passe différent du mot de passe'
				} else {
					axios
					.post("http://localhost:3000/api/user/signup", {
						username: username,
						email: email,
						password: pwd
					})
					.then(() => {
						axios
					.post("http://localhost:3000/api/user/login", {
						username: document.getElementById("inputUsername").value,
						password: document.getElementById("inputPassword").value,
					})
					.then((response) => {
						let id = response.data.userId;
						let token = response.data.token;
						let username = response.data.username
						localStorage.setItem('auth', JSON.stringify({id :id, token : token, username : username}));
						window.location = "/home";
					})
					.catch((error) => {
						document.getElementById("error-message").innerHTML =
							error.response.data.error;
					});
					})
					.catch((error) => {
						document.getElementById("error-message").innerHTML =
							error.response.data.error;
					});
				}
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