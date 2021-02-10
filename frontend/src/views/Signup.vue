<template>
  <div class="container bg-light p-4 mt-3">
    <p class="h3">Créez votre compte</p>
    <form action="">
      <label for="name"></label>
      <input
        class="m-2 p-2 pr-5"
        type="text"
        name="name"
        id="name"
        placeholder="Votre nom"
      />
      <label for="email"></label>
      <br />
      <input
        class="p-2 pr-5"
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
        placeholder="Mot de passe"
      />
      <br />
      <button class="m-2 btn btn-info" style="font-size: 1.2rem">
        Inscription
      </button>
    </form>
  </div>
</template>

<style>
</style>
