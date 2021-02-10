<template>
  <div class="bg-light mt-4">
    <div class="container">
      <div class="row py-4">
        <div class="col">
          <ul class="list-inline text-center mb-0">
            <li class="list-inline-item col-12 col-md-3">
              <a href="#">À propos</a>
            </li>
            <li class="list-inline-item px-4">&middot;</li>
            <li class="list-inline-item col-12 col-md-3">
              <a href="#">Vie privée</a>
            </li>
            <li class="list-inline-item px-4">&middot;</li>
            <li class="list-inline-item col-12 col-md-3">
              <a href="#">Conditions d'utilisations</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="pb-4 pt-4 text-center">
        {{ copyright }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Footer",
  computed: {
    ...mapGetters(["copyright"]),
  },
};
</script>