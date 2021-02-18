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
					<label for="inputUsername">Username</label>
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
						class="btn btn-info"
						style="font-size: 1.4rem"
					>
						Me connecter
					</button>
				</div>
			</form>
			<div>
				<router-link to="/signup">Je n'ai pas encore de compte.</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	const axios = require("axios");

	export default {
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
					.post("http://localhost:3000/login", {
						username: document.getElementById("inputUsername").value,
						password: document.getElementById("inputPassword").value,
					})
					.then((response) => {
						let id = response.data.userId;
						let token = response.data.token;
						localStorage.setItem('auth', JSON.stringify({id :id, token : token}));
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
