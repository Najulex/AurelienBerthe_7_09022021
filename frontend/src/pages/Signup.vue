<template>
	<div>
		<div class="text-center m-3">
			<img
				src="../assets/icon-above-font.png"
				alt="Logo de groupomania"
				width="250"
			/>
		</div>
		<div class="col-md-6 mr-md-auto ml-md-auto bg-light p-4 mt-5 mb-5">
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
							placeholder="ex : J-Dup"
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
				if (
					username == "" || email == "" || pwd ==""
				) {
					document.getElementById('error-message').innerHTML = 'Merci de renseigner tous les champs afin de créer votre compte'
				} else {
					if (email.match(/.{1,}@[^.]{1,}/g)) 
				{
					if ( pwd.match(/[0-9]/g) && pwd.match(/[A-Z]/g) && pwd.match(/[a-z]/g) && pwd.length >= 8
				) {
					axios
					.post("http://localhost:3000/signup", {
						username: username,
						email: email,
						password: pwd
					})
					.then(() => {
						window.location = "/home";
					})
					.catch((error) => {
						document.getElementById("error-message").innerHTML =
							error.response.data.error;
					});
				} else {
					document.getElementById('error-message').innerHTML = 'Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.'
				}
				} else {
					document.getElementById('error-message').innerHTML = "Merci d'utiliser une adresse mail valide."
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