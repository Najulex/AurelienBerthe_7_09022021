<template>
  <div class="container bg-light p-4 mt-3">
    <p class="h3">Se connecter</p>
    <form action="">
      <label for="email"></label>
      <input
        class="m-2 p-2 pr-5"
        type="email"
        name="email"
        id="email"
        placeholder="Votre adresse e-mail"
      />
      <br />
      <label for="password"></label>
      <input
        class="m-2 p-2 pr-5"
        type="text"
        name="password"
        id="password"
        placeholder="Votre mot de passe"
      />
      <br />
      <button class="m-2 btn btn-success" style="font-size: 1.2rem">
        Connexion
      </button>
    </form>
  </div>
</template>
