<template>
              <div class="bg-light">
                <nav class="col navbar navbar-expand-sm navbar-light">
                    <a id="navbar-brand" class="navbar-brand" href="/home"><img src="../assets/icon.png" width="50rem" alt="">Groupomania</a>
                    <button class="navbar-toggler mr-2" type="button" data-toggle="collapse" data-target="#navbarContent">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div id="navbarContent" class="collapse navbar-collapse">
                        <ul class="ml-3 navbar-nav">
                            <li class="nav-item active">
                                <router-link class="nav-link" to="/home"><i class="fas fa-clone"></i> Les posts</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" :to="'/myaccount'"><i class="fas fa-user-circle"></i> Mon compte </router-link>
                            </li>
                            <li class="nav-item">
                                <p @click="disconnect" id="disconnect" class="nav-link">Se déconnecter <i class="fas fa-sign-out-alt"></i></p>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
</template>

<script>
export default {
  methods : {
    disconnect () {
      localStorage.clear();
      window.location = "/"
    }
  }
}
</script>

<style>
#navbar-brand {
  font-size: 1.6rem;
}
.nav-link {
  font-size: 1rem;
  margin-top : 1rem;
}
#disconnect {
    color:rgb(170, 0, 0);
    cursor: pointer;
}
</style>