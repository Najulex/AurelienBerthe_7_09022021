<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light h5">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link class="nav-link" to="/home">Les posts</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/post">Postez </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/myAccount">Mon compte</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-danger" to="/"
            >Se déconnecter</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>